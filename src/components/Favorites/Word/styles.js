import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../../styles/colors";

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    backgroundColor: Colors.headerText,
    margin: 10,
    padding: 15,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: Colors.text,
  },
  description: {
    fontSize: 17,
    fontWeight: "bold",
    color: Colors.text,
    paddingTop: 30,
  },
  text: {
    fontSize: 13,
    color: Colors.text,
  },

  modal: {
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.modalBackground,
    },
    box: {
      backgroundColor: Colors.headerText,
      padding: 30,
      width: "70%",
      borderRadius: 15,
      elevation: 5,
      shadowOpacity: 0.25,
      shadowRadius: 4,
      shadowColor: Colors.text,
      shadowOffset: {
        width: 0,
        height: 4,
      },
    },
  },

  close: {
    container: {
      flexDirection: "row",
      alignItems: "center",
      position: "absolute",
      top: -15,
      right: -15,
    },
  },

  options: {
    paddingTop: Platform.OS === "ios" ? 20 : 10,
  },

  switch: {
    container: {
      alignItems: "center",
    },
    label: {
      paddingTop: Platform.OS === "ios" ? 10 : 0,
      fontSize: 12,
      color: Colors.text,
    },
  },

  remove: {
    container: {
      alignItems: "flex-end",
      justifyContent: "center",
      textAlign: "center",
    },
    icon: {
      color: Colors.warning,
      alignSelf: "center",
    },
    label: {
      paddingTop: 5,
      fontSize: 12,
      color: Colors.warning,
    },
  },
});

export default styles;
