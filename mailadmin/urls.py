from django.conf.urls import url
from rest_framework.routers import DefaultRouter

from mailadmin.views import MyUserViewSet, MyOrgUnitViewSet, OrgUnitViewSet, AliasesView, get_domains, index, lists

urlpatterns = [
    url(r'^$', index, name='index'),
    url(r'^lists/', lists, name='lists'),
]

# API
router = DefaultRouter()
router.register(r'api/me', MyUserViewSet, basename='me')
router.register(r'api/orgunits', MyOrgUnitViewSet, basename='ous')
router.register(r'api/orgunits/all', OrgUnitViewSet, basename='allous')
urlpatterns += router.urls

urlpatterns += [
    url(r'^api/aliases/', AliasesView.as_view(), name='aliases'),
    url(r'^api/domains/', get_domains, name='email-domains'),
]