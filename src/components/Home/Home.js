import { useState, useEffect } from "react";
import * as Speech from "expo-speech";
import { View, SafeAreaView, ScrollView, Alert } from "react-native";
import { getWordOfTheDay, getWordMeaning } from "../../utils";
import styles from "./styles";
import {
  Button,
  Searchbar,
  Card,
  Title,
  Text,
  Paragraph,
} from "react-native-paper";
import { save as databaseSave } from "../../database";

export default function Home(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedWord, setSearchedWord] = useState({});
  const [wordOfTheDay, setWordOfTheDay] = useState({});

  useEffect(() => {
    async function fetchWordOfTheDay() {
      try {
        const wordData = await getWordOfTheDay();
        setWordOfTheDay(wordData);
      } catch (error) {
        console.error("Error fetching word of the day:", error);
      }
    }
    fetchWordOfTheDay();
  }, []);

  const onSearch = async () => {
    if (searchQuery) {
      try {
        const meaningData = await getWordMeaning(searchQuery);
        setSearchedWord({ word: searchQuery, meaning: meaningData });
      } catch (error) {
        console.error("Error fetching meaning:", error);
        setSearchedWord({ word: searchQuery, meaning: "No meaning available" });
      }
    } else {
      setSearchedWord({});
    }
  };

  const speak = (word) => {
    const thingToSay = word || "";
    Speech.speak(thingToSay);
  };

  const handleAddPress = (wordObj) => {
    if (wordObj.word && wordObj.meaning) {
      const data = {
        word: wordObj.word,
        meaning: wordObj.meaning,
      };

      databaseSave(data)
        .then((id) => {
          if (id) {
            data.id = id;
            props.onAddWord(data);
            Alert.alert("Database Save", "Word added to favorites.");
          } else {
            Alert.alert(
              "Database Save",
              "There was an error saving to the database. Please, try again later."
            );
          }
        })
        .catch((error) => {
          console.error("Error saving to the database:", error);
          Alert.alert(
            "Database Save",
            "There was an error saving to the database. Please, try again later."
          );
        });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Word of the day!</Text>
          <View style={styles.wordBox}>
            <View style={styles.wordContainer}>
              <View style={styles.wordContainerWord}>
                <Title style={styles.word}>{wordOfTheDay.word}</Title>
              </View>
              <View style={styles.wordContainerWord}>
                <Button
                  icon="play-circle"
                  mode="contained"
                  onPress={() => speak(wordOfTheDay.word)}
                  disabled={!wordOfTheDay.word}
                >
                  Play
                </Button>
              </View>
            </View>
            <Paragraph style={styles.meaning}>{wordOfTheDay.meaning}</Paragraph>
            <View style={styles.buttonContainer}>
              <Button
                icon="playlist-star"
                mode="contained"
                onPress={() => handleAddPress(wordOfTheDay)}
              >
                Add to Favorites
              </Button>
            </View>
          </View>
          <View style={styles.wordBox}>
            <View style={styles.searchContainer}>
              <Searchbar
                placeholder="Search a Word"
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
                onIconPress={onSearch}
                searchAccessibilityLabel="Search"
                clearAccessibilityLabel="Clear"
              />
            </View>
            {searchQuery !== "" && (
              <>
                <View style={styles.wordContainer}>
                  <View style={styles.wordContainerWord}>
                    <Title style={styles.word}>{searchedWord.word}</Title>
                  </View>
                  <View style={styles.wordContainerWord}>
                    <Button
                      icon="play-circle"
                      mode="contained"
                      onPress={() => speak(searchedWord.word)}
                      disabled={!searchedWord.word}
                    >
                      Play
                    </Button>
                  </View>
                </View>
                <Paragraph style={styles.meaning}>{searchedWord.meaning}</Paragraph>
                <View style={styles.buttonContainer}>
                  <Button
                    icon="playlist-star"
                    mode="contained"
                    onPress={() => handleAddPress(searchedWord)}
                  >
                    Add to Favorites
                  </Button>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
