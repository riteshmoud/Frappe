# Generated by Django 4.2.4 on 2023-08-12 21:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0012_alter_members_books_issued'),
    ]

    operations = [
        migrations.AlterField(
            model_name='members',
            name='books_issued',
            field=models.JSONField(default='{books: []}'),
        ),
    ]
