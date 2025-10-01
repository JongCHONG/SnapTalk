# SnapTalk Mobile App 📱

Application mobile de SnapTalk construite avec React Native et Expo. Cette app permet aux utilisateurs de communiquer en temps réel via une interface moderne et intuitive.

## 🚀 Technologies

- **React Native** - Framework mobile cross-platform
- **Expo** - Plateforme de développement React Native
- **Expo Router** - Navigation basée sur les fichiers
- **React Native Paper** - Composants Material Design
- **Socket.IO Client** - Communication temps réel
- **React Hook Form** - Gestion des formulaires
- **TypeScript** - Typage statique

## 📱 Fonctionnalités

- ✅ **Authentification** - Connexion et inscription
- ✅ **Chat temps réel** - Messages instantanés via WebSockets
- ✅ **Liste d'utilisateurs** - Voir qui est en ligne
- ✅ **Interface Material** - Design moderne et responsive
- ✅ **Support Android** - Application native Android

## 🏗️ Structure du projet

```
mobile/
├── app/                     # Navigation et écrans (Expo Router)
│   ├── components/          # Composants réutilisables
│   │   ├── Conversation/    # Composant de chat
│   │   └── CustomDrawer/    # Menu de navigation
│   ├── dashboard/           # Écran principal
│   ├── login/              # Écran de connexion
│   ├── register/           # Écran d'inscription
│   ├── _layout.tsx         # Layout principal
│   └── index.tsx           # Page d'accueil
├── assets/                 # Images et polices
├── android/               # Configuration Android native
└── package.json           # Dépendances et scripts
```

## 🛠️ Installation et démarrage

### Prérequis
- Node.js (v18+)
- Expo CLI : `npm install -g @expo/cli`
- Pour Android : Android Studio et SDK

### 1. Installation des dépendances

```bash
npm install
```

### 2. Démarrage du serveur de développement

```bash
npm start
# ou
npx expo start
```

### 3. Lancement sur appareil

#### Android
```bash
npm run android
# ou
npx expo run:android
```

#### iOS (macOS uniquement)
```bash
npm run ios
# ou
npx expo run:ios
```

#### Web
```bash
npm run web
# ou
npx expo start --web
```

## 🔧 Scripts disponibles

- `npm start` - Démarre le serveur de développement Expo
- `npm run android` - Lance sur Android
- `npm run ios` - Lance sur iOS
- `npm run web` - Lance sur navigateur web
- `npm run lint` - Vérifie le code avec ESLint
- `npm run reset-project` - Remet le projet à zéro (développement)

## 🌐 Configuration Backend

L'application mobile se connecte à l'API backend SnapTalk. Assurez-vous que :

1. Le serveur backend est démarré (`npm run dev` depuis la racine)
2. L'URL de l'API est correctement configurée dans l'app
3. MongoDB est en cours d'exécution

## 📂 Développement

### Navigation (Expo Router)
- **File-based routing** : Chaque fichier dans `app/` devient une route
- **Layout partagé** : `_layout.tsx` définit la structure commune
- **Navigation** : Utilise Expo Router pour la navigation between écrans

### Composants principaux
- **Conversation** : Gestion du chat en temps réel
- **CustomDrawer** : Menu de navigation latéral
- **Écrans Auth** : Login et Register avec validation

### Gestion d'état
- **Socket.IO** : Communication temps réel avec le backend
- **React Hook Form** : Gestion des formulaires
- **Context/State** : État local React pour l'UI

## 🎨 Thème et Design

L'application utilise React Native Paper pour un design Material consistant :
- **Couleurs** : Thème Material Design
- **Composants** : Buttons, TextInputs, Cards standardisés
- **Navigation** : Drawer navigation avec icônes

## 🔍 Debugging

### Expo Dev Tools
```bash
npm start
# Puis appuyez sur 'm' pour ouvrir le menu
```

### Logs
```bash
npx expo logs
```

### Reset du projet
```bash
npm run reset-project
```

## 📱 Build et déploiement

### Development Build
```bash
npx expo install --fix
npx expo prebuild
npx expo run:android
```

### Production Build
Suivez la [documentation Expo](https://docs.expo.dev/deploy/build-project/) pour les builds de production.

## 🤝 Contribution

Voir le README principal du projet SnapTalk pour les guidelines de contribution.

## 📚 Ressources utiles

- [Documentation Expo](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Router Guide](https://docs.expo.dev/router/introduction)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Socket.IO Client](https://socket.io/docs/v4/client-api/)

---

Pour plus d'informations sur le projet complet, consultez le [README principal](../../README.md).
