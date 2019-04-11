# Gala-Mobile

## Requirements

* [Ionic3]
* [npm]
* [AndroidStudio] pour build sur Android
* [Xcode] pour build sur ios (il vous faudra donc un mac)

## Installation

```
git clone git@github.com:ungdev/Gala-Mobile.git
# or
git clone https://github.com/ungdev/Gala-Mobile.git

cd Gala-Mobile
npm install
```

## Configuration

```
# copy env file for all environments
cp .env .env.local
# makes your changes in .env.local, which will not be pushed
nano .env.local

# copy env file for development environment
cp .env.development .env.development.local
# makes your changes in .env.development.local, which will not be pushed
nano .env.development.local
```

## Commands

```
ionic serve                                   # launch app locally in browser
ionic cordova build [ios/android] --release   # build app for android or ios
```

## Mettre à jour l'application : Prérequis

Après que vous ayez fait vos modifications au code, si vous souhaitez mettre à jour l'application voici les étapes à suivre :

### Augmenter le numéro de version
Aller dans le fichier config.xml
Au tout début du fichier : version="x.x.x"
* Le premier numéro est celui de la version globale, à changer à chaque mise à jour majeur (nouvelle édition du gala)
Il faut remettre le deuxième et troisième numéro de version à 0 lorsque l'on incrémente la version globale
* Le deuxième est celui de la mise à jour que vous souhaitez faire, à incrémenter à chaque mise à jour
Remettre le troisième nombre à 0 lorsque l'on incrémente le deuxième
* Le dernier n'est utile que si une mise à jour est rejetée (fréquemment sur l'AppStore), et que des changements sont nécessaires. Pas de nouveau contenu n'est ajouté, seulement des ajustements.

### Lancer un build

Pour android :
```
ionic cordova build android --release
```
Pour ios :
```
ionic cordova build ios --release
```

## Mettre à jour l'application : Sur le PlayStore (Android)

### Préparer l'apk

Dans un premier temps, il va falloir signer l'application, en utilisant le fichier gala.keystore. Attention, ne surtout pas divulguer ce fichier !
Le fichier est gardé par l'UNG, demandez le leur.

```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore gala.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk gala
```

Un mot de passe vous sera demandé, le récupérer également auprès de l'UNG

Attention ! platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk est à changer par le chemin vers le fichier .apk de votre application créé par la commande de build

Déplacez vous dans le dossier de l'apk :

```
cd platforms/android/app/build/outputs/apk/release # cela peut être différent pour vous
```

Il faut maintenant vérifier le fichier, avec la commande zipalign des build tools de Android Studio
```
zipalign -v 4 app-release-unsigned.apk galavX.X.X.apk # remplacer X.X.X par la version de la mise à jour
```
Si votre terminal ne trouve pas zipalign, il se trouve dans le dossier sdk/build-tools/votre.version.de.build.tools/zipalign, par exemple sur mac :
```
 /Users/arnaud/Library/Android/sdk/build-tools/28.0.3/zipalign -v 4 app-release-unsigned.apk galav1.2.0.apk
```

C'est ce fichier "galavX.X.X.apk" qu'il faudra upload sur le play store.

### Sur le play store

Se connecter sur la console google play : https://play.google.com/apps/publish?pli=1 avec soit des droits partagé par l'UNG, soit le compte ung directement

* Aller dans l'application Gala UTT
* Gestion de la publication (à gauche)
* Tableau de bord de la version
* Gérer la version (en haut à droite)
* Dans production => Gérer
* Créer une version
* renseigner les champs
* appuyer sur enregistrer puis vérifier

## Mettre à jour l'application : Sur l'Apple Store (Ios)

### Dans Xcode

* Ouvrir le fichier Gala-UTT.xcworkspace avec Xcode
* Vous pouvez ici tester l'application sur un iphone / ipad avec le bouton play en haut à gauche
* Pour publier => product => archive (Generique ios device doit être sélectionné en haut à gauche avant)
* Cliquer sur "Distribute App"
* Suivre les étapes

### Sur Appstore Connect

* Aller sur https://appstoreconnect.apple.com
* Mes apps
* Gala UTT
* + version ou plate-forme => ios
* Mettez le numéro de version X.X.X
* remplissez le formulaire, pour l'accroche vous pouvez récupérer celle de la version précédente
* une fois terminé => soumettre pour vérification
* non, non, envoyer


## Structure
