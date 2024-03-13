import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import CardsView from './tabContents/CardsView';
import FooterMenu from './footerMenu/FooterMenu';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('CatergoryList');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'CatergoryList':
        return (
          <View style={styles.tabContent}>
            <CardsView></CardsView>
          </View>
        );
      case 'MenuList':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.cardText}>This is menu list</Text>
          </View>
        );
      // Add more cases for additional tabs as needed
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bgstyle}>
        <View style={styles.tabs}>
        <Pressable
          style={[styles.tab, activeTab === 'CatergoryList' && styles.activeTab]}
          onPress={() => setActiveTab('CatergoryList')}
        >
          <Text style={[styles.tabText, activeTab === 'CatergoryList' && styles.activetabText]}>Catergory List</Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'MenuList' && styles.activeTab]}
          onPress={() => setActiveTab('MenuList')}
        >
          <Text style={[styles.tabText, activeTab === 'MenuList' && styles.activetabText]}>Menu List</Text>
        </Pressable>
        </View>
        {renderTabContent()}
      </View>
      <FooterMenu></FooterMenu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bgstyle: {
    backgroundColor: "#1A78F1",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    padding: 16,
    width: '100%',
    height: '18%',
    flexDirection: 'row',
    alignItems: 'bottom',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5, 
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 4,
    marginTop: 'auto',
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  tab: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30
  },
  activeTab: {
    backgroundColor: '#ff6726',
    color: '#ffffff'
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activetabText: {
    color: '#ffffff'
  },
  tabContent: {
    justifyContent: 'top',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 15,
    paddingRight: 15,
  },
  tabContentCard: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }
});

export default AdminPage;
