import { Redirect } from 'expo-router';

export default function Index() {
  // Rediriger vers l'écran de login
  return <Redirect href="/login" />;
}
