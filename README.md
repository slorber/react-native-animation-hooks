# react-native-animation-hooks

`yarn add react-native-animation-hooks`

The most convenient way to add little animations to your ReactNative application.

```jsx
  const [bool, setBool] = useState(false)

  const animatedOpacity = useAnimation({
    toValue: bool ? 1 : 0.5,
  })

  return (
    <Animated.View style={opacity: animatedOpacity}>
       ...
    </Animated.View>
  )
```

- Tiny interface using hooks and Animated framework
- Compatible with Expo
- Reduce Animated.Value management boilerplate
- Full support for `spring` and `timing` animations
- Typescript definitions

# Advanced example:

This repo is an Expo app that you can run with `yarn start`.

```tsx
import React, { useState } from 'react'
import { Animated, Switch, View, StyleProp, ViewStyle } from 'react-native'

import { useAnimation } from 'AnimationHooks'

const AnimatedShape = ({ style }: { style?: StyleProp<ViewStyle> }) => (
  <Animated.View
    style={[{ width: 50, height: 50, backgroundColor: 'red' }, style]}
  />
)

const ExampleScreen = () => {
  const [bool, setBool] = useState(false)

  const animatedValue = useAnimation({
    type: 'timing',
    initialValue: 1,
    toValue: bool ? 1 : 0,
    duration: bool ? 1000 : 300,
    useNativeDriver: true,
  })

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Switch value={bool} onValueChange={setBool} />
      </View>
      <View
        style={{
          flex: 1,
          padding: 10,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <AnimatedShape
          style={{
            opacity: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 1],
            }) as any,
          }}
        />
        <AnimatedShape
          style={{
            transform: [
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }) as any,
              },
            ],
          }}
        />
        <AnimatedShape
          style={{
            transform: [
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 100],
                }) as any,
              },
            ],
          }}
        />
      </View>
    </View>
  )
}

export default ExampleScreen
```

# TODO

- Animated XY values
- Tests

# License

MIT
