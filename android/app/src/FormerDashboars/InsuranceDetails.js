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

const InsuranceDetails = ({route}) => {
  const {policy} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={policy.policyImage} style={styles.image} />
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.policyName}>{policy.policyName}</Text>
        <Text style={styles.policyDetails}>{policy.policyDetails}</Text>
        <Button
          title="Apply Now"
          onPress={() => Linking.openURL(policy.policyLink)}
          color="#3498db"
        />
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  policyName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#3498db',
  },
  policyDetails: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
});

export default InsuranceDetails;
