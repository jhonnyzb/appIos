import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import NavigatorTabs from './NavigatorTabs';
import Details from '../screens/Details';
import EventsDay from '../screens/EventsDay';
import MapEvents from '../screens/MapEvents';



const NavigatorStack = () => {

       const Stack = createStackNavigator();

       return (
              <NavigationContainer>
                     <Stack.Navigator>
                            <Stack.Screen options={{ headerShown: false }} name="Tabs" component={NavigatorTabs} />
                            <Stack.Screen options={{ headerTransparent: true, title: 'Detalles', headerTintColor: '#5b3d90', headerBackTitleVisible: false }} name="Details" component={Details} />
                            <Stack.Screen options={{ headerShown: false }} name="eventsDay"  component={EventsDay} />
							<Stack.Screen options={{ headerTransparent: true, title:'Mapa', headerBackTitleVisible: false }} name="mapEvents"  component={MapEvents} />
                     </Stack.Navigator>
              </NavigationContainer>
       )
}

export default NavigatorStack;

