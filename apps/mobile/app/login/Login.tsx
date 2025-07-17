import React, { useState } from "react";
import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Text, TextInput, Button, Card, Snackbar } from "react-native-paper";
import { Link, Stack } from "expo-router";
import { loginStyles } from "./loginStyles";

interface LoginForm {
  email: string;
  password: string;
}

const defaultValues: LoginForm = {
  email: "Test@example.com",
  password: "password",
};

export default function Login() {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ defaultValues });

  const onSubmit = (data: LoginForm) => {
    setLoginError(null);
    setShowError(false);
    fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) {
          setLoginError(result.message || "Erreur de connexion");
          setShowError(true);
          throw new Error(result.message);
        }
        // window.location.href = "/dashboard";
        console.log("API response:", result);
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion:", error);
      });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Connexion",
          headerStyle: { backgroundColor: "#007AFF" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <View style={loginStyles.container}>
        <Snackbar
          visible={showError}
          onDismiss={() => setShowError(false)}
          duration={4000}
          style={{ backgroundColor: "#d32f2f" }}
        >
          {loginError}
        </Snackbar>
        <Card style={loginStyles.card}>
          <Card.Content>
            <Text style={loginStyles.title}>SnapTalk</Text>
            <Text style={loginStyles.subtitle} variant="bodyLarge">
              Connectez-vous à votre compte
            </Text>

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
                  style={loginStyles.input}
                />
              )}
            />
            {errors.email && (
              <Text style={loginStyles.errorText}>{errors.email.message}</Text>
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
                  style={loginStyles.input}
                />
              )}
            />
            {errors.password && (
              <Text style={loginStyles.errorText}>
                {errors.password.message}
              </Text>
            )}

            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              style={loginStyles.button}
            >
              Se connecter
            </Button>

            <Link href="/register" asChild>
              <Button mode="text" style={loginStyles.linkButton}>
                Pas de compte ? S'inscrire
              </Button>
            </Link>
          </Card.Content>
        </Card>
      </View>
    </>
  );
}
