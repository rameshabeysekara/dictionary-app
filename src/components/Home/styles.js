import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "ios" ? 0 : 40,
  },
  title: {
    fontSize: 22,
    color: Colors.primary,
    fontWeight: "normal",
    paddingTop: 15,
  },
  wordBox: {
    marginTop: 15,
    width: "100%",
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
  },
  searchContainer: {
    marginBottom: 20,
  },
  wordContainer: {
    flexDirection: "row",
  },
  wordContainerWord: {
    flex: 1,
  },
  word: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: "bold",
    margin: 10,
  },
  meaning: {
    fontSize: 22,
    color: Colors.primary,
    fontWeight: "normal",
    margin: 10,
  },
  buttonContainer: {
    marginTop: 15,
    marginHorizontal: 20,
  },
});

export default styles;
