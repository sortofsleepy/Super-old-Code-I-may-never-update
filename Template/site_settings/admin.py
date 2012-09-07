from site_settings.models import SiteSetting
from django.contrib import admin


class SettingAdmin(admin.ModelAdmin):
	fieldsets = [
		('Site Setting',{'fields':['name','value']}),
	
		
	]


admin.site.register(SiteSetting,SettingAdmin)

