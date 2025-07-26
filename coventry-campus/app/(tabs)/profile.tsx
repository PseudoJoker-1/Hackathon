import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [socialPoints, setSocialPoints] = useState(1250);

  const userInfo = {
    name: 'Alexander Smith',
    studentId: 'SU2024001',
    email: 'alex.smith@superior.edu',
    gpa: 3.75,
    credits: 124,
    semester: 'Fall 2024',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  };

  const achievements = [
    { id: 1, name: 'Dean\'s List', icon: 'trophy', color: '#F59E0B' },
    { id: 2, name: 'Perfect Attendance', icon: 'calendar', color: '#10B981' },
    { id: 3, name: 'Community Leader', icon: 'people', color: '#3B82F6' },
    { id: 4, name: 'Academic Excellence', icon: 'book', color: '#8B5CF6' },
  ];

  const socialHistory = [
    { id: 1, activity: 'Volunteered at University Fair', points: '+150', date: '2 days ago' },
    { id: 2, activity: 'Attended Leadership Workshop', points: '+100', date: '1 week ago' },
    { id: 3, activity: 'Free Coffee Reward', points: '-50', date: '1 week ago' },
    { id: 4, activity: 'Joined Study Group', points: '+75', date: '2 weeks ago' },
  ];

  const rewards = [
    { id: 1, name: 'Free Coffee', cost: 50, icon: 'cafe' },
    { id: 2, name: 'University Merch', cost: 200, icon: 'gift' },
    { id: 3, name: 'Priority Registration', cost: 500, icon: 'star' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications" size={20} color="#1E3A8A" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="settings" size={20} color="#1E3A8A" />
            </TouchableOpacity>
          </View>
        </View>

        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AS</Text>
            </View>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userInfo.name}</Text>
            <Text style={styles.userEmail}>{userInfo.email}</Text>
            <Text style={styles.studentId}>ID: {userInfo.studentId}</Text>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{userInfo.gpa}</Text>
            <Text style={styles.statLabel}>GPA</Text>
            <Ionicons name="trending-up" size={16} color="#10B981" />
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{userInfo.credits}</Text>
            <Text style={styles.statLabel}>Credits</Text>
            <Ionicons name="book" size={16} color="#3B82F6" />
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{socialPoints}</Text>
            <Text style={styles.statLabel}>Social Points</Text>
            <Ionicons name="star" size={16} color="#F59E0B" />
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => {
              return (
                <View key={achievement.id} style={styles.achievementCard}>
                  <View style={[styles.achievementIcon, { backgroundColor: achievement.color }]}>
                    <Ionicons name={achievement.icon as any} size={20} color="#FFFFFF" />
                  </View>
                  <Text style={styles.achievementName}>{achievement.name}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Social Score System */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Social Score</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.socialCard}>
            <View style={styles.socialHeader}>
              <View>
                <Text style={styles.socialPoints}>{socialPoints} points</Text>
                <Text style={styles.socialSubtext}>Available to spend</Text>
              </View>
              <Ionicons name="star" size={24} color="#F59E0B" />
            </View>
            
            <Text style={styles.rewardsTitle}>Available Rewards</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {rewards.map((reward) => {
                return (
                  <TouchableOpacity key={reward.id} style={styles.rewardCard}>
                    <View style={styles.rewardIcon}>
                      <Ionicons name={reward.icon as any} size={24} color="#1E3A8A" />
                    </View>
                    <Text style={styles.rewardName}>{reward.name}</Text>
                    <Text style={styles.rewardCost}>{reward.cost} pts</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {socialHistory.map((item) => (
            <View key={item.id} style={styles.activityCard}>
              <View style={styles.activityContent}>
                <Text style={styles.activityName}>{item.activity}</Text>
                <Text style={styles.activityDate}>{item.date}</Text>
              </View>
              <Text style={[
                styles.activityPoints,
                { color: item.points.startsWith('+') ? '#10B981' : '#EF4444' }
              ]}>
                {item.points}
              </Text>
            </View>
          ))}
        </View>

        {/* Account Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.optionCard}>
            <Text style={styles.optionText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionCard}>
            <Text style={styles.optionText}>Privacy Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionCard}>
            <Text style={styles.optionText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionCard}>
            <Text style={styles.optionText}>Help & Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.optionCard, styles.logoutCard]}>
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
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
  userCard: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  studentId: {
    fontSize: 14,
    color: '#6B7280',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
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
    marginBottom: 8,
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
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1F2937',
    textAlign: 'center',
  },
  socialCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
  },
  socialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  socialPoints: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  socialSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  rewardsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  rewardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginRight: 12,
    minWidth: 100,
  },
  rewardIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#EBF4FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  rewardName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  rewardCost: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
  },
  activityCard: {
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
  activityName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  activityPoints: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
    color: '#1F2937',
  },
  logoutCard: {
    backgroundColor: '#FEF2F2',
  },
  logoutText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '500',
  },
});