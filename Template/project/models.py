from django.db import models
from django.conf import settings


class Project(models.Model):
	
	
	
	############## BASIC PROJECT INFORMATION ################
	#title of the piece	
	title = models.CharField(max_length=200)
	
	#publication date
	pub_date = models.DateTimeField('date published', blank=True)
	
	#description
	description = models.TextField()
	
	############# PROJECT META DATA ######################
	#thumb
	thumb = models.CharField(max_length=200,blank=True)
	
	#external media like video, or a larger photo or html for a slideshow
	media = models.TextField(blank=True)
	
	#client info
	client = models.CharField(max_length=200, blank=True)
	
	#medium info
	medium = models.CharField(max_length=300,blank=True)
	
	#category 
	category = models.CharField(max_length=300,blank=True)
	
	######### CATEGORY/TAG ##############################
	
	#category
	category = models.CharField(max_length=100)
	
	
	
	######### RETURNERS: WAYS TO GET A PROJECT'S INFORMATION ##########
	#returns the project's title
	def get_title():
		return self.title
	
	#returns the project's pub date
	def get_date():
		return self.pub_date
		
	#returns the description
	def get_description():
		return self.description
		
	#gets the path to the thumbnail
	def get_thumb():
		return self.thumb
		
	#gets the path to the main asset
	def get_media():
		return self.media
		
	def __unicode__(self):
		return self.title
		
	def get_absolute_url(self):
		return self.title
		
	

