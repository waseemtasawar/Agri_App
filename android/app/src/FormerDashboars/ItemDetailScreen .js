import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const ItemDetailScreen = ({route, navigation}) => {
  const {item} = route.params;
  const {phoneNumber} = route.params;

  const handlePurchase = () => {
    // Pass any required parameters to the PurchaseScreen
    navigation.navigate('PurchaseScreen', {item: item , phoneNumber});
    console.log(phoneNumber);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>کاشتکاری کے اوزار</Text>
      <Image source={{ uri: item.imageUri }} style={styles.image} />
      <View style={styles.detailSection}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.name}>{item.ownerName}</Text>
        <Text style={styles.price}>{item.price}/- فی گھنٹہ</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.name}>{item.contactNumber}</Text>
        <TouchableOpacity
          style={styles.purchaseButton}
          onPress={handlePurchase}
          activeOpacity={0.7}>
          <LinearGradient
            colors={['#4b830d', '#9ccc65']}
            style={styles.gradient}>
           
           <Text style={styles.purchaseButtonText}>مشین کو کرائے پر لیں۔</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00bfff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4b830d', // Adjust the color to match your theme
    textAlign: 'center', // Center the text
    paddingVertical: 16, // Add padding at the top and bottom
    backgroundColor: '#adff2f', // A light background color for the header
    // Include any additional styling for the header you see fit
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  detailSection: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  rating: {
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    color: '#4b830d',
    marginVertical: 5,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  owner: {
    fontSize: 16,
    color: '#333',
  },
  contact: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },

  purchaseButton: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gradient: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  // Additional styles
});

export default ItemDetailScreen;