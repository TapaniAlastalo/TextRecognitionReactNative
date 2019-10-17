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
  }

  takePicture = async () => {
    try {
      const options = { quality: 0.5, base64: true, skipProcessing: true, forceUpOrientation: true };
      this.camera.takePictureAsync(options).then(data => {
        // for on-device (Supports Android and iOS)
        RNMlKit.deviceTextRecognition(data.uri).then(deviceTextRecognition => {
          this.handleRecognizedText(deviceTextRecognition);          
        });
        // for cloud (At the moment supports only Android)
        /*RNMlKit.cloudTextRecognition(data.uri).then(cloudTextRecognition => {
          this.handleRecognizedText(deviceTextRecognition);
        });*/
      });
    } catch (err) {
      alert("Error:" + err);
    }
  };

  handleRecognizedText = (resultMap) => {
    //info.putMap("blockCoordinates", coordinates);
    //info.putString("blockText", blocks.get(i).getText());
    //info.putString("resultText", firebaseVisionText.getText());
    var resultTexts = resultMap.map(function(object) {
      return object['resultText'];
    });
    var blockTexts = resultMap.map(function(object) {
      return object['blockText'];
    });
    var blockCoordinaates = resultMap.map(function(object) {
      return object['blockCoordinates'];
    });
    this.props.navigation.state.params.returnData(resultTexts);
    this.props.navigation.goBack();
  }

  itemPressed = () => {
    this.takePicture();
    //this.takePhoto();   
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
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