import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function GradesScreen() {
  const [selectedSemester, setSelectedSemester] = useState('Fall 2024');

  const semesters = ['Fall 2024', 'Spring 2024', 'Fall 2023'];
  
  const subjects = [
    {
      id: 1,
      name: 'Computer Science',
      code: 'CS201',
      grade: 'A',
      gpa: 4.0,
      credits: 4,
      trend: 'up',
      assignments: [
        { name: 'Midterm Exam', grade: 'A-', weight: '30%' },
        { name: 'Final Project', grade: 'A+', weight: '40%' },
        { name: 'Assignments', grade: 'A', weight: '30%' },
      ]
    },
    {
      id: 2,
      name: 'Digital Marketing',
      code: 'MKT301',
      grade: 'A-',
      gpa: 3.7,
      credits: 3,
      trend: 'up',
      assignments: [
        { name: 'Campaign Project', grade: 'A', weight: '50%' },
        { name: 'Midterm', grade: 'B+', weight: '25%' },
        { name: 'Participation', grade: 'A-', weight: '25%' },
      ]
    },
    {
      id: 3,
      name: 'Software Engineering',
      code: 'SE401',
      grade: 'B+',
      gpa: 3.3,
      credits: 4,
      trend: 'same',
      assignments: [
        { name: 'Team Project', grade: 'B+', weight: '40%' },
        { name: 'Technical Report', grade: 'A-', weight: '30%' },
        { name: 'Code Reviews', grade: 'B', weight: '30%' },
      ]
    },
    {
      id: 4,
      name: 'Database Systems',
      code: 'DB301',
      grade: 'B',
      gpa: 3.0,
      credits: 3,
      trend: 'down',
      assignments: [
        { name: 'SQL Project', grade: 'B+', weight: '35%' },
        { name: 'Database Design', grade: 'B-', weight: '35%' },
        { name: 'Final Exam', grade: 'B', weight: '30%' },
      ]
    },
    {
      id: 5,
      name: 'Mathematics',
      code: 'MATH201',
      grade: 'A-',
      gpa: 3.7,
      credits: 4,
      trend: 'up',
      assignments: [
        { name: 'Problem Sets', grade: 'A', weight: '40%' },
        { name: 'Midterm Exam', grade: 'A-', weight: '30%' },
        { name: 'Final Exam', grade: 'A-', weight: '30%' },
      ]
    },
  ];

  const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
  const weightedGPA = subjects.reduce((sum, subject) => sum + (subject.gpa * subject.credits), 0) / totalCredits;

  function getTrendIcon(trend: string) {
    switch (trend) {
      case 'up': return <Ionicons name="trending-up" size={16} color="#10B981" />;
      case 'down': return <Ionicons name="trending-down" size={16} color="#EF4444" />;
      default: return <Ionicons name="remove" size={16} color="#6B7280" />;
    }
  }

  function getGradeColor(grade: string) {
    if (grade.startsWith('A')) return '#10B981';
    if (grade.startsWith('B')) return '#3B82F6';
    if (grade.startsWith('C')) return '#F59E0B';
    return '#EF4444';
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Grades</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#1E3A8A" />
        </TouchableOpacity>
      </View>

      {/* GPA Summary */}
      <View style={styles.gpaContainer}>
        <View style={styles.gpaCard}>
          <View style={styles.gpaHeader}>
            <Ionicons name="trophy" size={24} color="#1E3A8A" />
            <Text style={styles.gpaLabel}>Current GPA</Text>
          </View>
          <Ionicons name="trophy" size={24} color="#1E3A8A" />
          <Text style={styles.gpaSubtext}>{totalCredits} credits completed</Text>
        </View>
      </View>

      {/* Semester Selector */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.semesterContainer}
      >
        {semesters.map((semester) => (
          <TouchableOpacity
            key={semester}
            style={[
              styles.semesterButton,
              selectedSemester === semester && styles.selectedSemester
            ]}
            onPress={() => setSelectedSemester(semester)}
          >
            <Text style={[
              styles.semesterText,
              selectedSemester === semester && styles.selectedSemesterText
            ]}>
              {semester}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Subjects List */}
      <ScrollView style={styles.subjectsList} showsVerticalScrollIndicator={false}>
        {subjects.map((subject) => (
          <TouchableOpacity key={subject.id} style={styles.subjectCard}>
            <View style={styles.subjectHeader}>
              <View style={styles.subjectInfo}>
                <Text style={styles.subjectName}>{subject.name}</Text>
                <Text style={styles.subjectCode}>{subject.code}</Text>
              </View>
              <View style={styles.gradeContainer}>
                <View style={[styles.gradeBadge, { backgroundColor: getGradeColor(subject.grade) }]}>
                  <Text style={styles.gradeText}>{subject.grade}</Text>
                </View>
                {getTrendIcon(subject.trend)}
              </View>
            </View>
            
            <View style={styles.subjectDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>GPA:</Text>
                <Text style={styles.detailValue}>{subject.gpa.toFixed(1)}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Credits:</Text>
                <Text style={styles.detailValue}>{subject.credits}</Text>
              </View>
            </View>

            {/* Assignment Breakdown */}
            <View style={styles.assignmentsContainer}>
              <Text style={styles.assignmentsTitle}>Grade Breakdown:</Text>
              {subject.assignments.map((assignment, index) => (
                <View key={index} style={styles.assignmentRow}>
                  <View style={styles.assignmentInfo}>
                    <Text style={styles.assignmentName}>{assignment.name}</Text>
                    <Text style={styles.assignmentWeight}>{assignment.weight}</Text>
                  </View>
                  <Text style={[styles.assignmentGrade, { color: getGradeColor(assignment.grade) }]}>
                    {assignment.grade}
                  </Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}
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
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gpaContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  gpaCard: {
    backgroundColor: '#EBF4FF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  gpaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  gpaLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E3A8A',
    marginLeft: 8,
  },
  gpaValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 4,
  },
  gpaSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  semesterContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  semesterButton: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 12,
  },
  selectedSemester: {
    backgroundColor: '#1E3A8A',
  },
  semesterText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  selectedSemesterText: {
    color: '#FFFFFF',
  },
  subjectsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  subjectCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  subjectCode: {
    fontSize: 14,
    color: '#6B7280',
  },
  gradeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradeBadge: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  gradeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subjectDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  assignmentsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
  },
  assignmentsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  assignmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  assignmentInfo: {
    flex: 1,
  },
  assignmentName: {
    fontSize: 14,
    color: '#1F2937',
  },
  assignmentWeight: {
    fontSize: 12,
    color: '#6B7280',
  },
  assignmentGrade: {
    fontSize: 14,
    fontWeight: '600',
  },
});