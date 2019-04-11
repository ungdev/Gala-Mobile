# Gala-Mobile

## Requirements

* [Ionic3]

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
* Le dernier n'est utile que si une mise à jour est rejetée (nottament sur l'AppStore), et que des changements sont nécessaires. Pas de nouveau contenu n'est ajouté, seulement des ajustements.


## Structure
