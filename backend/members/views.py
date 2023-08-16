import io
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render
from .serializer import Members as MemberSerializer
from .models import Members
from books.models import Books

@csrf_exempt
@api_view(['POST'])
def addMember(request):
    data = io.BytesIO(request.body)
    data = JSONParser().parse(data)
    member = {
        "name": data['name'],
        "contact": data['contact'],
        "due": 0.0,
        "issued_books_number": 0
    }
    print(member)
    serializer = MemberSerializer(data=member)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Member added'},status = 201)
    
    return Response({'message': 'Cannot add member'},status = 500)

@csrf_exempt
@api_view(['GET'])
def getMembers(request):
    members = Members.objects.all()
    serializer = MemberSerializer(members,many=True)
    return Response({'data': serializer.data},status=200)

@csrf_exempt
@api_view(['DELETE'])
def deleteMember(request,memberID):
    member = Members.objects.get(member_id = memberID)
    # releasing the books issued by member before deleting
    books_issued = member.books_issued['books']
    member.delete()
    for id in books_issued:
        book = Books.objects.get(book_id=id)
        book.stocks = book.stocks + 1
        book.save()
    return Response({"message": "Member deleted"},status=200)