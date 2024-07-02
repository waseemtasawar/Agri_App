// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './android/app/src/component/Home';
import Login from './android/app/src/component/Login';
import Signup from './android/app/src/component/Signup';
import LoFormer from './android/app/src/component/LoFormer';
import LoRenter from './android/app/src/component/LoRenter';
import SiFormer from './android/app/src/component/SiFormer';
import SiRenter from './android/app/src/component/SiRenter';
import OwnerDashboard from './android/app/src/DashBorad/OwnerDashboard ';
import RentedItemsScreen from './android/app/src/DashBorad/RentedItemsScreen';
import AddMachineScreen from './android/app/src/DashBorad/AddMachineScreen';

import FormerDash from './android/app/src/DashBorad/FormerDash';
import RealTimeMonitoringScreen from './android/app/src/FormerDashboars/RealTimeMonitoringScreen ';
import WaterNeedScreen from './android/app/src/FormerDashboars/WaterNeedScreen';
import RentedItemsScreens from './android/app/src/FormerDashboars/RentedItemsScreens';
import ItemDetailScreen from './android/app/src/FormerDashboars/ItemDetailScreen ';
import PurchaseScreen from './android/app/src/FormerDashboars/PurchaseScreen ';
import CropsInfoScreen from './android/app/src/FormerDashboars/CropsInfoScreen';
import CropDetailScreen from './android/app/src/FormerDashboars/CropDetailScreen';
import FertilizerScreen from './android/app/src/FormerDashboars/FertilizerScreen';
import BankLoanInfo from './android/app/src/FormerDashboars/BankLoanInfo';
import LoansScreen from './android/app/src/FormerDashboars/LoansScreen';
import InsuranceScreen from './android/app/src/FormerDashboars/InsuranceScreen';
import LoanDetails from './android/app/src/FormerDashboars/LoanDetails';
import InsuranceDetails from './android/app/src/FormerDashboars/InsuranceDetails';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="LoFormer" component={LoFormer} />
        <Stack.Screen name="LoRenter" component={LoRenter} />
        <Stack.Screen name="SiFormer" component={SiFormer} />
        <Stack.Screen name="SiRenter" component={SiRenter} />
        <Stack.Screen name="OwnerDashboard" component={OwnerDashboard} />
        <Stack.Screen name="RentedItemsScreen" component={RentedItemsScreen} />
        <Stack.Screen name="AddMachineScreen" component={AddMachineScreen} />
        <Stack.Screen name="FormerDash" component={FormerDash} />
        <Stack.Screen name="ItemDetailScreen" component={ItemDetailScreen} />
        <Stack.Screen name="PurchaseScreen" component={PurchaseScreen} />

        <Stack.Screen
          name="RentedItemsScreens"
          component={RentedItemsScreens}
        />
        <Stack.Screen
          name="RealTimeMonitoringScreen"
          component={RealTimeMonitoringScreen}
        />
        <Stack.Screen name="WaterNeedScreen" component={WaterNeedScreen} />
        <Stack.Screen name="CropsInfoScreen" component={CropsInfoScreen} />
        <Stack.Screen name="CropDetailScreen" component={CropDetailScreen} />
        <Stack.Screen name="FertilizerScreen" component={FertilizerScreen} />
        <Stack.Screen name="BankLoanInfo" component={BankLoanInfo} />
        <Stack.Screen name="LoansScreen" component={LoansScreen} />
        <Stack.Screen name="InsuranceScreen" component={InsuranceScreen} />
        <Stack.Screen name="LoanDetails" component={LoanDetails} />
        <Stack.Screen name="InsuranceDetails" component={InsuranceDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
