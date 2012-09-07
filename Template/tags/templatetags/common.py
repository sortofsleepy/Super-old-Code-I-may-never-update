from django import template
from site_settings.models import SiteSetting
from page.models import Page
from django.core import serializers
from django.template import Context,Template
from django.shortcuts import render_to_response
import string
#main register variable to hook into Django template library
register = template.Library();

#theme path
path = SiteSetting.setting.theme_path()


########################## TAGS ###################################
#class for the page_menu tag
class MenuNode(template.Node):
	def __init__(self,menuStyle = None):
		self.menu = menuStyle
		
	def render(self,context):
		p = Page.objects.all()
		p.reverse()
		if(self.menu == None):
			print "loading default"
			t = template.loader.get_template('menus/default.html')
		else:
			print "loading non default"
			t = template.loader.get_template('menus/'+self.menu+".html")
		
		c = Context({
			'pages':p
		})
		return t.render(c)

class ShareNode(template.Node):
	def __init__(self):
		return None;
		
	def render(self,context):
		return "<script type=\"text/javascript\" src=\"http://w.sharethis.com/button/buttons.js\"></script>\n\
		<script type=\"text/javascript\">\n\
		var switchTo5x=true;\n\
		stLight.options({publisher:'292c7fba-7359-4568-b579-8c1fb115aeff'});</script>"
		
		
		
#quick replacement for getting common js files that might need to be included
class BaseJS(template.Node):
	def render(self,context):
		return "<script type=\"text/javascript\" src=\"/static/js/jquery.js\"></script>\n\
		<script type=\"text/javascript\" src=\"/static/js/application.js\"></script>\n\
		<script type=\"text/javascript\" src=\"/static/js/easing.js\"></script>"
		
	

#Returns a list of pages in a menu format.
#It takes a string parameter without quotes.
#If you pass a parameter in, it will look for that menu layout under
#templates/menus
@register.tag(name="page_menu")
def page_menu(parser,token):	
	try:
		tag_name,menu_type = token.split_contents()
		return MenuNode(menu_type)
	except ValueError:
	#	print "could not get menu type"
		return MenuNode()

#quick replacement for getting common js files that might need to be included
@register.tag(name="base_js")
def base_js(parser,token):
	return BaseJS()
	
	
@register.tag(name="share")
def share(parser,token):
	return ShareNode()

########################## TAGS ###################################

#spits out a css tag
#pass in filename
@register.filter(name="css")
def css(value):
	return "<link rel=\"stylesheet\" type=\"text/css\" href=\""+path+value+".css\"/>"
css.is_safe = True	
	
	
	
#does the same as css tag, only for js
#pass in filename
@register.filter(name="js")
def js(value):
	path = '/static/js/'
	return "<script type=\"text/javascript\" src=\""+path+value+".js\"></script>"
js.is_safe = True
	
		
@register.filter(name="img")
def img(value,alt):
	path = '/static/img/'
	return "<img src=\""+path+value+"\" alt=\"alt\"/>"	
img.is_safe = True	


@register.filter(name="clear")
def clear(value):
	return "<div style=\"clear:both\"></div>"
clear.is_safe=True



	
########################## UTILITY FILTERS ###################################


#google analytics
#plug in your google analytics id.
@register.filter(name="ga")
def google_analytics(id):

	if id=="":
		return None
	else:
		return "<script type=\"text/javascript\">\n\
		var _gaq = _gaq || [];\n\
		  _gaq.push(['_setAccount', '"+id+"']);\n\
		 _gaq.push(['_trackPageview']);\n\
		 (function() {\n\
		    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;\n\
		    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';\n\
		    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);\n\
		  })();\n\
		\n\
		</script>"
google_analytics.is_safe = True	


#jgrowl messaging
#note: Need to have jgrowl loaded onto page
@register.filter(name="jgrowl")
def jgrowl(message):
	return "<script type=\"text/javascript\">$.jGrowl(message);</script>"
	