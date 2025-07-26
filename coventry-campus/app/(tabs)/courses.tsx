import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function CoursesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Computer Science', 'Mathematics', 'Business', 'Language'];

  const courses = [
    {
      id: 1,
      name: 'Digital Accounting',
      category: 'Business',
      instructor: 'Dr. Johnson',
      students: 45,
      duration: '12 weeks',
      level: 'Intermediate',
      color: '#10B981',
    },
    {
      id: 2,
      name: 'Design Thinking',
      category: 'Design',
      instructor: 'Prof. Smith',
      students: 32,
      duration: '8 weeks',
      level: 'Beginner',
      color: '#F59E0B',
    },
    {
      id: 3,
      name: 'Artificial Intelligence',
      category: 'Computer Science',
      instructor: 'Dr. Chen',
      students: 28,
      duration: '16 weeks',
      level: 'Advanced',
      color: '#3B82F6',
    },
    {
      id: 4,
      name: 'Digital Marketing',
      category: 'Business',
      instructor: 'Ms. Davis',
      students: 52,
      duration: '10 weeks',
      level: 'Intermediate',
      color: '#8B5CF6',
    },
    {
      id: 5,
      name: 'Web Development',
      category: 'Computer Science',
      instructor: 'Mr. Wilson',
      students: 38,
      duration: '14 weeks',
      level: 'Intermediate',
      color: '#EF4444',
    },
    {
      id: 6,
      name: 'Data Science',
      category: 'Computer Science',
      instructor: 'Dr. Brown',
      students: 25,
      duration: '18 weeks',
      level: 'Advanced',
      color: '#06B6D4',
    },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Courses</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#1E3A8A" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search courses..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.selectedCategoryText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Courses List */}
      <ScrollView style={styles.coursesList} showsVerticalScrollIndicator={false}>
        {filteredCourses.map((course) => (
          <TouchableOpacity key={course.id} style={styles.courseCard}>
            <View style={styles.courseHeader}>
              <View style={[styles.courseIcon, { backgroundColor: course.color }]}>
                <Ionicons name="book" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>{course.level}</Text>
              </View>
            </View>
            
            <Text style={styles.courseName}>{course.name}</Text>
            <Text style={styles.instructorName}>{course.instructor}</Text>
            
            <View style={styles.courseInfo}>
              <View style={styles.infoItem}>
                <Ionicons name="people" size={16} color="#6B7280" />
                <Text style={styles.infoText}>{course.students} students</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="time" size={16} color="#6B7280" />
                <Text style={styles.infoText}>{course.duration}</Text>
              </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1F2937',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 12,
  },
  selectedCategory: {
    backgroundColor: '#1E3A8A',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  coursesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  courseCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  courseIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelBadge: {
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  courseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  instructorName: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  courseInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
});