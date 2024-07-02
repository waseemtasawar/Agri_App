import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';

const BankLoanInfo = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../Images/leaves.jpeg')}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome, Farmer!</Text>
        <Text style={styles.subtitle}>
          Explore your financial options below:
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LoansScreen')}>
          <Text style={styles.buttonText}>Explore Available Loans</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#E91E63'}]} // Pink button for insurance
          onPress={() => navigation.navigate('InsuranceScreen')}>
          <Text style={styles.buttonText}>Discover Insurance Options</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark semi-transparent overlay
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50', // Green button color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BankLoanInfo;
