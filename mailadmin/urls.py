from django.urls import path, re_path
from rest_framework.routers import DefaultRouter

from mailadmin.views import MyUserViewSet, MyOrgUnitViewSet, OrgUnitViewSet, AliasesView, get_domains, index, lists, \
    AliasesDeleteView

urlpatterns = [
    re_path(r'^$', index, name='index'),
    path('lists/', lists, name='lists'),
]

# API
router = DefaultRouter()
router.register(r'api/me', MyUserViewSet, basename='me')
router.register(r'api/orgunits', MyOrgUnitViewSet, basename='ous')
router.register(r'api/orgunits/all', OrgUnitViewSet, basename='allous')
urlpatterns += router.urls

urlpatterns += [
    path('api/aliases/', AliasesView.as_view(), name='aliases'),
    path('api/aliases/delete/', AliasesDeleteView.as_view(), name='aliases-delete'),
    path('api/domains/', get_domains, name='email-domains'),
]