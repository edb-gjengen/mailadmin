from mailadmin.views import ForwardsViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'forwards', ForwardsViewSet, base_name='all')
urlpatterns = router.urls
