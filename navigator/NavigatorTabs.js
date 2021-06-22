import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Events from '../screens/Events';
import MoreEvents from '../screens/MoreEvents';
import Calendar from '../screens/Calendar';
import Favorites from '../screens/Favorites';
import Pqrds from '../screens/Pqrds';
//import useFavorites from '../hooks/useFavorites';


const Tab = createBottomTabNavigator();

const NavigatorTabs = () => {
       

       return ( 
		
              <Tab.Navigator
                     screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                   let iconName;

                                   if (route.name === 'Events') {
                                          iconName = focused
                                                 ? 'home'
                                                 : 'home';
                                   } else if (route.name === 'MoreEvents') {
                                          iconName = focused ? 'add-circle' : 'add-circle';
                                   }
                                   else if (route.name === 'Calendar') {
                                          iconName = focused ? 'calendar' : 'calendar';
                                   }
                                   else if (route.name === 'Favorites') {
                                          iconName = focused ? 'heart' : 'heart';
                                   }
                                   else if (route.name === 'Pqrds') {
                                          iconName = focused ? 'document' : 'document';
                                   }

                                   // You can return any component that you like here!
                                   return <Icon name={iconName} size={size} color={color} />;
                            },
                     })}
                     tabBarOptions={{
                            activeTintColor: '#ffff',
                            inactiveTintColor: 'gray',
                            activeBackgroundColor: '#5b3d90',
                            inactiveBackgroundColor: '#ffff'
                     }}

              >
                     <Tab.Screen name="Events" options={{ title: 'Eventos' }} component={Events} />
                     <Tab.Screen name="MoreEvents" options={{ title: 'Mas Eventos' }} component={MoreEvents} />
                     <Tab.Screen name="Calendar" options={{ title: 'Calendario' }} component={Calendar} />
                     <Tab.Screen name="Favorites" options={{ title: 'Favoritos' }} component={Favorites} />
                     <Tab.Screen name="Pqrds" options={{ title: 'Pqrds' }} component={Pqrds} />
              </Tab.Navigator>
       )
}

export default NavigatorTabs


