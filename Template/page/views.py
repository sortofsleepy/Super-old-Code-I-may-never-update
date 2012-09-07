#import django requirements
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.conf import settings

#import our models
from page.models import Page
from site_settings.models import SiteSetting

########## GLOBAL VARIABLES #################
#site name for pages
sitename = settings.SITE_NAME

#theme
theme = SiteSetting.setting.get_theme()


#main project page, details all the work available
def index(request):
	return render_to_response('page/index.html',{'site_name':sitename})

	
def about(request):
	page_name = "About";
	return render_to_response('page/about.html',{'site_name':page_name})

def work(request):
	page_name = "Work";
	return render_to_response('page/work.html',{'site_name':page_name})
	