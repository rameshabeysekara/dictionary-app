import { StyleSheet } from "react-native";
import { Colors } from "../../../styles/colors";

const styles = StyleSheet.create({
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
    paddingTop: 10,
  },
});

export default styles;
