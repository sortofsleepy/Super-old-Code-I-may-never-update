from page.models import Page
from django.contrib import admin


class PageAdmin(admin.ModelAdmin):
	fieldsets = [
		('Page Details',{'fields':['title','pub_date','content']}),
	
		
	]


admin.site.register(Page,PageAdmin)

