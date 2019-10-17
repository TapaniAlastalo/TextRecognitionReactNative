import React from 'react';
import {
    Button,
  Text,
  View
} from 'react-native';

export default class MainScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const {state} = navigation;
    return {
      title: `Main Screen`,
    };
  };

  itemPressed = () => {
    this.props.navigation.navigate('TextCapturer'//,
        //{trailerUrl: this.state.trailerUrl}
    );
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Main Screen</Text>
        <Button
            onPress = {_ => this.itemPressed()}
            title = "Open TextCapturer"
            color = "black"
        />
      </View>
    )
  }
}