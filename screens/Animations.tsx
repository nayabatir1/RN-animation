import React, {useEffect} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

function Index(): JSX.Element {
  const spring = useSharedValue(0);
  const spring2 = useSharedValue(0);
  const time = useSharedValue(0);
  const rotation = useSharedValue(0);

  const springStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: spring.value}],
    };
  });

  const springStyles2 = useAnimatedStyle(() => {
    return {
      transform: [{translateX: spring2.value}],
    };
  });

  const timeStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: time.value}],
    };
  });

  const rotationStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: spring.value},
        {rotateZ: rotation.value + 'deg'},
      ],
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const rand = Math.random() * (Dimensions.get('window').width - 120);

      spring.value = withSpring(rand);
      spring2.value = withSpring(rand, {damping: 20, stiffness: 90});

      time.value = withTiming(rand, {
        duration: 1000,
        easing: Easing.out(Easing.exp),
      });

      rotation.value = withSequence(
        withTiming(-10, {duration: 200}),
        withRepeat(
          withTiming(20, {
            duration: 400,
            easing: Easing.inOut(Easing.linear),
          }),
          4,
          true,
        ),
        withTiming(0, {duration: 200}),
      );
    }, 2500);

    return () => clearInterval(timer);
  }, [rotation, spring, spring2, time]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.backgroundStyle}>
      <Text style={styles.title}>Animation with spring (default)</Text>
      <Animated.View style={[styles.box, springStyles]} />

      <Text style={styles.title}>
        Animation with spring (damping:20, stiffness:90)
      </Text>
      <Animated.View style={[styles.box, springStyles2]} />

      <Text style={styles.title}>Animation with time (Easing exp)</Text>
      <Animated.View style={[styles.box, timeStyles]} />

      <Text style={styles.title}>Rotation with sequence of animation</Text>
      <Animated.View style={[styles.box, rotationStyles]} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#000',
    marginTop: 10,
    marginBottom: 30,
    borderRadius: 20,
  },
  backgroundStyle: {
    paddingVertical: 10,
  },
  title: {
    paddingHorizontal: 10,
  },
});

export default Index;
