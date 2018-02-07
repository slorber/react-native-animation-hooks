import React from "react";
import {
  Animated,
} from "react-native";




class AutoAnimate extends React.Component {

  static defaultProps = {
    useNativeDriver: true,
  };

  constructor(props) {
    super(props);

    const {value,initialValue} = this.props;

    const initVal = typeof initialValue !== "undefined" ? initialValue : value;

    this.state = {
      animatedValue: new Animated.Value(initVal),
    };
  }

  animate = () => {
    const {
      value,
      useNativeDriver,
      spring,
      ...otherProps
    } = this.props;

    const animation = spring ?
      Animated.spring(this.state.animatedValue, {
        toValue: value,
        useNativeDriver,
        ...otherProps,
      }) :
      Animated.timing(this.state.animatedValue, {
        toValue: value,
        useNativeDriver,
        ...otherProps,
      });

    animation.start();
  };

  componentDidMount() {
    const {value,initialValue} = this.props;
    if ( typeof initialValue !== "undefined" && initialValue !== value ) {
      this.animate();
    }
  };

  componentDidUpdate(prevProps) {
    const value = this.props.value;
    if ( value !== prevProps.value ) {
      this.animate();
    }
  };

  render() {
    return this.props.children(this.state.animatedValue);
  }

}

export default AutoAnimate;

