import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-svg-charts';

interface AdminHomeProps {}

const AdminHome: React.FC<AdminHomeProps> = () => {
  const data: number[] = [50, 10, 40, 95, 4, 24, 85];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>WELCOME BACK</Text>
        <Image
          style={styles.profile}
          source={require('../local-assets/profile.jpg')}
        />
      </View>
      <View style={styles.cards}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>$1.150</Text>
          <Text style={styles.cardSubtitle}>Weekly income</Text>
          <View style={styles.cardLine} />
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>15.3k</Text>
          <Text style={styles.cardSubtitle}>New Users</Text>
          <View style={styles.cardLine} />
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>35.1k</Text>
          <Text style={styles.cardSubtitle}>User Interactions</Text>
          <View style={styles.cardLine} />
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>1.361</Text>
          <Text style={styles.cardSubtitle}>User Interactions</Text>
          <View style={styles.cardLine} />
        </View>
      </View>
      <View style={styles.interactions}>
        <Text style={styles.sectionTitle}>INTERACTIONS</Text>
        <Text style={styles.subsectionTitle}>Follower Stats</Text>
        <LineChart
          style={styles.chart}
          data={data}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          contentInset={{ top: 20, bottom: 20 }}
        />
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statTitle}>BOUNCED</Text>
            <Text style={styles.statValue}>29</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statTitle}>RETURNING</Text>
            <Text style={styles.statValue}>15</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statTitle}>NEW</Text>
            <Text style={styles.statValue}>37</Text>
          </View>
        </View>
      </View>
      <View style={styles.projects}>
        <Text style={styles.sectionTitle}>YOUR PROJECTS</Text>
        <Text style={styles.subsectionTitle}>View All</Text>
        <View style={styles.project}>
          <Text style={styles.projectTitle}>Website Launch</Text>
          <Text style={styles.projectStatus}>Developing</Text>
          <Text style={styles.projectProgress}>2/6</Text>
        </View>
        <View style={styles.project}>
          <Text style={styles.projectTitle}>Application Update</Text>
          <Text style={styles.projectStatus}>Complete</Text>
          <Text style={styles.projectProgress}>10/10</Text>
        </View>
        <View style={styles.project}>
          <Text style={styles.projectTitle}>Server Data Transfer</Text>
          <Text style={styles.projectStatus}>Canceled</Text>
          <Text style={styles.projectProgress}>3/5</Text>
        </View>
        <View style={styles.project}>
          <Text style={styles.projectTitle}>Project Assignment</Text>
          <Text style={styles.projectStatus}>On hold</Text>
          <Text style={styles.projectProgress}>16:23</Text>
        </View>
      </View>
      <View style={styles.notifications}>
        <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>
        <Text style={styles.subsectionTitle}>View All</Text>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>
            Your account has been added to Web Design
          </Text>
          <Text style={styles.notificationType}>UPDATE</Text>
        </View>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>
            AppKit Mobile update has been completed. Good job!
          </Text>
          <Text style={styles.notificationType}>COMPLETE</Text>
        </View>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>
            Mockups Rejected. Event Emergency Meeting created by Admin
          </Text>
          <Text style={styles.notificationType}>URGENT</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  card: {
    width: '48%',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  cardLine: {
    height: 4,
    width: '100%',
    backgroundColor: '#eee',
    marginTop: 10,
  },
  interactions: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  subsectionTitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
  },
  chart: {
    height: 100,
    marginTop: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  stat: {
    width: '30%',
    height: 50,
    backgroundColor: '#eee',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 12,
    color: '#333',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  projects: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  project: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  projectTitle: {
    fontSize: 14,
    color: '#333',
  },
  projectStatus: {
    fontSize: 12,
    color: '#999',
  },
  projectProgress: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  notifications: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  notification: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  notificationText: {
    fontSize: 14,
    color: '#333',
  },
  notificationType: {
    fontSize: 12,
    color: '#999',
  },
});

export default AdminHome;
