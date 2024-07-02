import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  PermissionsAndroid,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';

const images = {
  rented: require('../Images/newtools.jpeg'),
  realtimeMonitoring: require('../Images/real.jpeg'),
  WaterNeed: require('../Images/water.jpeg'),
  crops: require('../Images/cropss.jpg'),
};
const weatherIcons = {
  cloudy: require('../Images/cloudy.png'),
  raining: require('../Images/raining.png'),
  snow: require('../Images/snow.png'),
  storm: require('../Images/storm.png'),
  sun: require('../Images/sun.png'),
};
const getWeatherIconKey = main => {
  switch (main.toLowerCase()) {
    case 'clouds':
      return 'cloudy';
    case 'rain':
      return 'raining';
    case 'snow':
      return 'snow';
    case 'thunderstorm':
      return 'storm';
    case 'clear':
    default:
      return 'sun';
  }
};

const translateToUrdu = description => {
  const translations = {
    'clear sky': 'صاف آسمان',
    'few clouds': 'چند بادل',
    'scattered clouds': 'بکھرے ہوئے بادل',
    'broken clouds': 'ٹوٹے ہوئے بادل',
    'shower rain': 'شاور بارش',
    rain: 'بارش',
    thunderstorm: 'آندھی',
    snow: 'برف',
    mist: 'دھند',
    'overcast clouds': 'ابر آلود بادل',
  };
  return translations[description.toLowerCase()] || description;
};

const FormerDash = ({navigation, route}) => {
  const {userName} = route.params;
  const {name} = route.params;
  const {phoneNumber} = route.params;

  const [weather, setWeather] = useState({
    date: '',
    temperature: '',
    description: '',
    icon: 'sun',
  });

  const getLocationAndWeather = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        fetchWeather(latitude, longitude);
      },
      error => {
        console.log(error.code, error.message);
        Alert.alert('Error', 'Unable to fetch location.');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      getLocationAndWeather();
    }
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This app needs to access your location for weather updates',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location Permission Granted');
        getLocationAndWeather();
      } else {
        console.log('Location Permission Denied');
        Alert.alert(
          'Location Permission',
          'Permission to access location was denied',
          [{text: 'OK'}],
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const fetchWeather = async (latitude, longitude) => {
    const apiKey = '15e6bd73ab07f8f363182ed7797059a6';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      const {data} = response;
      const newWeather = {
        date: new Date().toLocaleDateString('ur-PK'),
        temperature: `${Math.round(data.main.temp)}° C`,
        description: translateToUrdu(data.weather[0].description),
        icon: getWeatherIconKey(data.weather[0].main),
      };
      setWeather(newWeather);
    } catch (error) {
      console.error(error);
    }
  };
  const signOut = () => {
    navigation.navigate('Login');
  };

  const notification = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('Booked')
        .where('FarmerNumber', '==', phoneNumber)
        .get();
      querySnapshot.forEach(doc => {
        const {name, ownername, hours, totalPrice, address, contactNumber} =
          doc.data();
        Alert.alert(
          'بکنگ کی تفصیلات',
          `آپ نے ${ownername} سے ${hours} گھنٹے کے لیے ${name} بک کیا ہے جس کی قیمت ${totalPrice} ہے۔ اس کا پتہ ${address} پر ہے۔ رینٹر کا رابطہ نمبر: ${contactNumber}۔ یہ 2-3 کاروباری دنوں کے اندر پہنچایا جائے گا۔`,
        );
      });
    } catch (error) {
      console.error('Error fetching booking details:', error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={notification}>
            <Text style={styles.notificationText}>بکنگ</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>
            <Text style={styles.farmerName}>
              خوش آمدید, {userName}
              {name}!
            </Text>
          </Text>
          <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
            <Text style={styles.signOutText}>باہر جائیں</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LinearGradient
        colors={['#4b830d', '#96c93d']}
        style={styles.weatherContainer}>
        <Text style={styles.dateText}>{weather.date}</Text>
        <Text style={styles.temperatureText}>{weather.temperature}</Text>
        <Image source={weatherIcons[weather.icon]} style={styles.weatherIcon} />
        <Text style={styles.descriptionText}>{weather.description}</Text>
      </LinearGradient>
      <View style={styles.serviceGrid}>
        <View style={styles.gridRow}>
          <ServiceButton
            imageKey="realtimeMonitoring"
            title="ریئل ٹائم مانیٹرنگ"
            onPress={() => navigation.navigate('RealTimeMonitoringScreen')}
          />
          <ServiceButton
            imageKey="WaterNeed"
            title="پانی کا نظام"
            onPress={() => navigation.navigate('WaterNeedScreen')}
          />
          <ServiceButton
            imageKey="rented"
            title="کرائے کے اوزار"
            onPress={() =>
              navigation.navigate('RentedItemsScreens', {phoneNumber})
            }
          />
          <ServiceButton
            imageKey="crops"
            title="فصلوں کی معلومات"
            onPress={() => navigation.navigate('CropsInfoScreen')}
          />
          <ServiceButton
            imageKey="crops"
            title="کھاد"
            onPress={() => navigation.navigate('FertilizerScreen')}
          />
          <ServiceButton
            imageKey="crops"
            title="خبریں اور وسائل"
            onPress={() => navigation.navigate('BankLoanInfo')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const ServiceButton = ({imageKey, title, onPress}) => (
  <TouchableOpacity style={styles.serviceButton} onPress={onPress}>
    <Image source={images[imageKey]} style={styles.serviceImage} />
    <Text style={styles.serviceTitle}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'deepskyblue',
    flex: 1,
  },
  weatherContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 10,
    elevation: 5,
    backgroundColor: '#4b830d',
  },
  dateText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  temperatureText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  header: {
    backgroundColor: '#4b830d',
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  signOutButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 20,
    zIndex: 1,
  },
  signOutText: {
    color: 'black',
    fontWeight: '900',
  },
  notificationButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 20,
    zIndex: 1,
  },
  notificationText: {
    color: 'black',
    fontWeight: '900',
  },
  descriptionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
    padding: 5,
    textAlign: 'center',
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
  serviceGrid: {
    flex: 1,
    padding: 10,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  serviceButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    width: '30%',
    minHeight: 120,
  },
  serviceImage: {
    width: '80%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  serviceGrid: {
    padding: 10,
  },
  gridRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceButton: {
    flexBasis: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'mintcream',
    borderRadius: 15,
    padding: 10,
    elevation: 3,
    marginVertical: 10,
  },
  serviceTitle: {
    marginTop: 10,
    fontSize: 12.2,
    color: '#555',
  },
  serviceImage: {
    width: '80%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 8,
    borderRadius: 10,
  },
});

export default FormerDash;
