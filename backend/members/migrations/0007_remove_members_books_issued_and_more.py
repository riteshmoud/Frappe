# Generated by Django 4.2.4 on 2023-08-11 20:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0006_alter_members_books_issued'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='members',
            name='books_issued',
        ),
        migrations.AddField(
            model_name='members',
            name='books_issued_json',
            field=models.TextField(default='{"books": []}'),
        ),
    ]
