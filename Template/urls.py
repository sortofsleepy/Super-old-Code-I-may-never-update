from django.conf.urls.defaults import patterns, include, url
from feeds.feeds import ProjectFeed
from django.contrib import admin



admin.autodiscover()

#main patterns for pages
urlpatterns = patterns('page.views',
	(r'^$','index'),
	(r'^about/$','about'),
	(r'^work/$','work'),
	
)

#project paths
urlpatterns += patterns('project.views',
	(r'^project/$','index'),
	(r'^project/(?P<title>\w+)/$', 'detail'),


)

#feed paths
urlpatterns += patterns('',
	(r'^feed/$',ProjectFeed()),
	(r'^feed/json/$','feeds.views.JsonFeed'),
	
)

#admin paths
urlpatterns += patterns('',
    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
