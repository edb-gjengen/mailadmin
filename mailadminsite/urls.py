from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib.auth.views import login
from rest_framework import urls as rest_framework_urls

from mailadmin import urls as mailadmin_urls
from mailadmin.views import logout

urlpatterns = [
    url(r'', include(mailadmin_urls)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-auth/', include(rest_framework_urls, namespace='rest_framework')),
    url(r'^accounts/login/$', login, name='login'),
    url(r'^accounts/logout/$', logout, name='logout')
]

urlpatterns += staticfiles_urlpatterns()
