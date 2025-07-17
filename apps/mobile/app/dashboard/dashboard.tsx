import React, { useEffect, useState } from "react";
import { View, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import { io } from "socket.io-client";
import { Button, IconButton, TextInput } from "react-native-paper";

import dashboardStyles from "./dashboardStyles";

import CustomDrawer from "../components/CustomDrawer/customDrawer";

const dashboard = () => {
  const router = useRouter();
  const [socket] = useState(() => io("http://localhost:4000"));
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [usersOnline, setUsersOnline] = useState<string[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    { username: string; text: string; timestamp: number }[]
  >([]);

  useEffect(() => {
    socket.on("users_online", (users: string[]) => {
      setUsersOnline(users);
    });
    socket.emit("user_connected", user?.username);

    socket.on("new_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("users_online");
      socket.off("new_message");
    };
  }, [user?.username]);

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit("send_message", {
        username: user?.username,
        text: message,
      });
      setMessage(""); // Vide le champ après envoi
    }
  };

  console.log(messages);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Tableau de bord",
          headerStyle: { backgroundColor: "#007AFF" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerLeft: () => (
            <IconButton
              icon={drawerVisible ? "chevron-left" : "account-group"}
              size={28}
              iconColor="#fff"
              onPress={() => setDrawerVisible(!drawerVisible)}
            />
          ),
          headerRight: () => (
            <IconButton
              icon="logout"
              size={28}
              iconColor="#fff"
              onPress={() => {
                socket.disconnect();
                router.replace("/login");
                localStorage.removeItem("user");
              }}
            />
          ),
        }}
      />
      <View style={dashboardStyles.container}>
        {drawerVisible && (
          <>
            <Pressable onPress={() => setDrawerVisible(false)}>
              <View style={dashboardStyles.overlay} />
            </Pressable>
            <CustomDrawer usersOnline={usersOnline} />
          </>
        )}
        <View style={dashboardStyles.main}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 24,
              paddingHorizontal: 8,
            }}
          >
            <TextInput
              style={{
                flex: 1,
                backgroundColor: "#f5f5f5",
                borderRadius: 24,
                paddingHorizontal: 16,
                fontSize: 16,
                marginRight: 8,
                elevation: 2,
              }}
              placeholder="Écris ton message..."
              value={message}
              onChangeText={setMessage}
              underlineColor="transparent"
              theme={{ colors: { primary: "#007AFF" } }}
            />
            <Button
              mode="contained"
              onPress={handleSendMessage}
              disabled={!message.trim()}
              style={{ borderRadius: 24, elevation: 2 }}
              labelStyle={{ fontWeight: "bold", fontSize: 16 }}
              contentStyle={{ paddingHorizontal: 16, height: 48 }}
            >
              Envoyer
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};

export default dashboard;
