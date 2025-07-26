import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function DocumentsScreen() {
  const [selectedTab, setSelectedTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['All', 'Incoming', 'Outgoing', 'Templates'];
  const filters = ['All', 'Certificates', 'Applications', 'Transcripts', 'Reports'];

  const documents = [
    {
      id: 1,
      name: 'Enrollment Certificate',
      type: 'Certificates',
      category: 'Incoming',
      date: '2024-12-15',
      status: 'Ready',
      size: '245 KB',
      from: 'Registrar Office',
      priority: 'Normal',
    },
    {
      id: 2,
      name: 'Scholarship Application',
      type: 'Applications',
      category: 'Outgoing',
      date: '2024-12-10',
      status: 'Pending',
      size: '1.2 MB',
      to: 'Financial Aid Office',
      priority: 'High',
    },
    {
      id: 3,
      name: 'Academic Transcript',
      type: 'Transcripts',
      category: 'Incoming',
      date: '2024-12-08',
      status: 'Ready',
      size: '890 KB',
      from: 'Academic Office',
      priority: 'Normal',
    },
    {
      id: 4,
      name: 'Grade Report Fall 2024',
      type: 'Reports',
      category: 'Incoming',
      date: '2024-12-05',
      status: 'Ready',
      size: '156 KB',
      from: 'Academic Office',
      priority: 'Normal',
    },
    {
      id: 5,
      name: 'Leave Application',
      type: 'Applications',
      category: 'Outgoing',
      date: '2024-11-28',
      status: 'Approved',
      size: '89 KB',
      to: 'Student Affairs',
      priority: 'Normal',
    },
    {
      id: 6,
      name: 'Course Completion Certificate',
      type: 'Certificates',
      category: 'Incoming',
      date: '2024-11-20',
      status: 'Ready',
      size: '312 KB',
      from: 'Academic Office',
      priority: 'Normal',
    },
  ];

  const templates = [
    { id: 1, name: 'Leave Application', description: 'Standard leave request form' },
    { id: 2, name: 'Grade Appeal', description: 'Request for grade reconsideration' },
    { id: 3, name: 'Course Registration', description: 'Course enrollment form' },
    { id: 4, name: 'Transcript Request', description: 'Official transcript request' },
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'All' || doc.category === selectedTab || selectedTab === 'Templates';
    return matchesSearch && matchesTab;
  });

  function getStatusIconName(status: string) {
    switch (status.toLowerCase()) {
      case 'ready':
      case 'approved':
        return 'checkmark-circle';
      case 'pending':
        return 'time';
      case 'rejected':
        return 'close-circle';
      default:
        return 'alert-circle';
    }
  }

  function getStatusColor(status: string) {
    switch (status.toLowerCase()) {
      case 'ready':
      case 'approved':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'rejected':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  }

  function getPriorityColor(priority: string) {
    switch (priority.toLowerCase()) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return '#6B7280';
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Documents</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="filter" size={20} color="#1E3A8A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="add" size={20} color="#1E3A8A" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search documents..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
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
        {selectedTab === 'Templates' ? (
          // Templates View
          <View>
            <Text style={styles.sectionTitle}>Document Templates</Text>
            {templates.map((template) => (
              <TouchableOpacity key={template.id} style={styles.templateCard}>
                <View style={styles.templateIcon}>
                  <Ionicons name="document-text" size={24} color="#3B82F6" />
                </View>
                <View style={styles.templateInfo}>
                  <Text style={styles.templateName}>{template.name}</Text>
                  <Text style={styles.templateDescription}>{template.description}</Text>
                </View>
                <TouchableOpacity style={styles.useTemplateButton}>
                  <Text style={styles.useTemplateText}>Use</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          // Documents View
          <View>
            {filteredDocuments.map((doc) => (
              <View key={doc.id} style={styles.documentCard}>
                <View style={styles.documentHeader}>
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
                    <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(doc.priority) }]} />
                  </View>
                </View>
                
                <View style={styles.documentDetails}>
                  <View style={styles.statusContainer}>
                    <Ionicons name={getStatusIconName(doc.status)} size={16} color={getStatusColor(doc.status)} />
                    <Text style={[styles.statusText, { color: getStatusColor(doc.status) }]}>
                      {doc.status}
                    </Text>
                  </View>
                  
                  <View style={styles.sourceContainer}>
                    <Text style={styles.sourceLabel}>
                      {doc.category === 'Incoming' ? 'From:' : 'To:'}
                    </Text>
                    <Text style={styles.sourceText}>
                      {doc.from || doc.to}
                    </Text>
                  </View>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="eye" size={16} color="#6B7280" />
                    <Text style={styles.actionButtonText}>View</Text>
                  </TouchableOpacity>
                  {(doc.status.toLowerCase() === 'ready' || doc.status.toLowerCase() === 'approved') && (
                    <TouchableOpacity style={styles.actionButton}>
                      <Ionicons name="download" size={16} color="#6B7280" />
                      <Text style={styles.actionButtonText}>Download</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickActionButton}>
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.quickActionText}>New Request</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
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
  tabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 12,
  },
  selectedTab: {
    backgroundColor: '#1E3A8A',
  },
  tabText: {
    fontSize: 12,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 16,
  },
  documentCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  priorityIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
  },
  documentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  sourceContainer: {
    alignItems: 'flex-end',
  },
  sourceLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  sourceText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 8,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  templateCard: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  templateIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#EBF4FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  useTemplateButton: {
    backgroundColor: '#1E3A8A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  useTemplateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  quickActions: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  quickActionButton: {
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});