import React from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
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
  withDecay,
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
    onEnd: event => {
      pressed.value = false;

      console.log(event.velocityX, event.velocityY);

      x.value = withDecay({
        velocity: event.velocityX,
        deceleration: 0.95,
      });
      y.value = withDecay({
        velocity: event.velocityY,
        deceleration: 0.95,
      });
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
    <>
      <Text style={styles.title}>Pan gesture with velocity effect</Text>
      <GestureHandlerRootView style={styles.rootView}>
        <PanGestureHandler onGestureEvent={eventHandler}>
          <Animated.View style={[styles.ball, uas]} />
        </PanGestureHandler>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 15,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
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
