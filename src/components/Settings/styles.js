import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    //flexDirection: "row",
    alignSelf: "stretch",
    padding: 20,
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
      marginTop: 20,
    },
    label: {
      color: "#5e5e5e",
      fontSize: 16,
      marginLeft: 10,
    },
  },
});

export default styles;
