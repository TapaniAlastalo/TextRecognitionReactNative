import React from 'react';
import {
  Text,
  View
} from 'react-native';

export default class TextCapturerScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const {state} = navigation;
    return {
      title: `Text Capturer`,
    };
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Text Capturer</Text>
      </View>
    )
  }
}