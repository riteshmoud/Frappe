# Generated by Django 4.2.4 on 2023-08-15 09:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0004_transactions_book_id_transactions_member_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='transactions',
            name='penalty',
            field=models.FloatField(default=0.0),
        ),
    ]
