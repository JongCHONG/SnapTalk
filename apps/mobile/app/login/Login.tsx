import React from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Text, TextInput, Button, Card } from 'react-native-paper';
import { Link, Stack } from 'expo-router';
import { LoginStyles } from './LoginStyles';

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    console.log('Login data:', data);
    // Ici vous pouvez ajouter votre logique de connexion
    // Par exemple: call API, navigation vers l'app principale, etc.
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Connexion',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <View style={LoginStyles.container}>
        <Card style={LoginStyles.card}>
          <Card.Content>
            <Text style={LoginStyles.title}>SnapTalk</Text>
            <Text style={LoginStyles.subtitle} variant="bodyLarge">
              Connectez-vous à votre compte
            </Text>
            
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email requis',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Email invalide'
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  label="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.email}
                  style={LoginStyles.input}
                />
              )}
            />
            {errors.email && (
              <Text style={LoginStyles.errorText}>{errors.email.message}</Text>
            )}

            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Mot de passe requis',
                minLength: {
                  value: 6,
                  message: 'Le mot de passe doit contenir au moins 6 caractères'
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  label="Mot de passe"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.password}
                  style={LoginStyles.input}
                />
              )}
            />
            {errors.password && (
              <Text style={LoginStyles.errorText}>{errors.password.message}</Text>
            )}

            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              style={LoginStyles.button}
            >
              Se connecter
            </Button>
            
            <Link href="/register" asChild>
              <Button mode="text" style={LoginStyles.linkButton}>
                Pas de compte ? S'inscrire
              </Button>
            </Link>
          </Card.Content>
        </Card>
      </View>
    </>
  );
}
