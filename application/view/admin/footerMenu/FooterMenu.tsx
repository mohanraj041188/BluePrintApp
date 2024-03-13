import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

const FooterMenu = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.tab}>
        <Text style={styles.tabText}>Home</Text>
      </Pressable>

      <Pressable style={styles.tab}>
        <Text style={styles.tabText}>Profile</Text>
      </Pressable>

      <Pressable style={styles.tab}>
        <Text style={styles.tabText}>Settings</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1A78F1',
    height: 60,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: 'white',
  },
});

export default FooterMenu;
