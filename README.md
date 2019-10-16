# Harjoitustyö
## Mobile Application Development (TTOW0615), Autumn 2019
Tapani Alastalo / M1475


## TextRecognition - ready 50%
Tekstin tunnistussovellus, jonka tehtävänä on tunnistaa kameranäkymässä oleva teksti ja poimia se käyttäjän käytettäväksi ja muokattavaksi.
#### Links
[TextRecognition Video](videos/....mp4)
#### Conclusions / Issues

## Työvaiheet
#### Git alustus
* git init jne...
#### Sovelluksen alustus
* react-native init TextRecognitionRN
#### Android SDK määrittely
* local.properties tiedosto Android kansioon.
* including path to SDK
#### Perus pakettien asennus
* npm install --save react-navigation
* npm install --save react-navigation-stack
* npm install --save react-native-gesture-handler
##### Testaus - Lopulta usean uudelleen käynnistyksen jälkeen - OK
* react-native run-android



## NOT REALLY

Firebase yhteys
* google-services.json to the appropriate folder (/android/app/) (Android only)
* add GoogleService-Info.plist to the appropriate folder (/ios/) (iOS only)
* install CocoaPods in your react-native project and add the following line to your Podfile then run pod install (iOS only)
* pod 'Firebase/Core'
* pod 'Firebase/MLVision'
* pod 'Firebase/MLVisionTextModel'

#### Käytetyt komennot
* npm install react-native-firebase-mlkit --save
* react-native link react-native-firebase-mlkit
* react-native run-android / react-native run-ios

#### Asennetut paketit
* react-navigation
* react-navigation-stack
* react-native-gesture-handler
* react-native-firebase-mlkit