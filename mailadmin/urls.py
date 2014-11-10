from django.conf.urls import patterns,  url
from rest_framework.routers import DefaultRouter

from mailadmin.views import ForwardsViewSet, MyUserViewSet, MyOrgUnitViewSet, OrgUnitViewSet, ForwardCreateView, ForwardDeleteView

router = DefaultRouter()
router.register(r'forwards', ForwardsViewSet, base_name='all')
router.register(r'me', MyUserViewSet, base_name='me')
router.register(r'orgunits', MyOrgUnitViewSet, base_name='ous')
router.register(r'orgunits/all', OrgUnitViewSet, base_name='allous')
urlpatterns = router.urls

urlpatterns += patterns(
    '',
    url(r'^forward/$', ForwardCreateView.as_view(), name='forward-create'),
    url(r'^forward/(?P<forwarder>.+)/$', ForwardDeleteView.as_view(), name='forward-delete'),
)
