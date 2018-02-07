AutoAnimate
==========================

Very simple declarative API interface for ReactNative animations, using render props.

```
npm install react-native-auto-animate
```


Simple example: animating the opacity of a view.

```jsx
const MyView = ({visible}) => (
  <AutoAnimate
    value={visible ? 1 : 0}
    duration={200}
  >
    {opacityAnimation => (
      <Animated.View style={{opacity: opacityAnimation}}>
        <Text>SomeText</Text>
      </Animated.View>
    )}
  </AutoAnimate>
);
```  

---------------------------------------------

More complex exemple, using spring animation.


```jsx
const AnimatedBall = ({ isToggled, toggleBall }) => (
  <AutoAnimate
    spring
    value={isToggled ? 1 : 0}
    tension={isToggled ? 100 : 5}
    friction={isToggled ? 5 : 1}>
    {animation => (
      <TouchableWithoutFeedback onPress={toggleBall}>
        <Animated.View style={[styles.ball, ballAnimationStyle(animation)]}>
          <Text>Ball</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    )}
  </AutoAnimate>
);

const ballAnimationStyle = animation => {
  return {
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    }),
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-100, 100],
        }),
      },
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.5],
        }),
      },
    ],
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0, 100, 100, 1)', 'rgba(0, 255, 0, 1)'],
    }),
  };
};
```  

Play with this example on [this Snack](https://snack.expo.io/SkcRi1YLf)


## API

`AutoAnimate` takes 3 props:

- `spring`: use spring animation instead of timing. Timing is default.
- `value`: the value to which you want to animate after next render
- `initialValue` (can be used to animate on mount if `initialValue` != `value`)

The other props are the ones you can pass to the animation config (duration, friction, tension, delay...)

Note that we use native driver by default, as this library is mostly suited for simple animations, but you can disable it.

