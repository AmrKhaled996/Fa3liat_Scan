// // App.tsx
// import React from 'react';
// import { Platform, Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { LinearGradient } from 'expo-linear-gradient';
// import LoginScreen from './screens/LoginScreen';
// import QRScannerScreen from './screens/QRScannerScreen';
// import './style.css'; // NativeWind global styles

// const Tab = createBottomTabNavigator();

// function TabBarBackground() {
//   return (
//     <LinearGradient
//       colors={['#1a0a2e', '#2d0f4e']}
//       style={{ position: 'absolute', inset: 0 }}
//     />
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           headerShown: false,
//           tabBarBackground: () => <TabBarBackground />,
//           tabBarStyle: {
//             borderTopWidth: 1,
//             borderTopColor: 'rgba(187, 82, 224, 0.2)',
//             height: Platform.OS === 'ios' ? 88 : 64,
//             paddingBottom: Platform.OS === 'ios' ? 24 : 10,
//             paddingTop: 10,
//           },
//           tabBarActiveTintColor: '#FF49B5',
//           tabBarInactiveTintColor: 'rgba(255,255,255,0.3)',
//           tabBarLabelStyle: {
//             fontSize: 10,
//             fontWeight: '700',
//             letterSpacing: 1.2,
//             textTransform: 'uppercase',
//           },
//           tabBarIcon: ({ focused, color }) => {
//             const icons: Record<string, string> = {
//               Login: '🔐',
//               Scanner: '⬛',
//             };
//             return (
//               <View
//                 className={`w-9 h-9 rounded-xl items-center justify-center`}
//                 style={{
//                     width: 50,
//                     height: 50,
//                     borderRadius:12,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   backgroundColor: focused ? '#fff' : 'transparent',
//                   borderWidth: focused ? 1 : 0,
//                   borderColor: focused ? '#BB52E0' : 'transparent',
//                 }}
//               >
//                 <Text style={{ fontSize: 17 }}>{icons[route.name]}</Text>
//               </View>
//             );
//           },
//         })}
//       >
//         <Tab.Screen name="Scanner" component={QRScannerScreen} />
//         <Tab.Screen name="Login" component={LoginScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import QRScannerScreen from './screens/QRScannerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Scanner" component={QRScannerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}