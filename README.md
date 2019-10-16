# Harjoitustyö
## Mobile Application Development (TTOW0615), Autumn 2019
Tapani Alastalo / M1475


## TextRecognition - ready 50%
Tekstin tunnistussovellus, jonka tehtävänä on tunnistaa kameranäkymässä oleva teksti ja poimia se käyttäjän käytettäväksi ja muokattavaksi.
#### Links
* Ohjeet mukailevat seuraavan ohjeistuksen vaiheita: https://www.npmjs.com/package/react-native-firebase-mlkit
* Vältä kuitenkin kaikkea automaagista toimintaa. Mikään ei ikinä toimi, jos ei käy vaihe-vaiheelta läpi.
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

### Firebase ML Kit asennus
* npm install react-native-firebase-mlkit --save

#### Firebase yhteys
* Firebase konsolissa uusi projekti ja lisää Android App
* Nimeäminen oikein. Tässä tapauksessa com.textcapturern.
* google-services.json tiedosto /android/app/ -kansioon (Android only)

#### Firebase valmistelut - TARKKANA
android/app/src/main/java/com/textcapturern/MainApplication.java tiedostoon seuraava import
* import com.mlkit.RNMlKitPackage;
Lisätty komento android/app/src/main/java/com/textcapturern/MainApplication.java tiedoston getPackages metodin loppuun ennen palautusta.
* packages.add(new RNMlKitPackage());

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

##### Testaus - Lopulta erittäin usean uudelleen käynnistyksen jälkeen - OK
##### Firebase sync - OK

### Firebase koodin lisäys

## NOT REALLY

Firebase yhteys
* google-services.json to the appropriate folder (/android/app/) (Android only)
* add GoogleService-Info.plist to the appropriate folder (/ios/) (iOS only)
* install CocoaPods in your react-native project and add the following line to your Podfile then run pod install (iOS only)
* pod 'Firebase/Core'
* pod 'Firebase/MLVision'
* pod 'Firebase/MLVisionTextModel'


## Asennetut paketit
* react-navigation
* react-navigation-stack
* react-native-gesture-handler
* react-native-firebase-mlkit