import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "ios" ? 30 : 90,
  },
  label: {
    color: Colors.text,
    fontSize: 16,
  },
  switchContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default styles;