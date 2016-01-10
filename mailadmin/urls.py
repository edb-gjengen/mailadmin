from django.conf.urls import url
from rest_framework.routers import DefaultRouter

from mailadmin.views import MyUserViewSet, MyOrgUnitViewSet, OrgUnitViewSet, AliasesView, get_domain, index, lists

urlpatterns = [
    url(r'^$', index, name='index'),
    url(r'^lists/', lists, name='lists'),
]

# API
router = DefaultRouter()
router.register(r'api/me', MyUserViewSet, base_name='me')
router.register(r'api/orgunits', MyOrgUnitViewSet, base_name='ous')
router.register(r'api/orgunits/all', OrgUnitViewSet, base_name='allous')
urlpatterns += router.urls

urlpatterns += [
    url(r'^api/aliases/', AliasesView.as_view(), name='aliases'),
    url(r'^api/emaildomain/', get_domain, name='email-domain'),
]