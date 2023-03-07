import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Links = [
  {
    link: 'animation',
    text: 'Animations',
  },
  {
    link: 'events_without_context',
    text: 'Pan Gesture Without Context',
  },
  {
    link: 'events_with_context',
    text: 'Pan Gesture With Context',
  },
];

function Home(): JSX.Element {
  const navigation = useNavigation();

  return (
    <View>
      {Links.map(i => (
        <TouchableOpacity
          onPress={() => navigation.navigate(i.link)}
          key={i.link}
          style={style.view}>
          <Text style={style.link}>{i.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const style = StyleSheet.create({
  view: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
  },
});

export default Home;
