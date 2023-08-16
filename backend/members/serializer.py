from rest_framework import serializers
from .models import Members

class Members(serializers.ModelSerializer):
    class Meta:
        model = Members
        fields = '__all__'
