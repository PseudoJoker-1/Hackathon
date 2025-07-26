import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function CommunityScreen() {
  const [selectedTab, setSelectedTab] = useState('Events');
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const tabs = ['Events', 'Groups', 'Feed', 'Leaderboard'];

  const events = [
    {
      id: 1,
      title: 'Tech Innovation Workshop',
      date: '2024-12-20',
      time: '14:00',
      location: 'Innovation Lab',
      participants: 45,
      maxParticipants: 60,
      points: 150,
      category: 'Workshop',
      description: 'Learn about latest tech trends and innovations',
      isRegistered: false,
    },
    {
      id: 2,
      title: 'Student Leadership Summit',
      date: '2024-12-22',
      time: '09:00',
      location: 'Main Auditorium',
      participants: 120,
      maxParticipants: 150,
      points: 200,
      category: 'Conference',
      description: 'Develop your leadership skills with industry experts',
      isRegistered: true,
    },
    {
      id: 3,
      title: 'Community Service Day',
      date: '2024-12-25',
      time: '08:00',
      location: 'City Center',
      participants: 80,
      maxParticipants: 100,
      points: 300,
      category: 'Volunteer',
      description: 'Give back to the community through volunteer work',
      isRegistered: false,
    },
  ];

  const groups = [
    {
      id: 1,
      name: 'Computer Science Club',
      members: 234,
      category: 'Academic',
      description: 'For CS students and tech enthusiasts',
      isJoined: true,
      avatar: '💻',
    },
    {
      id: 2,
      name: 'Photography Society',
      members: 156,
      category: 'Creative',
      description: 'Capture moments, share stories',
      isJoined: false,
      avatar: '📸',
    },
    {
      id: 3,
      name: 'Debate Club',
      members: 89,
      category: 'Academic',
      description: 'Sharpen your argumentation skills',
      isJoined: true,
      avatar: '🎤',
    },
    {
      id: 4,
      name: 'Environmental Action',
      members: 178,
      category: 'Social',
      description: 'Making campus more sustainable',
      isJoined: false,
      avatar: '🌱',
    },
  ];

  const feedPosts = [
    {
      id: 1,
      author: 'Sarah Johnson',
      avatar: 'SJ',
      time: '2 hours ago',
      content: 'Just finished my final presentation for Digital Marketing! Feeling accomplished 🎉',
      likes: 24,
      comments: 8,
      points: '+50 points earned',
    },
    {
      id: 2,
      author: 'Mike Chen',
      avatar: 'MC',
      time: '4 hours ago',
      content: 'Great workshop on AI today! Thanks to everyone who attended. Looking forward to the next one.',
      likes: 18,
      comments: 12,
      points: '+100 points earned',
    },
    {
      id: 3,
      author: 'Emma Davis',
      avatar: 'ED',
      time: '6 hours ago',
      content: 'Study group for Database Systems tomorrow at 3 PM in Library Room 204. All welcome!',
      likes: 31,
      comments: 15,
      points: '+25 points earned',
    },
  ];

  const leaderboard = [
    { id: 1, name: 'Alex Thompson', points: 2450, rank: 1, badge: '🏆' },
    { id: 2, name: 'Maria Garcia', points: 2380, rank: 2, badge: '🥈' },
    { id: 3, name: 'David Kim', points: 2210, rank: 3, badge: '🥉' },
    { id: 4, name: 'Sarah Johnson', points: 1980, rank: 4, badge: '⭐' },
    { id: 5, name: 'Mike Chen', points: 1850, rank: 5, badge: '⭐' },
    { id: 6, name: 'Emma Davis', points: 1720, rank: 6, badge: '⭐' },
    { id: 7, name: 'You', points: 1250, rank: 12, badge: '🎯' },
  ];

  const handleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'workshop': return '#3B82F6';
      case 'conference': return '#8B5CF6';
      case 'volunteer': return '#10B981';
      case 'academic': return '#1E3A8A';
      case 'creative': return '#F59E0B';
      case 'social': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const renderEvents = () => (
    <View>
      {events.map((event) => (
        <View key={event.id} style={styles.eventCard}>
          <View style={styles.eventHeader}>
            <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(event.category) }]}>
              <Text style={styles.categoryText}>{event.category}</Text>
            </View>
            <View style={styles.pointsBadge}>
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text style={styles.pointsText}>+{event.points}</Text>
            </View>
          </View>
          
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDescription}>{event.description}</Text>
          
          <View style={styles.eventDetails}>
            <View style={styles.eventDetailItem}>
              <Ionicons name="calendar" size={16} color="#6B7280" />
              <Text style={styles.eventDetailText}>{event.date}</Text>
            </View>
            <View style={styles.eventDetailItem}>
              <Ionicons name="time" size={16} color="#6B7280" />
              <Text style={styles.eventDetailText}>{event.time}</Text>
            </View>
            <View style={styles.eventDetailItem}>
              <Ionicons name="location" size={16} color="#6B7280" />
              <Text style={styles.eventDetailText}>{event.location}</Text>
            </View>
          </View>
          
          <View style={styles.eventFooter}>
            <View style={styles.participantsInfo}>
              <Ionicons name="people" size={16} color="#6B7280" />
              <Text style={styles.participantsText}>
                {event.participants}/{event.maxParticipants} participants
              </Text>
            </View>
            <TouchableOpacity 
              style={[
                styles.registerButton,
                event.isRegistered && styles.registeredButton
              ]}
            >
              <Text style={[
                styles.registerButtonText,
                event.isRegistered && styles.registeredButtonText
              ]}>
                {event.isRegistered ? 'Registered' : 'Register'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderGroups = () => (
    <View>
      {groups.map((group) => (
        <View key={group.id} style={styles.groupCard}>
          <View style={styles.groupHeader}>
            <View style={styles.groupAvatar}>
              <Text style={styles.groupAvatarText}>{group.avatar}</Text>
            </View>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{group.name}</Text>
              <Text style={styles.groupDescription}>{group.description}</Text>
              <View style={styles.groupMeta}>
                <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(group.category) }]}>
                  <Text style={styles.categoryText}>{group.category}</Text>
                </View>
                <Text style={styles.membersText}>{group.members} members</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={[
                styles.joinButton,
                group.isJoined && styles.joinedButton
              ]}
            >
              <Text style={[
                styles.joinButtonText,
                group.isJoined && styles.joinedButtonText
              ]}>
                {group.isJoined ? 'Joined' : 'Join'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderFeed = () => (
    <View>
      {feedPosts.map((post) => (
        <View key={post.id} style={styles.postCard}>
          <View style={styles.postHeader}>
            <View style={styles.postAvatar}>
              <Text style={styles.postAvatarText}>{post.avatar}</Text>
            </View>
            <View style={styles.postInfo}>
              <Text style={styles.postAuthor}>{post.author}</Text>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>
            <View style={styles.postPoints}>
              <Text style={styles.postPointsText}>{post.points}</Text>
            </View>
          </View>
          
          <Text style={styles.postContent}>{post.content}</Text>
          
          <View style={styles.postActions}>
            <TouchableOpacity 
              style={styles.postAction}
              onPress={() => handleLike(post.id)}
            >
              <Ionicons 
                name={likedPosts.includes(post.id) ? "heart" : "heart-outline"}
                size={18} 
                color={likedPosts.includes(post.id) ? "#EF4444" : "#6B7280"}
              />
              <Text style={styles.postActionText}>{post.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postAction}>
              <Ionicons name="chatbubble-outline" size={18} color="#6B7280" />
              <Text style={styles.postActionText}>{post.comments}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderLeaderboard = () => (
    <View>
      <View style={styles.leaderboardHeader}>
        <Ionicons name="trophy" size={24} color="#F59E0B" />
        <Text style={styles.leaderboardTitle}>Top Contributors</Text>
      </View>
      
      {leaderboard.map((user) => (
        <View key={user.id} style={[
          styles.leaderboardItem,
          user.name === 'You' && styles.currentUserItem
        ]}>
          <View style={styles.rankContainer}>
            <Text style={styles.rankBadge}>{user.badge}</Text>
            <Text style={styles.rankNumber}>#{user.rank}</Text>
          </View>
          <Text style={[
            styles.leaderboardName,
            user.name === 'You' && styles.currentUserName
          ]}>
            {user.name}
          </Text>
          <Text style={styles.leaderboardPoints}>{user.points} pts</Text>
        </View>
      ))}
    </View>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'Events': return renderEvents();
      case 'Groups': return renderGroups();
      case 'Feed': return renderFeed();
      case 'Leaderboard': return renderLeaderboard();
      default: return renderEvents();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="filter" size={20} color="#1E3A8A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="add" size={20} color="#1E3A8A" />
          </TouchableOpacity>
        </View>
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
  // Events Styles
  eventCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#D97706',
    marginLeft: 4,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  eventDetails: {
    marginBottom: 16,
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventDetailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participantsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  registerButton: {
    backgroundColor: '#1E3A8A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  registeredButton: {
    backgroundColor: '#10B981',
  },
  registerButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  registeredButtonText: {
    color: '#FFFFFF',
  },
  // Groups Styles
  groupCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupAvatar: {
    width: 48,
    height: 48,
    backgroundColor: '#EBF4FF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  groupAvatarText: {
    fontSize: 20,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  groupDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  groupMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  membersText: {
    fontSize: 12,
    color: '#6B7280',
  },
  joinButton: {
    backgroundColor: '#1E3A8A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  joinedButton: {
    backgroundColor: '#10B981',
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  joinedButtonText: {
    color: '#FFFFFF',
  },
  // Feed Styles
  postCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postAvatar: {
    width: 40,
    height: 40,
    backgroundColor: '#1E3A8A',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  postAvatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  postInfo: {
    flex: 1,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  postTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  postPoints: {
    backgroundColor: '#DCFCE7',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  postPointsText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#16A34A',
  },
  postContent: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 24,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  postActionText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  // Leaderboard Styles
  leaderboardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  leaderboardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginLeft: 8,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  currentUserItem: {
    backgroundColor: '#EBF4FF',
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  rankBadge: {
    fontSize: 20,
    marginRight: 8,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  leaderboardName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  currentUserName: {
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  leaderboardPoints: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
});