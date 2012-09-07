from django import template
from site_settings.models import SiteSetting
from django.template import Context,Template
from django.http import HttpResponse


#main register variable to hook into Django template library
register = template.Library();

@register.filter(name="ui")
def ui(value):
	if(value == "button"):
		return "\n\
		<!--ui dependencies-->\n\
		<script type=\"text/javascript\" src=\"/static/js/ui/jquery.ui.core.js\"></script>\n\
		<script type=\"text/javascript\" src=\"/static/js/ui/jquery.ui.widget.js\"></script>\n\
		<script type=\"text/javascript\" src=\"/static/js/ui/jquery.ui.button.js\"></script>\n\
		<link rel=\"stylesheet\" src=\"/static/css/ui/jqueryui.css\"/>"
	
ui.is_safe=True

@register.filter(name="clear")
def clear():
	return "<div style=\"clear:both;\"><div>"
clear.is_safe = True