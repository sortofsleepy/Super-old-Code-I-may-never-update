from django.db import models

############### MANAGER ######################
#manager for more specific site settings

class SettingsManager(models.Manager):
	
	#returns the theme name
	def get_theme(self):
		theme = self.get(name="theme").value
		return theme
		
	def theme_path(self):
		theme = self.get(name="theme").value
		path = "/static/themes/"+theme+"/"
		return path
		

	def get_name(self):
		name = self.get(name="site name").value
		return name

class PageManager(models.Manager):
	
	def get_pages(self):
		pages = self.all().value
		return pages

############### MAIN CLASS MODEL ######################
class SiteSetting(models.Model):
	
	name = models.CharField(max_length=200)
	value = models.CharField(max_length=200)
	
	objects = models.Manager()
	setting = SettingsManager()
	
	def __unicode__(self):
		return self.name