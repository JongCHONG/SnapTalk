import { StyleSheet } from "react-native";

const customDrawerStyles = StyleSheet.create({
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
});

export default customDrawerStyles;