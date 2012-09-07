from django.shortcuts import render_to_response
from project.models import Project
from django.http import HttpResponse

#main project page, details all the work available
def index(request):
	if request.user.is_authenticated():
		latest = Project.objects.all()
		return render_to_response('project/index.html',{'latest':latest})
	else:
		return HttpResponse("Not logged in")
		
#detail view for projects
def detail(request,title):
	work = Project.objects.get(title=title)
	if work:
		return render_to_response('project/detail.html',{'work':work})
	else:
		return render_to_response('project/not_found.html')

#category view
def category(request,category):
	work = Project.objects.get(category=category)
	
	if work:
		return render_to_response('project/category.html',{'work':work})
	else:
		return render_to_response('project/not_found.html')
		
#tag view
def tag(request,tag):
	work = Project.objects.get(tag=tag)
	
	if work:
		return render_to_response('project/tag.html',{'work':work})
	else:
		return render_to_response('not_found.html')