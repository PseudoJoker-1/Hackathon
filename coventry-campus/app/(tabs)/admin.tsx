import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function AdminScreen() {
  const [selectedTab, setSelectedTab] = useState('Overview');
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    points: 100,
    category: 'Workshop',
    maxParticipants: 50,
  });

  const tabs = ['Overview', 'Schedule', 'Events', 'Users', 'Analytics'];

  const stats = [
    { label: 'Total Students', value: '2,847', icon: 'people', color: '#3B82F6' },
    { label: 'Active Courses', value: '156', icon: 'book', color: '#10B981' },
    { label: 'Events This Month', value: '24', icon: 'calendar', color: '#F59E0B' },
    { label: 'Social Points Earned', value: '45,230', icon: 'star', color: '#8B5CF6' },
  ];

  const recentActivities = [
    { id: 1, action: 'New student registered', user: 'John Smith', time: '2 minutes ago' },
    { id: 2, action: 'Event created', user: 'Admin', time: '15 minutes ago' },
    { id: 3, action: 'Course completed', user: 'Sarah Johnson', time: '1 hour ago' },
    { id: 4, action: 'Grade submitted', user: 'Dr. Wilson', time: '2 hours ago' },
  ];

  const scheduleItems = [
    {
      id: 1,
      time: '09:30',
      subject: 'Computer Science',
      room: 'Room 301',
      instructor: 'Dr. Johnson',
      students: 45,
    },
    {
      id: 2,
      time: '11:30',
      subject: 'Mathematics',
      room: 'Room 205',
      instructor: 'Prof. Smith',
      students: 38,
    },
    {
      id: 3,
      time: '14:00',
      subject: 'Digital Marketing',
      room: 'Online',
      instructor: 'Ms. Davis',
      students: 52,
    },
  ];

  const events = [
    {
      id: 1,
      title: 'Tech Innovation Workshop',
      date: '2024-12-20',
      participants: 45,
      maxParticipants: 60,
      points: 150,
      status: 'Active',
    },
    {
      id: 2,
      title: 'Leadership Summit',
      date: '2024-12-22',
      participants: 120,
      maxParticipants: 150,
      points: 200,
      status: 'Active',
    },
    {
      id: 3,
      title: 'Community Service',
      date: '2024-12-25',
      participants: 80,
      maxParticipants: 100,
      points: 300,
      status: 'Upcoming',
    },
  ];

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    Alert.alert('Success', 'Event created successfully');
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      points: 100,
      category: 'Workshop',
      maxParticipants: 50,
    });
  };

  const renderOverview = () => (
    <View>
      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => {
          return (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                <Ionicons name={stat.icon as any} size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          );
        })}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="add" size={20} color="#1E3A8A" />
            <Text style={styles.quickActionText}>Add Course</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="calendar" size={20} color="#1E3A8A" />
            <Text style={styles.quickActionText}>Schedule Class</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="people" size={20} color="#1E3A8A" />
            <Text style={styles.quickActionText}>Manage Users</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        {recentActivities.map((activity) => (
          <View key={activity.id} style={styles.activityItem}>
            <View style={styles.activityContent}>
              <Text style={styles.activityAction}>{activity.action}</Text>
              <Text style={styles.activityUser}>by {activity.user}</Text>
            </View>
            <Text style={styles.activityTime}>{activity.time}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSchedule = () => (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today's Schedule</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      {scheduleItems.map((item) => (
        <View key={item.id} style={styles.scheduleCard}>
          <View style={styles.scheduleTime}>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
          <View style={styles.scheduleContent}>
            <Text style={styles.scheduleSubject}>{item.subject}</Text>
            <Text style={styles.scheduleInstructor}>{item.instructor}</Text>
            <View style={styles.scheduleDetails}>
              <View style={styles.scheduleDetail}>
                <Ionicons name="location" size={14} color="#6B7280" />
                <Text style={styles.scheduleDetailText}>{item.room}</Text>
              </View>
              <View style={styles.scheduleDetail}>
                <Ionicons name="people" size={14} color="#6B7280" />
                <Text style={styles.scheduleDetailText}>{item.students} students</Text>
              </View>
            </View>
          </View>
          <View style={styles.scheduleActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="create" size={16} color="#3B82F6" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="trash" size={16} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderEvents = () => (
    <View>
      {/* Create Event Form */}
      <View style={styles.createEventForm}>
        <Text style={styles.formTitle}>Create New Event</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Event Title"
          value={newEvent.title}
          onChangeText={(text) => setNewEvent({...newEvent, title: text})}
        />
        
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Date (YYYY-MM-DD)"
            value={newEvent.date}
            onChangeText={(text) => setNewEvent({...newEvent, date: text})}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Time (HH:MM)"
            value={newEvent.time}
            onChangeText={(text) => setNewEvent({...newEvent, time: text})}
          />
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={newEvent.location}
          onChangeText={(text) => setNewEvent({...newEvent, location: text})}
        />
        
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Points"
            value={newEvent.points.toString()}
            onChangeText={(text) => setNewEvent({...newEvent, points: parseInt(text) || 0})}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Max Participants"
            value={newEvent.maxParticipants.toString()}
            onChangeText={(text) => setNewEvent({...newEvent, maxParticipants: parseInt(text) || 0})}
            keyboardType="numeric"
          />
        </View>
        
        <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
          <Text style={styles.createButtonText}>Create Event</Text>
        </TouchableOpacity>
      </View>

      {/* Events List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Events</Text>
        {events.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <View style={styles.eventHeader}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: event.status === 'Active' ? '#10B981' : '#F59E0B' }
              ]}>
                <Text style={styles.statusText}>{event.status}</Text>
              </View>
            </View>
            
            <View style={styles.eventDetails}>
              <View style={styles.eventDetail}>
                <Ionicons name="calendar" size={16} color="#6B7280" />
                <Text style={styles.eventDetailText}>{event.date}</Text>
              </View>
              <View style={styles.eventDetail}>
                <Ionicons name="people" size={16} color="#6B7280" />
                <Text style={styles.eventDetailText}>
                  {event.participants}/{event.maxParticipants}
                </Text>
              </View>
              <View style={styles.eventDetail}>
                <Ionicons name="star" size={16} color="#F59E0B" />
                <Text style={styles.eventDetailText}>{event.points} points</Text>
              </View>
            </View>
            
            <View style={styles.eventActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="create" size={16} color="#3B82F6" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="trash" size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderUsers = () => (
    <View style={styles.comingSoon}>
      <Ionicons name="people" size={64} color="#6B7280" />
      <Text style={styles.comingSoonTitle}>User Management</Text>
      <Text style={styles.comingSoonText}>Coming Soon</Text>
    </View>
  );

  const renderAnalytics = () => (
    <View style={styles.comingSoon}>
      <Ionicons name="bar-chart" size={64} color="#6B7280" />
      <Text style={styles.comingSoonTitle}>Analytics Dashboard</Text>
      <Text style={styles.comingSoonText}>Coming Soon</Text>
    </View>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'Overview': return renderOverview();
      case 'Schedule': return renderSchedule();
      case 'Events': return renderEvents();
      case 'Users': return renderUsers();
      case 'Analytics': return renderAnalytics();
      default: return renderOverview();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Panel</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings" size={20} color="#1E3A8A" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && styles.selectedTab
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[
              styles.tabText,
              selectedTab === tab && styles.selectedTabText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 12,
  },
  selectedTab: {
    backgroundColor: '#1E3A8A',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  selectedTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  // Overview Styles
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  addButton: {
    width: 32,
    height: 32,
    backgroundColor: '#1E3A8A',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1E3A8A',
    marginTop: 8,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  activityUser: {
    fontSize: 12,
    color: '#6B7280',
  },
  activityTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  // Schedule Styles
  scheduleCard: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  scheduleTime: {
    width: 60,
    alignItems: 'center',
    marginRight: 16,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E3A8A',
  },
  scheduleContent: {
    flex: 1,
  },
  scheduleSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  scheduleInstructor: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  scheduleDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scheduleDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleDetailText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  scheduleActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 32,
    height: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  // Events Styles
  createEventForm: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  createButton: {
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  eventCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  eventDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDetailText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  eventActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  // Coming Soon Styles
  comingSoon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  comingSoonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  comingSoonText: {
    fontSize: 16,
    color: '#6B7280',
  },
});