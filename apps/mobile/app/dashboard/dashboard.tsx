import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { io } from "socket.io-client";
import { Drawer, IconButton } from "react-native-paper";

const socket = io("http://localhost:4000"); // adapte l'URL si besoin

const dashboard = () => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [usersOnline, setUsersOnline] = useState<string[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    socket.emit("user_connected", user?.username);

    socket.on("users_online", (users: string[]) => {
      setUsersOnline(users);
    });

    return () => {
      socket.disconnect();
    };
  }, [user?.username]);

  return (
    <View style={styles.container}>
      <View style={styles.drawerToggle}>
        <IconButton
          icon={drawerVisible ? "chevron-left" : "account-group"}
          size={32}
          onPress={() => setDrawerVisible(!drawerVisible)}
        />
      </View>
      {drawerVisible && (
        <>
          <View style={styles.overlay} />
          <View style={styles.drawerOverlay}>
            <Drawer.Section title="Connectés">
              {usersOnline.map((username, idx) => (
                <Drawer.Item
                  key={idx}
                  label={username}
                  active={username === user?.username}
                  icon="account"
                />
              ))}
            </Drawer.Section>
          </View>
        </>
      )}
      <View style={styles.main}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Dashboard</Text>
        {/* Ton contenu principal ici */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  drawerToggle: {
    position: "absolute",
    left: 5,
    top: 10,
    zIndex: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    zIndex: 9,
  },
  drawerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 180,
    height: "100%",
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    zIndex: 10,
  },
  main: { flex: 1, padding: 16 },
});

export default dashboard;