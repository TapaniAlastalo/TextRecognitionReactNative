#### Harjoitustyö
### Mobile Application Development (TTOW0615), Autumn 2019
Tapani Alastalo / M1475


# TextRecognition on React Native with Firebase MLKIT - ready 90%
Tekstin tunnistussovellus, jonka tehtävänä on tunnistaa kameranäkymässä oleva teksti ja poimia se käyttäjän käytettäväksi ja muokattavaksi. 

* Työvaiheet mukailevat seuraavia käyttöönotto-ohjeistuksia: https://react-native-community.github.io/react-native-camera/docs/installation#android & https://www.npmjs.com/package/react-native-firebase-mlkit
* Huom! Ei kannata käyttää automaagisia asennuksia, koska ne on todennäköisesti vanhentuneita eikä tunnu toimivan.
* Ei siis react-native link react-native-camera -komentoja yms

## Links
Video
* [TextRecognition Video](videos/....mp4)



## Asennetut paketit
* react-navigation
* react-navigation-stack
* react-native-gesture-handler
* react-native-camera
* react-native-firebase-mlkit

# Työvaiheet
## Alustus
### Git alustus
* git init jne...
### Sovelluksen alustus
* react-native init TextRecognitionRN
### Android SDK määrittely
* local.properties tiedosto Android kansioon.
* including path to SDK
### Perus pakettien asennus
* npm install --save react-navigation
* npm install --save react-navigation-stack
* npm install --save react-native-gesture-handler
##### Testaus - Lopulta 3-4 uudelleen käynnistyksen jälkeen - OK
* react-native run-android

## Firebase ML Kit käyttöönotto
* npm install react-native-firebase-mlkit --save

#### Firebase yhteys
* Firebase konsolissa uusi projekti ja lisää Android App
* Nimeäminen oikein. Tässä tapauksessa com.textcapturern.
* google-services.json tiedosto /android/app/ -kansioon (Android only)

#### Firebase valmistelut
android/app/src/main/java/com/textcapturern/MainApplication.java tiedostoon seuraava import
* import com.mlkit.RNMlKitPackage;
* !! Ei Lisätä komentoa android/app/src/main/java/com/textcapturern/MainApplication.java tiedoston getPackages metodin loppuun ennen palautusta.
* !! EI TARVITA ENÄÄN * packages.add(new RNMlKitPackage());

android/settings.gradle tiedostoon seuraavat rivit
* include ':react-native-firebase-mlkit'
* project(':react-native-firebase-mlkit').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-firebase-mlkit/android')

android/build.gradle tiedostoon seuraavat riippuvuudet (depedencies)
* classpath 'com.google.gms:google-services:4.3.2'

android/app/build.gradle tiedostoon seuraavat riippuvuudet (depedencies)
* implementation 'com.google.firebase:firebase-core:16.0.1'
* implementation 'com.google.firebase:firebase-ml-vision:17.0.0'
* implementation (project(':react-native-firebase-mlkit')) { exclude group: 'com.google.firebase' }

android/app/build.gradle tiedostoon loppuun (toiseksi viimeiseksi)
* apply plugin: 'com.google.gms.google-services'

#### Testaus - Lopulta 3-4 uudelleen käynnistyksen jälkeen - Build Success - OK
#### Firebase sync - OK

## Kameran käyttöönotto
* npm install react-native-camera --save

android/app/src/main/java/com/textcapturern/MainApplication.java tiedostoon seuraava import
* import org.reactnative.camera.RNCameraPackage;
* !! Ei Lisätä komentoa android/app/src/main/java/com/textcapturern/MainApplication.java tiedoston getPackages metodin loppuun ennen palautusta.
* !! EI TARVITA ENÄÄN * packages.add(new RNCameraPackage());

android/settings.gradle tiedostoon seuraavat rivit
* include ':react-native-camera'
* project(':react-native-camera').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-camera/android')

android/app/build.gradle tiedostoon seuraavat riippuvuudet (depedencies)
* implementation project(':react-native-camera')
Lisäksi samaan tiedostoon android:defaultConfig sisälle
* missingDimensionStrategy 'react-native-camera', 'mlkit'

android/app/src/main/AndroidManifest.xml tiedostoon seuraavat oikeudet (permissions)
* uses-permission android:name="android.permission.RECORD_AUDIO"
* uses-permission android:name="android.permission.CAMERA"
* uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"
* uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"

#### Testaus - Lopulta 3-4 uudelleen käynnistyksen jälkeen - Build Success - OK


## MLKIT / RNCCamera koodin lisäys
* import RNMlKit from 'react-native-firebase-mlkit';
* import { RNCamera } from 'react-native-camera';

```Javascript
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
```

```Javascript
handleRecognizedText = (resultMap) => {
    // MAPPED IN NATIVE MODULE / PACKAGE .\node_modules\react-native-firebase-mlkit\android\src\main\java\com\mlkit
    // info.putMap("blockCoordinates", coordinates);
    // info.putString("blockText", blocks.get(i).getText());
    // info.putString("resultText", firebaseVisionText.getText());
    var resultTexts = resultMap.map(function(object) {
      return object['resultText'];
    });
    this.props.navigation.state.params.returnData(resultTexts);
    this.props.navigation.goBack();
  }
```

## NOT REALLY

Firebase yhteys
* google-services.json to the appropriate folder (/android/app/) (Android only)
* add GoogleService-Info.plist to the appropriate folder (/ios/) (iOS only)
* install CocoaPods in your react-native project and add the following line to your Podfile then run pod install (iOS only)
* pod 'Firebase/Core'
* pod 'Firebase/MLVision'
* pod 'Firebase/MLVisionTextModel'

## Conclusions / Issues
Äärettömän tuskallista päästä alkuun. Melkein tuntuisi helpommalta tehdä natiivi moduuli itse, kuin käyttää "valmiita".
* Androidilla sai perustoiminnallisuuden toteutettua.
* IOS toteuttamatta ja testaamatta - vielä.