import * as React from "react";
import * as Speech from "expo-speech";
import { View, Text, SafeAreaView } from "react-native";
import { save as databaseSave } from "../../database";
import styles from "./styles";
// import { Colors } from "../../styles/colors";
import { Button, IconButton, Colors, Searchbar } from "react-native-paper";

export default function Home() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const speak = () => {
    const thingToSay = "1";
    Speech.speak(thingToSay);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Word of the day!</Text>
        <View style={styles.wordBox}>
          <View style={styles.wordContainer}>
            <View style={styles.wordContainerWord}>
              <Text style={styles.word}>hbhhvb</Text>
            </View>
            <View style={styles.wordContainerWord}>
              <Button icon="play-circle" mode="contained" onPress={speak}>
                Play
              </Button>
            </View>
          </View>
          <Text style={styles.meaning}>hbhhvb</Text>
          <View style={styles.buttonContainer}>
            <Button
              icon="playlist-star"
              mode="contained"
              onPress={() => console.log("Pressed")}
            >
              Add to Favorites
            </Button>
          </View>
        </View>
        <View style={styles.wordBox}>
          <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Search a Word"
              onChangeText={onChangeSearch}
              value={searchQuery}
            />
          </View>
          <View style={styles.wordContainer}>
            <View style={styles.wordContainerWord}>
              <Text style={styles.word}>hbhhvb</Text>
            </View>
            <View style={styles.wordContainerWord}>
              <Button icon="play-circle" mode="contained" onPress={speak}>
                Play
              </Button>
            </View>
          </View>
          <Text style={styles.meaning}>hbhhvb</Text>
          <View style={styles.buttonContainer}>
            <Button
              icon="playlist-star"
              mode="contained"
              onPress={() => console.log("Pressed")}
            >
              Add to Favorites
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
