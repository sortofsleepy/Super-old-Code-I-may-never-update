from project.models import Project
from django.contrib import admin


class ProjectAdmin(admin.ModelAdmin):
	fieldsets = [
		('Project Details',{'fields':['title','pub_date','description','category']}),
		('Metadata',{'fields':['client','medium','thumb','media']}),
		
	]


admin.site.register(Project,ProjectAdmin)

