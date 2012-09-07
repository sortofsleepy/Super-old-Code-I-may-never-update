from django.db import models
from django.conf import settings


class Page(models.Model):
	############## BASIC PROJECT INFORMATION ################
	#title of the piece	
	title = models.CharField(max_length=200)
	
	#publication date
	pub_date = models.DateTimeField('date published')
	
	#description
	content = models.TextField()
	
	#template choice
	template = models.CharField(max_length=200)

	def __unicode__(self):
		return self.title
