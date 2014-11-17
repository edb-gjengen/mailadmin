from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = patterns(
    '',
    url(r'^$', 'mailadmin.views.index', name='index'),
    url(r'^lists/$', 'mailadmin.views.home', name='home'),
    url(r'^api/', include('mailadmin.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^accounts/login/$', 'django.contrib.auth.views.login', name='login'),
    url(r'^accounts/logout/$', 'mailadmin.views.logout', name='logout')
)

urlpatterns += staticfiles_urlpatterns()
