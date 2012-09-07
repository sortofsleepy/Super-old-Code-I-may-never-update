from django.db import models
from django.contrib.syndication.views import Feed
from django.conf import settings
from project.models import Project
from django.core import serializers
from django.http import HttpResponse
site_title = settings.SITE_NAME


class ProjectFeed(Feed):
	title = "Rss feed for"+site_title
	link = "/feed/"
	description = "Project Feed for "+site_title
	
	
	def items(self):
		return Project.objects.order_by('-pub_date')
		
	def item_title(self,item):
		return item.title
		
	def item_description(self,item):
		return item.description
		
	def item_link(self,item):
		return item.thumb
		

