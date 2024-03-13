import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  Alert,
} from 'react-native';

const deleteIcon = require('../../local-assets/delete_icon.png');
const editIcon = require('../../local-assets/edit_icon.png');

interface Card {
  id: string;
  title: string;
}

const CardsView = () => {
  const [cardColors, setCardColors] = useState<string[]>([]);
  const [cards, setCards] = useState<Card[]>([]);

  const API_BASE_URL = 'https://ey5cgjp181.execute-api.ap-south-1.amazonaws.com/develop/btinvoice';

  const loadColors = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getCardColors`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status for colors: ${response.status}`);
      }
      const data = await response.json();
      setCardColors(data);
    } catch (error) {
      console.error('Error loading colors:', error.message);
    }
  };

  const loadCards = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getCards`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status for cards: ${response.status}`);
      }
      const data = await response.json();
      setCardColors(data);
    } catch (error) {
      console.error('Error loading colors:', error.message);
    }
  };

  const updateData = async (updatedCardColors: string[], updatedCards: Card[]) => {
    try {
      setCardColors(updatedCardColors);
      setCards(updatedCards);

      await fetch(`${API_BASE_URL}/updateCardColors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cardColors: updatedCardColors }),
      });

      await fetch(`${API_BASE_URL}/updateCardsData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cards: updatedCards }),
      });
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async (index) => {
    Alert.prompt(
      'Admin Password',
      'Enter admin password to delete the card',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async (password) => {
            if (password === 'admin123') {
              const updatedCards = [...cards];
              updatedCards.splice(index, 1);
  
              const updatedColors = [...cardColors];
              updatedColors.splice(index, 1);
  
              await updateData(updatedColors, updatedCards);
            } else {
              Alert.alert('Incorrect Password', 'Please enter the correct admin password.');
            }
          },
        },
      ],
      'secure-text'
    );
  };

  const handleAddCategory = async () => {
    Alert.prompt(
      'Add Category',
      'Enter the name of the new category',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async (category) => {
            const categoryExists = cards.some((item) => item.title.toLowerCase() === category.toLowerCase());
  
            if (!categoryExists) {
              const updatedCards = [...cards, { id: String(Date.now()), title: category }];
              const updatedColors = [...cardColors, getRandomColor()];
  
              await updateData(updatedColors, updatedCards);
            } else {
              Alert.alert('Duplicate Category', 'The entered category already exists. Please enter a unique category name.');
            }
          },
        },
      ],
      'plain-text'
    );
  };
  
  const handleEdit = async (index) => {
    const currentCategory = cards[index].title;
  
    Alert.prompt(
      'Edit Category',
      'Enter the new name of the category',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async (newCategory) => {
            const newCategoryExists = cards.some((item, i) => i !== index && item.title.toLowerCase() === newCategory.toLowerCase());
  
            if (!newCategoryExists) {
              const updatedCards = [...cards];
              updatedCards[index] = { ...updatedCards[index], title: newCategory };
  
              await updateData(cardColors, updatedCards);
            } else {
              Alert.alert('Duplicate Category', 'The entered category already exists. Please enter a unique category name.');
            }
          },
        },
      ],
      'plain-text',
      currentCategory
    );
  };  

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const renderCard = ({ item, index }) => (
    <View style={[styles.card, { backgroundColor: cardColors[index] }]}>
      <Text style={styles.cardText}>{item.title}</Text>
      <Pressable onPress={() => handleDelete(index)} style={styles.deleteButton}>
        <Image source={deleteIcon} style={styles.icon} />
      </Pressable>
      <Pressable onPress={() => handleEdit(index)} style={styles.editButton}>
        <Image source={editIcon} style={styles.icon} />
      </Pressable>
    </View>
  );

  useEffect(() => {
    loadColors();
    loadCards();
  }, []);

  useFocusEffect(() => {
    const fetchData = async () => {
      // Refetch or reinitialize the state when the screen is focused
      await loadColors();
      await loadCards();
    };

    fetchData();
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        horizontal={false}
        numColumns={2}
      />
      <Pressable style={styles.addButton} onPress={handleAddCategory}>
        <Text style={styles.addButtonLabel}>Add Category</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  card: {
    flex: 1,
    height: 150,
    borderRadius: 8,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  editButton: {
    position: 'absolute',
    top: 8,
    right: 32,
  },
  icon: {
    width: 24,
    height: 24,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    marginTop: 40,
    backgroundColor: '#1A78F1',
    padding: 12,
    borderRadius: 8,
    zIndex: 1
  },
  addButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CardsView;