import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const RentedItemsScreens = ({ navigation, route }) => {
  const {phoneNumber} = route.params;
  const [rentedItems, setRentedItems] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Machine')
      .onSnapshot(querySnapshot => {
        const items = [];
        querySnapshot.forEach(documentSnapshot => {
          items.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        setRentedItems(items);
      });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('ItemDetailScreen', { item, phoneNumber })}>
      <Image source={{ uri: item.imageUri }} style={styles.image} />
      <View style={styles.textContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.name}>{item.ownerName}</Text>
        <Text style={styles.price}>{item.price}/- فی گھنٹہ</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.name}>{item.contactNumber}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.bordercontainer}>
      <View>
        <Text style={styles.header}>کاشتکاری کے اوزار</Text>
      </View>
      <FlatList
        data={rentedItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bordercontainer: {
    flex: 1,
    backgroundColor: '#00bfff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 16,
    backgroundColor: '#4b830d',
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  rating: {
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4b830d',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
  },
});

export default RentedItemsScreens;
