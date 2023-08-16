# Generated by Django 4.2.4 on 2023-08-13 10:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Transactions',
            fields=[
                ('txn_id', models.AutoField(primary_key=True, serialize=False)),
                ('txn_category', models.CharField(max_length=100)),
                ('txn_details', models.TextField(default='NA')),
                ('date', models.DateTimeField()),
                ('txn_amount', models.FloatField(default=0.0)),
            ],
        ),
    ]
