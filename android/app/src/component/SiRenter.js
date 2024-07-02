import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Filed from './Filed';
import Button from './Button';
import firestore from '@react-native-firebase/firestore'; 
import {darkgreen} from './Constants';

const {width} = Dimensions.get('window');

const SiFormer = ({navigation}) => {
  const [userName, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const saveUserData = async () => {
    try {
      const usersRef = firestore().collection('Renter');
      await usersRef.add({
        userName,
        phoneNumber,
        password,
      });
      console.log('User data saved successfully!');
      navigation.navigate('OwnerDashboard' , { userName , phoneNumber});
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };
  return (
    <LinearGradient colors={['#a8e063', '#56ab2f']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>کرایہ دار</Text>
        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>خوش آمدید</Text>
          <Text style={styles.signUpText}>اپنا اکاؤنٹ بنائیں</Text>
          <Filed
            placeholder="اپنا نام درج کریں"
            value={userName}
            onChangeText={value => setName(value)}
          />
          <Filed
            placeholder="اپنا نمبر درج کریں"
            keyboardType={'numeric'}
            value={phoneNumber}
            onChangeText={value => setPhoneNumber(value)}
          />
          <Filed
            placeholder="اپنا پاس ورڈ درج کریں"
            secureTextEntry={true}
            value={password}
            onChangeText={value => setPassword(value)}
          />
          <Button
            btnLable="دبائیں"
            bgColor={darkgreen}
            textColor="white"
            Press={() => {
              saveUserData(); 
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: 64,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 50,
    paddingHorizontal: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: width * 0.9, // Responsive width
  },
  welcomeText: {
    fontSize: 40,
    color: darkgreen,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  signUpText: {
    color: 'gray',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SiFormer;
