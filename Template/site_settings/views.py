from django.shortcuts import render_to_response
from site_settings.models import SiteSettings
from django.http import HttpResponse


def index():
	return HttpResponse("blah! You can't access site settings")