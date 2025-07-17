import React, { useEffect, useState } from "react";
import { View, Pressable, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import { io } from "socket.io-client";
import { Button, IconButton, TextInput } from "react-native-paper";

import dashboardStyles from "./dashboardStyles";

import CustomDrawer from "../components/CustomDrawer/customDrawer";
import Conversation from "../components/Conversation/conversation";

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
        <Conversation
          messages={messages}
          user={user}
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
        />
      </View>
    </>
  );
};

export default dashboard;
