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
import { RNCamera } from 'react-native-camera';

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

  takePhoto = async () => {
    try {
      const data = await this.camera.capture();
      console.log('Path to image: ' + data.path);
      this.setState({
        testText: 'Path' + data.path
      });
    } catch (err) {
      // console.log('err: ', err);
      this.setState({
        testText: 'Err' + err
      });
    }
  };

  takeCamPicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => {
        console.log(data)
        this.setState({
          testText: 'Path' + data.path
        });
      })
      .catch(err => {
        console.error(err)
        this.setState({
          testText: 'Err' + err
        });
      });
  }
  

 itemPressed = () => {
   //this.takePicture();
   //this.takeCamPicture();
   this.takePhoto();
   
}

clickedMe() {
  alert("Capture!");
}

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.testText}</Text>
        <RNCamera
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.preview}
        >
          <TouchableHighlight>
            <View style={{height:50,width:50}}>
            <Button
                onPress = {this.itemPressed.bind(this)}
                title = "Capture"
                color = "black"
            />
            </View>
          </TouchableHighlight>
        </RNCamera>
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