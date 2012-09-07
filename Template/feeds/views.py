from django.shortcuts import render_to_response
from project.models import Project
from django.http import HttpResponse
from django.core import serializers

#main project page, details all the work available
def JsonFeed(request):
        p = Project.objects.all()
        p.reverse()
        
        data = serializers.serialize("json",p)
        
        return HttpResponse(data,mimetype='application/json')