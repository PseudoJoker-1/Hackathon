from rest_framework.routers import DefaultRouter
from .views import *




router = DefaultRouter()
router.register(r'rooms', RoomViewSet)
router.register(r'reports', ReportViewSet)
router.register(r'math', MathVS)
router.register(r'phylosophy', PhylosopyVS)
router.register(r'business', BusinessVS)
router.register(r'physics', PhysicsVS)
router.register(r'documents',DocumentVS)
router.register(r'documentsHistory',DocumentHistoryVS)
router.register(r'approvalSteps',ApprovalStepVS)
router.register(r'notifications',NotificationVS)
router.register(r'users', UserVS, basename='user')
router.register(r'courses', CourseVS, basename='course')
router.register(r'events', EventVS, basename='event')
router.register(r'participations', EventParticipationVS, basename='participation')
router.register(r'score-transactions', ScoreTransactionVS, basename='scoretransaction')


urlpatterns = router.urls
