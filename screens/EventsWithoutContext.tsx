import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const startingPosition = Dimensions.get('window').width / 2 - 50;

function Events(): JSX.Element {
  const pressed = useSharedValue(false);
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);

  const eventHandler = useAnimatedGestureHandler({
    onStart: () => {
      pressed.value = true;
    },
    onActive: event => {
      x.value = startingPosition + event.translationX;
      y.value = startingPosition + event.translationY;
    },
    onEnd: () => {
      pressed.value = false;
      x.value = withSpring(startingPosition);
      y.value = withSpring(startingPosition);
    },
  });

  const uas = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? '#FEEF86' : '#001972',
      transform: [
        {scale: withSpring(pressed.value ? 1.1 : 1)},
        {translateX: x.value},
        {translateY: y.value},
      ],
    };
  });

  return (
    <GestureHandlerRootView style={styles.rootView}>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.ball, uas]} />
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  ball: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default Events;
