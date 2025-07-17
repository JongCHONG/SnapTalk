import { StyleSheet } from "react-native";

const dashboardStyles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    zIndex: 9,
  },

  main: { flex: 1, padding: 16 },
});

export default dashboardStyles;