import React from "react";
import { View, Text } from "react-native";

import { TextInput, Button } from "react-native-paper";
import conversationStyles from "./conversationStyles";

type Message = {
  username: string;
  text: string;
  timestamp: number | string;
};

type ConversationProps = {
  messages: Message[];
  user: { username: string } | null;
  message: string;
  setMessage: (msg: string) => void;
  handleSendMessage: () => void;
};

const Conversation = ({
  messages,
  user,
  message,
  setMessage,
  handleSendMessage,
}: ConversationProps) => {
  return (
    <View style={conversationStyles.main}>
      <View style={{ flex: 1, width: "100%", marginBottom: 16 }}>
        {messages.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 32 }}>
            <Text style={{ color: "#888" }}>Aucun message pour l'instant.</Text>
          </View>
        ) : (
          messages.map((msg, idx) => (
            <View
              key={idx}
              style={{
                backgroundColor:
                  msg.username === user?.username ? "#e3f2fd" : "#f5f5f5",
                borderRadius: 12,
                padding: 10,
                marginBottom: 8,
                alignSelf:
                  msg.username === user?.username ? "flex-end" : "flex-start",
                maxWidth: "80%",
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#007AFF" }}>
                {msg.username}
              </Text>
              <Text>{msg.text}</Text>
              <Text style={{ fontSize: 10, color: "#888", marginTop: 4 }}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </Text>
            </View>
          ))
        )}
      </View>
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
  );
};

export default Conversation;
