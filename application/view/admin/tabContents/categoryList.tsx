import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CategoryList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bgstyle}>
        
      </View>
      <Text style={styles.text}>Welcome to Category Page!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  bgstyle: {
    backgroundColor: "#1A78F1",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    padding: 16,
    width: '100%',
    height: 180,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'bottom',
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
});

export default CategoryList;
