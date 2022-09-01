from django.contrib import admin
from authApp.models import XUser

@admin.register(XUser)
class XUserAdmin(admin.ModelAdmin):
	list_display = ('pk', 'username', 'numero_matricule')

