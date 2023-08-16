from django.db import models

# Create your models here.
class Transactions(models.Model):
    txn_id = models.AutoField(primary_key=True)
    book_id = models.IntegerField(null=False,default=-1)
    member_id = models.IntegerField(null=False,default=-1)
    txn_category = models.CharField(max_length=100,null=False)
    txn_details = models.TextField(default='NA')
    penalty = models.FloatField(default=0.0)
    txn_amount = models.FloatField(default=0.0)
    date = models.DateTimeField()

    def __str__(self):
        return self.txn_category