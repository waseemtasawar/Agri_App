import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Linking,
  Image,
  ScrollView,
} from 'react-native';

const LoanDetails = ({route}) => {
  const {loan} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={loan.loanImage} style={styles.image} />
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.loanName}>{loan.loanName}</Text>
          <Text style={styles.details}>{loan.loanDetails}</Text>
          <Button
            title="Apply Now"
            onPress={() => Linking.openURL(loan.loanLink)}
            color="#3498db"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  imageContainer: {
    height: 300, // Adjust the height as per your design
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 340,
    height: 290,
    borderRadius: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loanName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#3498db',
  },
  details: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
});

export default LoanDetails;
