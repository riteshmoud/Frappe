import json
from django.db import models

# Create your models here.
class Members(models.Model):
    member_id = models.AutoField(primary_key=True)
    name = models.TextField(max_length=100,null=False,default='NA')
    contact = models.TextField(max_length=10,default='NA')
    books_issued = models.JSONField(null=False,default=dict({"books": []}))
    due = models.FloatField(null=False,default=0.0)
    issued_books_number = models.IntegerField(null=False,default=0)

    # def get_data(self):
    #     return json.loads(self.books_issued_json)
    
    # def set_data(self):
    #     return json.dumps(self.books_issued_json)
    
    # books_issued = property(get_data,set_data)

    def __str__(self):
        return self.name