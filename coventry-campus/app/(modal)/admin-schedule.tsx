import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AdminScheduleScreen() {
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [scheduleItems, setScheduleItems] = useState([
    {
      id: 1,
      time: '09:30',
      subject: 'Computer Science',
      room: 'Room 301',
      type: 'Lecture',
      instructor: 'Dr. Johnson',
      duration: 90,
    },
    {
      id: 2,
      time: '11:30',
      subject: 'Mathematics',
      room: 'Room 205',
      type: 'Seminar',
      instructor: 'Prof. Smith',
      duration: 60,
    },
    {
      id: 3,
      time: '14:00',
      subject: 'Digital Marketing',
      room: 'Online',
      type: 'Webinar',
      instructor: 'Ms. Davis',
      duration: 120,
    },
  ]);

  const [newItem, setNewItem] = useState({
    time: '',
    subject: '',
    room: '',
    type: 'Lecture',
    instructor: '',
    duration: 60,
  });

  const router = useRouter();

  const handleSave = () => {
    if (!newItem.time || !newItem.subject || !newItem.room || !newItem.instructor) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const item = {
      id: Date.now(),
      ...newItem,
    };

    setScheduleItems([...scheduleItems, item]);
    setNewItem({
      time: '',
      subject: '',
      room: '',
      type: 'Lecture',
      instructor: '',
      duration: 60,
    });
    Alert.alert('Success', 'Schedule item added successfully');
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this schedule item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setScheduleItems(scheduleItems.filter(item => item.id !== id));
          }
        },
      ]
    );
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'lecture': return '#10B981';
      case 'seminar': return '#F59E0B';
      case 'webinar': return '#3B82F6';
      case 'lab': return '#EF4444';
      case 'workshop': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#1E3A8A" />
        </TouchableOpacity>
        <Text style={styles.title}>Admin: Schedule</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Add New Item Form */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Add New Class</Text>
          
          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Time *</Text>
              <TextInput
                style={styles.input}
                placeholder="09:30"
                value={newItem.time}
                onChangeText={(text) => setNewItem({...newItem, time: text})}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Duration (min)</Text>
              <TextInput
                style={styles.input}
                placeholder="60"
                value={newItem.duration.toString()}
                onChangeText={(text) => setNewItem({...newItem, duration: parseInt(text) || 60})}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Subject *</Text>
            <TextInput
              style={styles.input}
              placeholder="Computer Science"
              value={newItem.subject}
              onChangeText={(text) => setNewItem({...newItem, subject: text})}
            />
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Room *</Text>
              <TextInput
                style={styles.input}
                placeholder="Room 301"
                value={newItem.room}
                onChangeText={(text) => setNewItem({...newItem, room: text})}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Type</Text>
              <View style={styles.typeSelector}>
                {['Lecture', 'Seminar', 'Lab', 'Webinar'].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeButton,
                      newItem.type === type && styles.selectedType
                    ]}
                    onPress={() => setNewItem({...newItem, type})}
                  >
                    <Text style={[
                      styles.typeText,
                      newItem.type === type && styles.selectedTypeText
                    ]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Instructor *</Text>
            <TextInput
              style={styles.input}
              placeholder="Dr. Johnson"
              value={newItem.instructor}
              onChangeText={(text) => setNewItem({...newItem, instructor: text})}
            />
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleSave}>
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add to Schedule</Text>
          </TouchableOpacity>
        </View>

        {/* Current Schedule */}
        <View style={styles.scheduleContainer}>
          <Text style={styles.scheduleTitle}>Current Schedule</Text>
          
          {scheduleItems.map((item) => (
            <View key={item.id} style={styles.scheduleCard}>
              <View style={styles.scheduleHeader}>
                <View style={styles.timeInfo}>
                  <Ionicons name="time" size={16} color="#6B7280" />
                  <Text style={styles.timeText}>{item.time}</Text>
                  <Text style={styles.durationText}>({item.duration}min)</Text>
                </View>
                <View style={styles.scheduleActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => setEditingItem(item.id)}
                  >
                    <Ionicons name="create" size={16} color="#3B82F6" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Ionicons name="trash" size={16} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
              
              <Text style={styles.subjectName}>{item.subject}</Text>
              <Text style={styles.instructorName}>{item.instructor}</Text>
              
              <View style={styles.scheduleInfo}>
                <View style={styles.roomInfo}>
                  <Ionicons name="location" size={14} color="#6B7280" />
                  <Text style={styles.roomText}>{item.room}</Text>
                </View>
                <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) }]}>
                  <Text style={styles.typeBadgeText}>{item.type}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formContainer: {
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
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputGroup: {
    flex: 1,
    marginBottom: 16,
    marginRight: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  typeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 4,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedType: {
    backgroundColor: '#1E3A8A',
    borderColor: '#1E3A8A',
  },
  typeText: {
    fontSize: 12,
    color: '#6B7280',
  },
  selectedTypeText: {
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  scheduleContainer: {
    marginBottom: 32,
  },
  scheduleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 16,
  },
  scheduleCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E3A8A',
    marginLeft: 6,
  },
  durationText: {
    fontSize: 14,
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
  subjectName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  instructorName: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  scheduleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  typeBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});