import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  GestureEvent,
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type GestureHandlerEvent = GestureEvent | PanGestureHandlerGestureEvent;

const startingPosition = Dimensions.get('window').width / 2 - 50;

function Events(): JSX.Element {
  const pressed = useSharedValue(false);
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);

  const eventHandler = useAnimatedGestureHandler<GestureHandlerEvent>({
    onStart: (_event, ctx) => {
      pressed.value = true;
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: () => {
      pressed.value = false;
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
