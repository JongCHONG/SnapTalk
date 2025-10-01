# SnapTalk

Une application de messagerie en temps réel construite avec React Native (Expo) et Node.js, utilisant WebSockets pour la communication instantanée.

## 🚀 Aperçu du projet

SnapTalk est une application de chat moderne qui permet aux utilisateurs de communiquer en temps réel. L'application comprend :

- **Frontend mobile** : Application React Native avec Expo Router
- **Backend API** : Serveur Node.js avec Express et Socket.IO
- **Base de données** : MongoDB avec Mongoose
- **Communication temps réel** : WebSockets via Socket.IO

## 📁 Structure du projet

```
SnapTalk/
├── apps/
│   ├── api/                    # Backend API (Node.js + Express)
│   │   ├── src/
│   │   │   ├── models/         # Modèles MongoDB (User, Message)
│   │   │   ├── routes/         # Routes API (users, messages)
│   │   │   ├── db.ts           # Configuration base de données
│   │   │   └── index.ts        # Point d'entrée du serveur
│   │   └── package.json
│   ├── mobile/                 # Application mobile (React Native + Expo)
│   │   ├── app/                # Écrans et navigation
│   │   │   ├── components/     # Composants réutilisables
│   │   │   ├── dashboard/      # Écran tableau de bord
│   │   │   ├── login/          # Écran de connexion
│   │   │   └── register/       # Écran d'inscription
│   │   ├── assets/             # Images et polices
│   │   └── android/            # Configuration Android
│   └── shared/                 # Code partagé entre les apps
├── package.json                # Configuration workspace
└── tsconfig.json               # Configuration TypeScript
```

## 🛠️ Technologies utilisées

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Socket.IO** - Communication WebSocket temps réel
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **TypeScript** - Typage statique

### Mobile
- **React Native** - Framework mobile cross-platform
- **Expo** - Plateforme de développement React Native
- **Expo Router** - Navigation basée sur les fichiers
- **React Native Paper** - Bibliothèque d'interface utilisateur Material Design
- **React Hook Form** - Gestion des formulaires
- **Socket.IO Client** - Client WebSocket

## 📱 Fonctionnalités

- ✅ Inscription et connexion des utilisateurs
- ✅ Chat en temps réel avec WebSockets
- ✅ Affichage des utilisateurs en ligne
- ✅ Interface utilisateur Material Design
- ✅ Support Android natif
- ✅ Architecture monorepo

## 🚀 Installation et démarrage

### Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn
- MongoDB (local ou cloud)
- Expo CLI : `npm install -g @expo/cli`
- Pour Android : Android Studio et SDK

### 1. Cloner le projet

```bash
git clone https://github.com/JongCHONG/SnapTalk.git
cd SnapTalk
```

### 2. Installer les dépendances

```bash
# Installer les dépendances du workspace racine
npm install

# Installer les dépendances de l'API
cd apps/api
npm install

# Installer les dépendances de l'app mobile
cd ../mobile
npm install
```

### 3. Configuration de la base de données

1. Assurez-vous que MongoDB est en cours d'exécution
2. Configurez la chaîne de connexion MongoDB dans `apps/api/src/db.ts`

### 4. Démarrage du développement

#### Option 1 : Démarrer tous les services (recommandé)

```bash
# Depuis la racine du projet
npm run dev
```

Cette commande démarre simultanément :
- Le serveur backend sur le port 4001
- L'application mobile Expo

#### Option 2 : Démarrer individuellement

```bash
# Terminal 1 : Backend
cd apps/api
npm run dev

# Terminal 2 : Mobile
cd apps/mobile
npm start
```

### 5. Lancer sur Android

```bash
# Depuis la racine
npm run android

# Ou depuis le dossier mobile
cd apps/mobile
npm run android
```

## 🔧 Scripts disponibles

### Racine du projet
- `npm run dev` - Démarre backend + mobile
- `npm run android` - Lance l'app Android
- `npm run ios` - Lance l'app iOS (macOS uniquement)

### Backend (`apps/api`)
- `npm run dev` - Démarre le serveur en mode développement avec nodemon

### Mobile (`apps/mobile`)
- `npm start` - Démarre Expo Metro bundler
- `npm run android` - Lance sur Android
- `npm run ios` - Lance sur iOS
- `npm run web` - Lance sur web
- `npm run lint` - Vérifie le code avec ESLint

## 🌐 API Endpoints

### Utilisateurs
- `GET /users` - Récupérer tous les utilisateurs
- `POST /users` - Créer un nouvel utilisateur

### Messages
- `GET /messages` - Récupérer tous les messages
- `POST /messages` - Envoyer un nouveau message

### WebSocket Events
- `user_connected` - Utilisateur se connecte
- `send_message` - Envoi d'un message
- `new_message` - Nouveau message reçu
- `users_online` - Liste des utilisateurs en ligne

## 🤝 Contribution

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos modifications (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 👥 Auteurs

- **JongCHONG** - *Développeur principal* - [GitHub](https://github.com/JongCHONG)

## 🐛 Signaler un bug

Si vous trouvez un bug, veuillez ouvrir une [issue](https://github.com/JongCHONG/SnapTalk/issues) avec :
- Une description détaillée du problème
- Les étapes pour reproduire le bug
- Votre environnement (OS, version de Node.js, etc.)

## 📱 Captures d'écran

*A venir*

---

⭐ N'oubliez pas de donner une étoile au projet si vous l'aimez !