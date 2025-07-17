import React from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Text, TextInput, Button, Card } from 'react-native-paper';
import { Link, Stack } from 'expo-router';
import { RegisterStyles } from './RegisterStyles';

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>();
  const password = watch('password');

  const onSubmit = (data: RegisterForm) => {
    console.log('Register data:', data);
    // Ici vous pouvez ajouter votre logique d'inscription
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Inscription',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <View style={RegisterStyles.container}>
        <Card style={RegisterStyles.card}>
          <Card.Content>
            <Text style={RegisterStyles.title}>SnapTalk</Text>
            <Text style={RegisterStyles.subtitle} variant="bodyLarge">
              Créez votre compte
            </Text>
            
            <Controller
              control={control}
              name="username"
              rules={{
                required: 'Nom d\'utilisateur requis',
                minLength: {
                  value: 3,
                  message: 'Le nom d\'utilisateur doit contenir au moins 3 caractères'
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  label="Nom d'utilisateur"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.username}
                  style={RegisterStyles.input}
                />
              )}
            />
            {errors.username && (
              <Text style={RegisterStyles.errorText}>{errors.username.message}</Text>
            )}

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
                  style={RegisterStyles.input}
                />
              )}
            />
            {errors.email && (
              <Text style={RegisterStyles.errorText}>{errors.email.message}</Text>
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
                  style={RegisterStyles.input}
                />
              )}
            />
            {errors.password && (
              <Text style={RegisterStyles.errorText}>{errors.password.message}</Text>
            )}

            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: 'Confirmation du mot de passe requise',
                validate: (value) => value === password || 'Les mots de passe ne correspondent pas'
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  label="Confirmer le mot de passe"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.confirmPassword}
                  style={RegisterStyles.input}
                />
              )}
            />
            {errors.confirmPassword && (
              <Text style={RegisterStyles.errorText}>{errors.confirmPassword.message}</Text>
            )}

            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              style={RegisterStyles.button}
              buttonColor="#28a745"
            >
              S'inscrire
            </Button>
            
            <Link href="/login" asChild>
              <Button mode="text" style={RegisterStyles.linkButton}>
                Déjà un compte ? Se connecter
              </Button>
            </Link>
          </Card.Content>
        </Card>
      </View>
    </>
  );
}
