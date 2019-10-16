import React from 'react';
import {
  Button,
  Text,
  View
} from 'react-native';

import RNMlKit from 'react-native-firebase-mlkit';

export default class TextCapturerScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const {state} = navigation;
    return {
      title: `Text Capturer`,
    };
  };

  constructor(props) {
    super(props);
    
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, skipProcessing: true, forceUpOrientation: true };
      const data = await this.camera.takePictureAsync(options);
      // for on-device (Supports Android and iOS)
      const deviceTextRecognition = await RNMlKit.deviceTextRecognition(data.uri); 
      console.log('Text Recognition On-Device', deviceTextRecognition);
      // for cloud (At the moment supports only Android)
      //const cloudTextRecognition = await RNMlKit.cloudTextRecognition(data.uri);
      //console.log('Text Recognition Cloud', cloudTextRecognition);
    }
  };
  

 itemPressed = () => {
   this.takePicture();
}

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Text Capturer</Text>
        <Button
            onPress = {_ => this.itemPressed()}
            title = "Capture"
            color = "black"
        />
      </View>
    )
  }
}