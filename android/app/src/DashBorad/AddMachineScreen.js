import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';

const AddMachineScreen = ({ route }) => {
  const { userName } = route.params;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleAddMachine = async () => {
    try {
      // Validate required fields
      if (!name || !price || !imageUri || !description || !contactNumber) {
        Alert.alert('Error', 'Please fill out all fields.');
        return;
      }

      await firestore().collection('Machine').add({
        name,
        price,
        imageUri,
        description,
        contactNumber,
        ownerName: userName,
      });

      Alert.alert('کامیابی', 'مشین کامیابی سے شامل ہوگئی۔');

      // Reset fields after adding machine
      setName('');
      setPrice('');
      setImageUri(null);
      setDescription('');
      setContactNumber('');
    } catch (error) {
      console.error('Error adding machine:', error);
      Alert.alert('Error', 'An error occurred while adding the machine. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>کاشکاری کے اوزار داخل  کریں</Text>
      <View style={styles.contentBox}>
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        )}
        <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
          <Text style={styles.buttonText}>تصویر منتخب کریں</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholderTextColor="#8e8e8e"
          placeholder="مشین کا نام"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#8e8e8e"
          placeholder="فی گھنٹہ قیمت"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#8e8e8e"
          placeholder="مشین کی تفصیل"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#8e8e8e"
          placeholder="رابطہ نمبر"
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.button} onPress={handleAddMachine}>
          <Text style={styles.buttonText}>مشین شامل کریں</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00bfff',
  },
  contentBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    height: 50,
    borderColor: '#4b830d',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#33691e',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 16,
    backgroundColor: '#4b830d',
  },
  previewImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderRadius: 100,
    marginBottom: 20,
  },
});

export default AddMachineScreen;
