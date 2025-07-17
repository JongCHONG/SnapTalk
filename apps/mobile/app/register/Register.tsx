import React, { useState } from "react";
import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Text, TextInput, Button, Card, Snackbar } from "react-native-paper";
import { Link, Stack } from "expo-router";
import registerStyles from "./registerStyles";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultValues: RegisterForm = {
  username: "Test",
  email: "Test@example.com",
  password: "password",
  confirmPassword: "password",
};

export default function Register() {
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({ defaultValues });
  const router = require("expo-router").useRouter();
  const password = watch("password");

  const onSubmit = (data: RegisterForm) => {
    setGeneralError(null);
    setShowError(false);
    fetch("http://localhost:4000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (!response.ok) {
          let errorMsg = await response.text();
          try {
            const json = JSON.parse(errorMsg);
            errorMsg = json.message || errorMsg;
          } catch {}
          throw new Error(errorMsg);
        }
        return response.json();
      })
      .then((result) => {
        console.log("Inscription réussie:", result);
        router.replace("/login");
      })
      .catch((error) => {
        setGeneralError(error.message);
        setShowError(true);
        console.error("Erreur lors de l'inscription:", error);
      });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Inscription",
          headerStyle: { backgroundColor: "#007AFF" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <View style={registerStyles.container}>
        <Snackbar
          visible={showError}
          onDismiss={() => setShowError(false)}
          duration={4000}
          style={{ backgroundColor: "#d32f2f" }}
        >
          {generalError}
        </Snackbar>
        <Card style={registerStyles.card}>
          <Card.Content>
            <Text style={registerStyles.title}>SnapTalk</Text>
            <Text style={registerStyles.subtitle} variant="bodyLarge">
              Créez votre compte
            </Text>

            <Controller
              control={control}
              name="username"
              rules={{
                required: "Nom d'utilisateur requis",
                minLength: {
                  value: 3,
                  message:
                    "Le nom d'utilisateur doit contenir au moins 3 caractères",
                },
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
                  style={registerStyles.input}
                />
              )}
            />
            {errors.username && (
              <Text style={registerStyles.errorText}>
                {errors.username.message}
              </Text>
            )}

            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email requis",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Email invalide",
                },
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
                  style={registerStyles.input}
                />
              )}
            />
            {errors.email && (
              <Text style={registerStyles.errorText}>
                {errors.email.message}
              </Text>
            )}

            <Controller
              control={control}
              name="password"
              rules={{
                required: "Mot de passe requis",
                minLength: {
                  value: 6,
                  message:
                    "Le mot de passe doit contenir au moins 6 caractères",
                },
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
                  style={registerStyles.input}
                />
              )}
            />
            {errors.password && (
              <Text style={registerStyles.errorText}>
                {errors.password.message}
              </Text>
            )}

            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: "Confirmation du mot de passe requise",
                validate: (value) =>
                  value === password ||
                  "Les mots de passe ne correspondent pas",
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
                  style={registerStyles.input}
                />
              )}
            />
            {errors.confirmPassword && (
              <Text style={registerStyles.errorText}>
                {errors.confirmPassword.message}
              </Text>
            )}

            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              style={registerStyles.button}
              buttonColor="#28a745"
            >
              S'inscrire
            </Button>

            <Link href="/login" asChild>
              <Button mode="text" style={registerStyles.linkButton}>
                Déjà un compte ? Se connecter
              </Button>
            </Link>
          </Card.Content>
        </Card>
      </View>
    </>
  );
}
