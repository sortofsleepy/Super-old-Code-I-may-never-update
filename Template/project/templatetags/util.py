from django import template
register = template.Library()

register.filter('css',css)

def css(file):
	return "<link type=\"text/css\" rel=\"stylesheet\" href=\"/static/css/"+file+"\"/>