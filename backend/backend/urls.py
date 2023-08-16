"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from books import views as book_views
from members import views as member_views
from transactions import views as txn_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',book_views.getBooks),
    path('import',book_views.importBooks),
    path('getBooks',book_views.getBooks),
    path('deleteBook/<int:bookID>',book_views.deleteBook),
    path('update_stocks/<int:bookID>',book_views.updateStocks),
    path('add_member',member_views.addMember),
    path('getMembers',member_views.getMembers),
    path('getTxn',txn_views.getTxn),
    path('issue_book',book_views.issueBook),
    path('issue_return',book_views.issueReturn),
    path('delete_member/<int:memberID>',member_views.deleteMember),
]
