from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Transactions
from .serializer import TransactionsSerializer

# Create your views here.
@csrf_exempt
@api_view(['GET'])
def getTxn(request):
    txns = Transactions.objects.all()
    serializer = TransactionsSerializer(txns,many=True)
    return Response({'data': serializer.data},status=200)