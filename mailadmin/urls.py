from django.conf.urls import patterns,  url
from rest_framework.routers import DefaultRouter

from mailadmin.views import ForwardsViewSet, MyUserViewSet, OrgUnitViewSet, ForwardCreateView, ForwardDeleteView

router = DefaultRouter()
router.register(r'forwards', ForwardsViewSet, base_name='all')
router.register(r'me', MyUserViewSet, base_name='me')
router.register(r'orgunits', OrgUnitViewSet, base_name='ous')
urlpatterns = router.urls

urlpatterns += patterns(
    '',
    url(r'^forward/$', ForwardCreateView.as_view(), name='forward-create'),
    url(r'^forward/(?P<forwarder>.+)/$', ForwardDeleteView.as_view(), name='forward-delete'),
)
