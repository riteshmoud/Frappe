from django.db import models

# Create your models here.
class Books(models.Model):
    book_id = models.IntegerField(primary_key=True)
    title = models.TextField(null=False,default="NA")
    authors = models.TextField(default="NA")
    isbn = models.BigIntegerField(null=False,default=0)
    publisher = models.TextField(default="NA")
    rating = models.FloatField(default=0)
    stocks = models.IntegerField(null=False,default=0)

    def __str__(self):
        return self.title
