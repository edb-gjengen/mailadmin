from django.urls import include, path, re_path
from django.contrib import admin
from django.contrib.auth.views import LoginView
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework import urls as rest_framework_urls

from mailadmin import urls as mailadmin_urls
from mailadmin.views import logout

urlpatterns = [
    path('', include(mailadmin_urls)),
    re_path(r'^admin/', admin.site.urls),
    path('api-auth/', include(rest_framework_urls, namespace='rest_framework')),
    path('accounts/login/', LoginView.as_view(), name='login'),
    path('accounts/logout/', logout, name='logout')
]

urlpatterns += staticfiles_urlpatterns()
