import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './screens/Home';
import Animations from './screens/Animations';
import EventsWithoutContext from './screens/EventsWithoutContext';
import Events from './screens/Events';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="home" component={Home} options={{title: 'Home'}} />
        <Stack.Screen
          name="animation"
          component={Animations}
          options={{title: 'Animations'}}
        />
        <Stack.Screen
          name="events_without_context"
          component={EventsWithoutContext}
          options={{title: 'Pan Gesture Without Context'}}
        />
        <Stack.Screen
          name="events_with_context"
          component={Events}
          options={{title: 'Pan Gesture With Context'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
