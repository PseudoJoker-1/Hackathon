import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const todaySchedule = [
    { id: 1, time: '9:30', subject: 'Computer Science', room: 'Room 301', type: 'lecture' },
    { id: 2, time: '11:00', subject: 'Mathematics', room: 'Room 205', type: 'seminar' },
    { id: 3, time: '14:30', subject: 'Digital Marketing', room: 'Online', type: 'webinar' },
  ];

  const currentCourses = [
    { id: 1, name: 'Digital Thinking', progress: 85, color: '#10B981' },
    { id: 2, name: 'Object Oriented Programming', progress: 70, color: '#3B82F6' },
    { id: 3, name: 'LINKS', progress: 45, color: '#8B5CF6' },
  ];

  const news = [
    {
      id: 1,
      title: 'Fall Study Abroad\nExpo',
      subtitle: 'Interested in Development',
      image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
    },
    {
      id: 2,
      title: 'IT\nInformation',
      subtitle: 'Technology Conference',
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.userName}>Student Name</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color="#1E3A8A" />
          </TouchableOpacity>
        </View>

        {/* Today's Schedule */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Classes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all schedule</Text>
            </TouchableOpacity>
          </View>
          
          {todaySchedule.map((item) => (
            <View key={item.id} style={styles.scheduleCard}>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
              <View style={styles.scheduleContent}>
                <Text style={styles.subjectText}>{item.subject}</Text>
                <Text style={styles.roomText}>{item.room}</Text>
              </View>
              <View style={[styles.typeIndicator, { backgroundColor: getTypeColor(item.type) }]} />
            </View>
          ))}
        </View>

        {/* Current Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Current Courses</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          
          {currentCourses.map((course) => (
            <View key={course.id} style={styles.courseCard}>
              <View style={styles.courseInfo}>
                <Text style={styles.courseName}>{course.name}</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${course.progress}%`, backgroundColor: course.color }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>{course.progress}%</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* News & Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>News</Text>
            <Text style={styles.sectionSubtitle}>Events</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {news.map((item) => (
              <TouchableOpacity key={item.id} style={styles.newsCard}>
                <View style={[styles.newsImage, { backgroundColor: '#F3F4F6' }]}>
                  <Ionicons name="book" size={40} color="#3B82F6" />
                </View>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsSubtitle}>{item.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getTypeColor(type: string) {
  switch (type) {
    case 'lecture': return '#10B981';
    case 'seminar': return '#F59E0B';
    case 'webinar': return '#3B82F6';
    default: return '#6B7280';
  }
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
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#6B7280',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
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
  sectionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  seeAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  scheduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  timeContainer: {
    width: 60,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E3A8A',
  },
  scheduleContent: {
    flex: 1,
    marginLeft: 16,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  roomText: {
    fontSize: 14,
    color: '#6B7280',
  },
  typeIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
  },
  courseCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  newsCard: {
    width: 160,
    marginRight: 16,
  },
  newsImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    lineHeight: 20,
  },
  newsSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
});