import React from 'react';
import { View, Text, Button } from 'react-native';

import addDataToFirestore from './fireStore/fireStore';
import signUp from './fireStore/auth';

const CreateUsers = () => {
  const handleSignUp = () => {
    signUp('Admin', 'admin');
  };

  const handleAddToFirestore = () => {
    addDataToFirestore({ key: 'value' });
  };

  return (
    <View>
      <Text>create users</Text>
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Add to Firestore" onPress={handleAddToFirestore} />
    </View>
  );
};

export default CreateUsers;
