import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "ios" ? 0 : 60,
  },
  fullCenter: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default styles;
