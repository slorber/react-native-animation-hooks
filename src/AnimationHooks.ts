import React, { useRef, useEffect } from 'react'
import { Animated } from 'react-native'

type ToValue =
  | number
  | Animated.AnimatedValue
  | { x: number; y: number }
  | Animated.AnimatedValueXY

export const useAnimatedValue = (initialValue: number): Animated.Value => {
  const ref = useRef(new Animated.Value(initialValue))
  return ref.current
}

type AnimationType = 'spring' | 'timing'

interface BaseAnimationConfig {
  initialValue?: number
  type?: AnimationType
}

export type TimingAnimationConfig = BaseAnimationConfig &
  ({ type: 'timing' } & Animated.TimingAnimationConfig)

export type SpringAnimationConfig = BaseAnimationConfig &
  ({ type: 'spring' } & Animated.SpringAnimationConfig)

export type UseAnimationConfig = TimingAnimationConfig | SpringAnimationConfig

const getInitialValue = (config: UseAnimationConfig) => {
  if (typeof config.initialValue !== 'undefined') return config.initialValue
  else {
    return config.toValue as number // TODO deal with other types possibilities here
  }
}

const getAnimationType = (config: UseAnimationConfig) => config.type || 'timing'

export const useAnimation = (config: UseAnimationConfig): Animated.Value => {
  const animatedValue = useAnimatedValue(getInitialValue(config))

  const animate = () => {
    let animation = null;
    switch(getAnimationType(config)) {
      case 'timing':
        animation = Animated.timing(animatedValue, config)
        break
      case 'spring':
        animation = spring(animatedValue, config)
        break
      default:
        // @ts-ignore
        throw new Error('unsupported animation type=' + config.type)
    }
    if(animation !== null) animation.start()
    return () => {
      if(animation !== null) animation.stop()
    }
  }

  // Currently useEffect is buggy, see https://github.com/facebook/react-native/issues/21967
  useEffect(animate, [config.toValue])

  return animatedValue
}
