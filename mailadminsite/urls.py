from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = patterns(
    '',
    url(r'^$', 'mailadmin.views.home', name='home'),
    url(r'^api/', include('mailadmin.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^/logout/$', 'django.contrib.auth.views.logout', name='logout')
)

urlpatterns += staticfiles_urlpatterns()