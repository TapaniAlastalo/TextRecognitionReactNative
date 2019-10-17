import React from 'react';
import {
    Button,
    Dimensions,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class MainScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const {state} = navigation;
    return {
      title: `Main Screen`
    };
  };

  constructor(props) {
    super(props);
    this.state = { testText: '' };    
  }

  returnData(result) {
    this.setState({testText: result});
  }

  itemPressed = () => {
    this.props.navigation.navigate('TextCapturer', {returnData: this.returnData.bind(this)});
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
            onPress = {_ => this.itemPressed()}
            title = "Open TextCapturer"
            color = "black"
        />
        <Text style={styles.preview}>{this.state.testText}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  }
});