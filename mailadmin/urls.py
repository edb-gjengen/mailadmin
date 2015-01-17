from django.conf.urls import patterns,  url
from rest_framework.routers import DefaultRouter

from mailadmin.views import MyUserViewSet, MyOrgUnitViewSet, OrgUnitViewSet, AliasesView, get_domain

router = DefaultRouter()
router.register(r'me', MyUserViewSet, base_name='me')
router.register(r'orgunits', MyOrgUnitViewSet, base_name='ous')
router.register(r'orgunits/all', OrgUnitViewSet, base_name='allous')
urlpatterns = router.urls

urlpatterns += patterns(
    '',
    url(r'^aliases/$', AliasesView.as_view(), name='aliases'),
    url(r'^emaildomain/$', get_domain, name='email-domain'),
)
