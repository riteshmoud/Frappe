# Generated by Django 4.2.4 on 2023-08-12 21:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0007_remove_members_books_issued_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='members',
            name='books_issued_json',
        ),
        migrations.AddField(
            model_name='members',
            name='books_issued',
            field=models.JSONField(default='{books: []}'),
        ),
    ]
