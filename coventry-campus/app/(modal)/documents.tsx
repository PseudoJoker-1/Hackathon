import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DocumentsScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const router = useRouter();

  const filters = ['All', 'Certificates', 'Applications', 'Transcripts', 'Reports'];

  const documents = [
    {
      id: 1,
      name: 'Enrollment Certificate',
      type: 'Certificates',
      date: '2024-12-15',
      status: 'Ready',
      size: '245 KB',
    },
    {
      id: 2,
      name: 'Scholarship Application',
      type: 'Applications',
      date: '2024-12-10',
      status: 'Pending',
      size: '1.2 MB',
    },
    {
      id: 3,
      name: 'Academic Transcript',
      type: 'Transcripts',
      date: '2024-12-08',
      status: 'Ready',
      size: '890 KB',
    },
    {
      id: 4,
      name: 'Grade Report Fall 2024',
      type: 'Reports',
      date: '2024-12-05',
      status: 'Ready',
      size: '156 KB',
    },
    {
      id: 5,
      name: 'Leave Application',
      type: 'Applications',
      date: '2024-11-28',
      status: 'Approved',
      size: '89 KB',
    },
    {
      id: 6,
      name: 'Course Completion Certificate',
      type: 'Certificates',
      date: '2024-11-20',
      status: 'Ready',
      size: '312 KB',
    },
  ];

  const filteredDocuments = documents.filter(doc => 
    selectedFilter === 'All' || doc.type === selectedFilter
  );

  function getStatusColor(status: string) {
    switch (status.toLowerCase()) {
      case 'ready': return '#10B981';
      case 'approved': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'rejected': return '#EF4444';
      default: return '#6B7280';
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#1E3A8A" />
        </TouchableOpacity>
        <Text style={styles.title}>Documents</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#1E3A8A" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              selectedFilter === filter && styles.selectedFilter
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter && styles.selectedFilterText
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Documents List */}
      <ScrollView style={styles.documentsList} showsVerticalScrollIndicator={false}>
        {filteredDocuments.map((doc) => (
          <View key={doc.id} style={styles.documentCard}>
            <View style={styles.documentIcon}>
              <Ionicons name="document-text" size={24} color="#3B82F6" />
            </View>
            
            <View style={styles.documentInfo}>
              <Text style={styles.documentName}>{doc.name}</Text>
              <Text style={styles.documentType}>{doc.type}</Text>
              <View style={styles.documentMeta}>
                <Text style={styles.documentDate}>{doc.date}</Text>
                <Text style={styles.documentSize}>{doc.size}</Text>
              </View>
            </View>
            
            <View style={styles.documentActions}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(doc.status) }]}>
                <Text style={styles.statusText}>{doc.status}</Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="eye" size={16} color="#6B7280" />
                </TouchableOpacity>
                {doc.status.toLowerCase() === 'ready' && (
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="download" size={16} color="#6B7280" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Request New Document */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.requestButton}>
          <Text style={styles.requestButtonText}>Request New Document</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 24,
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
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterTab: {
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  selectedFilter: {
    backgroundColor: '#1E3A8A',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  selectedFilterText: {
    color: '#FFFFFF',
  },
  documentsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  documentCard: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  documentIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#EBF4FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  documentType: {
    fontSize: 14,
    color: '#3B82F6',
    marginBottom: 4,
  },
  documentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  documentDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  documentSize: {
    fontSize: 12,
    color: '#6B7280',
  },
  documentActions: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 32,
    height: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  requestButton: {
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  requestButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});