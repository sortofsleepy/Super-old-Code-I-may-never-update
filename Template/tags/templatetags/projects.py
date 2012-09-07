from django import template
from site_settings.models import SiteSetting
from project.models import Project
from django.template import Context,Template
from django.http import HttpResponse


#main register variable to hook into Django template library
register = template.Library();



#returns a list of all your projects. You can adjust the display
# of things by going into the "project/displays" folder and 
#adjusting the list_display.html file
@register.inclusion_tag('project/displays/list_display.html')
def project_list(limit = None):
	if limit == None:
		p = Project.objects.all()
	else:
		p = Project.objects.all()[:limit]
	
	return {'projects':p}


#returns a single project
@register.tag('get_project')
def get_project(name):
	p = Project.objects.get(title=name)
	return {'project_'+name: p}
	


#returns a list of recent work
#basiclly the same as the "project_list" function but loads a different template
@register.inclusion_tag('project/displays/recent_display.html')
def recent_projects(limit = None):
	if limit == None:
		p = Project.objects.all()
	else:
		p = Project.objects.all()[:limit]
	
	return {'projects':p}