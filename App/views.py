from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view
from rest_framework.response    import Response
from rest_framework import status
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404, redirect
from .models import Rooms, Report
from .forms import ReportForm
from rest_framework import viewsets
from .serializers import RoomSerializer, ReportSerializer


# Create your views here.
def index(request):
    return render(request,'static/main.html')


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email,
            'vacation_days_left': request.user.vacation_days_left,
            'role' : request.user.role,
        })

class DocumentVS(ModelViewSet):
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status','doc_type']
    search_fields = ['author__username']
    ordering_fields = ['create_date']
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class DocumentHistoryVS(ModelViewSet):
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['document__author', 'status']
    search_fields = ['document__author__username']
    ordering_fields  = ['create_date', 'vacation_start_date']
    queryset = DocumentHistory.objects.all()
    serializer_class = DocumentHistorySer

class ApprovalStepVS(ModelViewSet):
    queryset = ApprovalStep.objects.all()
    serializer_class = ApprovalStepSer
    def get_queryset(self):
        return ApprovalStep.objects.filter(document__author=self.request.user)
    def perform_create(self, serializer):
        serializer.save(approver=self.request.user)

class NotificationVS(ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def get_queryset(self):
        user = self.request.user
        return Notification.objects.filter(user=user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserVS(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CourseVS(ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category', 'instructor']
    search_fields    = ['name', 'description']


class EventVS(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]

    filterset_fields = ['category', 'date']
    search_fields    = ['title', 'description']
    ordering_fields  = ['date', 'time']

    def get_queryset(self):
        return Event.objects.filter(status='upcoming')  

    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user)  

class EventParticipationVS(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = EventParticipation.objects.all()
    serializer_class = EventParticipationSerializer

    def get_queryset(self):
        user = self.request.user
        return EventParticipation.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ScoreTransactionVS(ModelViewSet):
    queryset = ScoreTransaction.objects.all()
    serializer_class = ScoreTransactionSerializer

    def get_queryset(self):
        user = self.request.user
        return ScoreTransaction.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@api_view(['POST'])
def send_verification_code(request):
    """
    Принимает JSON {"email": "user@example.com"},
    шлёт на почту код.
    """
    ser = SendCodeSerializer(data=request.data)
    ser.is_valid(raise_exception=True)
    ser.save()
    return Response({"detail": "Код отправлен"}, status=status.HTTP_200_OK)

@api_view(['POST'])
def verify_and_register(request):
    """
    Принимает JSON
    {
      "email": "...",
      "code": "123456",
      "username": "...",
      "password": "..."
    }
    — проверяет код и создаёт учётку.
    """
    ser = VerifyCodeSerializer(data=request.data)
    ser.is_valid(raise_exception=True)
    user = ser.save()
    return Response({"id": user.id, "username": user.username}, status=status.HTTP_201_CREATED)


class RoomViewSet(viewsets.ModelViewSet):
    queryset = Rooms.objects.all()
    serializer_class = RoomSerializer

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
