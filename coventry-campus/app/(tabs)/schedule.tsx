import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const currentWeek = getCurrentWeek();

  type ScheduleItem = { id: number; time: string; subject: string; room: string; type: string; duration: string; };
  const scheduleData: { [date: string]: ScheduleItem[] } = {
//   const scheduleData = {
    '2025-01-06': [
      { id: 1, time: '9:30', subject: 'Computer Science', room: 'Room 301', type: 'Lecture', duration: '90 min' },
      { id: 2, time: '11:30', subject: 'Mathematics', room: 'Room 205', type: 'Seminar', duration: '60 min' },
      { id: 3, time: '14:00', subject: 'Digital Marketing', room: 'Online', type: 'Webinar', duration: '120 min' },
    ],
    '2025-01-07': [
      { id: 4, time: '10:00', subject: 'Database Systems', room: 'Lab 102', type: 'Lab', duration: '120 min' },
      { id: 5, time: '15:30', subject: 'Software Engineering', room: 'Room 404', type: 'Lecture', duration: '90 min' },
    ],
    '2025-01-08': [
      { id: 6, time: '9:00', subject: 'AI Fundamentals', room: 'Room 301', type: 'Lecture', duration: '90 min' },
      { id: 7, time: '13:00', subject: 'Project Management', room: 'Room 203', type: 'Workshop', duration: '180 min' },
    ],
  };

  function getCurrentWeek() {
    const today = new Date();
    const week = [];
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      week.push(date);
    }
    return week;
  }

  function formatDate(date: Date) {
    return date.toISOString().split('T')[0];
  }

  function isToday(date: Date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  function isSameDate(date1: Date, date2: Date) {
    return date1.toDateString() === date2.toDateString();
  }

  const todaySchedule = scheduleData[formatDate(selectedDate)] || [];
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Schedule</Text>
        <Text style={styles.currentMonth}>
          {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </Text>
      </View>

      {/* Week Calendar */}
      <View style={styles.weekContainer}>
        <View style={styles.weekHeader}>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="chevron-back" size={20} color="#1E3A8A" />
          </TouchableOpacity>
          <Text style={styles.weekTitle}>This Week</Text>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="chevron-forward" size={20} color="#1E3A8A" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.weekDays}>
          {currentWeek.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayButton,
                isSameDate(date, selectedDate) && styles.selectedDay,
                isToday(date) && !isSameDate(date, selectedDate) && styles.todayDay
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Text style={[
                styles.dayLabel,
                isSameDate(date, selectedDate) && styles.selectedDayLabel
              ]}>
                {weekDays[index]}
              </Text>
              <Text style={[
                styles.dayNumber,
                isSameDate(date, selectedDate) && styles.selectedDayNumber,
                isToday(date) && !isSameDate(date, selectedDate) && styles.todayDayNumber
              ]}>
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Schedule List */}
      <ScrollView style={styles.scheduleList} showsVerticalScrollIndicator={false}>
        <Text style={styles.scheduleDate}>
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
        
        {todaySchedule.length > 0 ? (
          todaySchedule.map((item) => (
            <View key={item.id} style={styles.scheduleCard}>
              <View style={styles.timeSlot}>
                <Text style={styles.timeText}>{item.time}</Text>
                <View style={[styles.typeIndicator, { backgroundColor: getTypeColor(item.type) }]} />
              </View>
              
              <View style={styles.classDetails}>
                <Text style={styles.subjectName}>{item.subject}</Text>
                <View style={styles.classInfo}>
                  <View style={styles.infoRow}>
                    <Ionicons name="location" size={14} color="#6B7280" />
                    <Text style={styles.infoText}>{item.room}</Text>
                  </View>
                  <Text style={styles.duration}>{item.duration}</Text>
                </View>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeText}>{item.type}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No classes scheduled for this day</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function getTypeColor(type: string) {
  switch (type.toLowerCase()) {
    case 'lecture': return '#10B981';
    case 'seminar': return '#F59E0B';
    case 'webinar': return '#3B82F6';
    case 'lab': return '#EF4444';
    case 'workshop': return '#8B5CF6';
    default: return '#6B7280';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  currentMonth: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  weekContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 12,
    minWidth: 36,
  },
  selectedDay: {
    backgroundColor: '#1E3A8A',
  },
  todayDay: {
    backgroundColor: '#EBF4FF',
  },
  dayLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  selectedDayLabel: {
    color: '#93C5FD',
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  selectedDayNumber: {
    color: '#FFFFFF',
  },
  todayDayNumber: {
    color: '#1E3A8A',
  },
  scheduleList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scheduleDate: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 20,
  },
  scheduleCard: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  timeSlot: {
    alignItems: 'center',
    marginRight: 16,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E3A8A',
    marginBottom: 8,
  },
  typeIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
  },
  classDetails: {
    flex: 1,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  classInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  duration: {
    fontSize: 14,
    color: '#6B7280',
  },
  typeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
});