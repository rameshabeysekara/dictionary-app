import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomColor: Colors.primary,
    borderBottomWidth: 3,
    paddingBottom: 5,
    paddingTop: Platform.OS === "ios" ? 0 : 30,
    paddingHorizontal: 10,
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    color: Colors.primary,
    fontWeight: "bold",
    alignSelf: "flex-end",
    marginLeft: 10,
  },
  author: {
    fontSize: 14,
    color: Colors.text,
  },
});

export default styles;
