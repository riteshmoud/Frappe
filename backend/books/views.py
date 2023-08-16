from django.shortcuts import render
from django.http import JsonResponse
import datetime
from .models import Books
from transactions.models import Transactions
from transactions.serializer import TransactionsSerializer
from members.models import Members
from transactions.models import Transactions
from .serializers import BooksSerializers
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.decorators import api_view
import io
import requests


IMPORT_URL = 'https://frappe.io/api/method/frappe-library'
RENT = 100
PENALTY_PER_DAY = 20

# Create your views here.

def logTxn(category,bookID,memberID,details,penalty,amount):
    now = datetime.datetime.now()
    return Transactions(
        txn_category = category,
        book_id = bookID,
        member_id = memberID,
        txn_details = details,
        penalty = penalty,
        txn_amount = amount,
        date = now
    )


@csrf_exempt
@api_view(['GET'])
def getBooks(request):
    books = Books.objects.all()
    serializer = BooksSerializers(books,many=True)
    return Response({"data": serializer.data},status=200)

@csrf_exempt  
@api_view(['POST'])
def issueBook(request):
    data = io.BytesIO(request.body)
    data = JSONParser().parse(data)
    member = Members.objects.get(member_id = data['memberID'])
    books_already_issued = member.books_issued['books']

    if(data['bookID'] in books_already_issued):
        return Response('This book is already issued',status = 400)
    
    member.books_issued['books'].append(data['bookID'])
    Books.objects.filter(book_id = data['bookID']).update(stocks = data["old_stocks"] - 1)
    member.issued_books_number = member.issued_books_number + 1
    member.due = member.due + RENT
    txn = logTxn('Book Issued',data['bookID'],member.member_id,f'Book with ID {data["bookID"]} issued to {member.name}',0.0,0.0)
    member.save()
    txn.save()
    return Response({'data': 'Book Issued'},status = 200)

@csrf_exempt  
@api_view(['POST'])
def issueReturn(request):
    data = io.BytesIO(request.body)
    data = JSONParser().parse(data)
    member = Members.objects.get(member_id = data['member']['member_id'])
    for book in data['books']:
        Books.objects.filter(book_id = book['book_id']).update(stocks = book['stocks'] + 1)
        member.books_issued['books'].remove(book['book_id'])
        member.due = member.due - RENT
        # calculating the amount on returning the book
        transaction = Transactions.objects.get(book_id = book['book_id'],member_id=member.member_id,txn_category='Book Issued')

        issued_date = transaction.date.replace(tzinfo=None)
        current_date = datetime.datetime.now().replace(tzinfo=None)
        days = (current_date-issued_date).days
        amount = RENT
        penalty = 0
        # calculation of penalty
        if(days>7):
            extra_days = days - 7
            penalty = (PENALTY_PER_DAY)*extra_days
            amount = amount + penalty
        txn = logTxn('Book Returned',book['book_id'],member.member_id,f'Book with ID {book["book_id"]} returned by {member.name}',penalty,amount)
        txn.save()

    member.issued_books_number = member.issued_books_number - len(data['books'])

    member.save()
    return Response({'data': 'done'},status = 200)

@csrf_exempt  
@api_view(['POST'])
def importBooks(request):
    if request.method == 'POST':
        data = io.BytesIO(request.body)
        data = JSONParser().parse(data)
        page = 1
        while(True):
            response = requests.get(IMPORT_URL+f'?page={page}&title={data["title"]}')
            status_code = response.status_code
            if status_code == 200:
                response = response.json()
                if response['message'] == []:
                    break
                for i in response['message']:
                    book_info = {
                        "book_id": i['bookID'],
                        "title": i['title'],
                        "authors": i['authors'],
                        "rating": i['average_rating'],
                        "isbn": i['isbn'],
                        "publisher": i['publisher'],
                        "stocks": data['stocks']
                    }
                    serializer = BooksSerializers(data = book_info)
                    if serializer.is_valid():
                        serializer.save()
                        data['booksQty'] = (int)(data['booksQty']) - 1
                        if data['booksQty'] == 0:
                            break

                page = page + 1

            else:
                return Response({"message": 'Request failed'},status=status_code)
        
        return Response({"message": 'Books imported'},status=201)
    
    return Response({"message": 'Bad Request'},status=400)

@csrf_exempt
@api_view(['DELETE'])
def deleteBook(request,bookID):
    Books.objects.filter(book_id = bookID).delete()
    return Response({"message": "Book deleted"},status=200)

@csrf_exempt
@api_view(['PUT'])
def updateStocks(request,bookID):
    data = io.BytesIO(request.body)
    data = JSONParser().parse(data)
    Books.objects.filter(book_id = bookID).update(stocks = data['new_stocks'])
    return Response({"message": "Stocks Updated"},status=200)
