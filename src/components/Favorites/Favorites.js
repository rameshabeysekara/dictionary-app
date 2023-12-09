import { View, ScrollView, Text, SafeAreaView } from "react-native";
import Word from "./Word/Word";
import styles from "./styles";

export default function Favorites(props) {
  if (props.words?.length === 0) {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.fullCenter}>
            <Text>There are no words in the list.</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView>
          {props.words?.map((word, index) => (
            <Word
              key={index}
              word={word}
              onStatusChange={props.onStatusChange}
              onWordRemoval={props.onWordRemoval}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
