import React from 'react';
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import RNMlKit from 'react-native-firebase-mlkit';
import Camera from 'react-native-camera';

export default class TextCapturerScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const {state} = navigation;
    return {
      title: `Text Capturer`,
    };
  };

  constructor(props) {
    super(props);
    this.state = { testText: 'Zero' };    
  }

  takePicture = async () => {
    if (this.camera) {
      this.setState({
        testText: 'If'
      });
      const options = { quality: 0.5, base64: true, skipProcessing: true, forceUpOrientation: true };
      const data = await this.camera.takePictureAsync(options);
      // for on-device (Supports Android and iOS)
      const deviceTextRecognition = await RNMlKit.deviceTextRecognition(data.uri); 
      console.log('Text Recognition On-Device', deviceTextRecognition);
      this.setState({
        testText: deviceTextRecognition
      });
      // for cloud (At the moment supports only Android)
      //const cloudTextRecognition = await RNMlKit.cloudTextRecognition(data.uri);
      //console.log('Text Recognition Cloud', cloudTextRecognition);
    } else{
      this.setState({
        testText: 'Else'
      });
    }
  };

  takeCamPicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
  

 itemPressed = () => {
   //this.takePicture();
   this.takeCamPicture();
   
}

clickedMe() {
  alert("Touched me");
}

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
            onPress = {_ => this.itemPressed()}
            title = "Capture"
            color = "black"
        />
        <Text>{this.state.testText}</Text>
        <Camera
          ref={(cam) => {
            this.camera.cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
            <TouchableHighlight onPress={this.clickedMe.bind(this)}>
              <View style={{height:50,width:50,backgroundColor:"pink"}}></View>
            </TouchableHighlight>
        </Camera>
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