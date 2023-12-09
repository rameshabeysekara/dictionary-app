import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "ios" ? 30 : 90,
  },
  label: {
    //flex: 4,
    color: "#777",
    fontSize: 16,
  },
  switch: {
    container: {
      //flex: 1,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    label: {
      color: "#5e5e5e",
      fontSize: 16,
    },
  },
});

export default styles;
