import { useState } from "react";
import { View, Pressable, Modal, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as database from "../../../database";
import { List, Title, Paragraph, Button } from "react-native-paper";
import styles from "./styles";
import { Colors } from "../../../styles/colors";

export default function Word(props) {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleRemovePress = () => {
    Alert.alert(
      "Remove word",
      "This action will permanently delete this word. This action cannot be undone!",
      [
        {
          text: "Confirm",
          onPress: () => {
            database.remove(props.word.id, { done: !props.word.done })
              .then((removed) => {
                setShowModal(false);
                if (removed) {
                  props.onWordRemoval(props.word.id);
                  Alert.alert(
                    "Database Update",
                    "Data removed from the database."
                  );
                } else {
                  Alert.alert(
                    "Database Update",
                    "There was an error removing data from the database. Please, try again later."
                  );
                }
              });
          },
        },
        {
          text: "Cancel",
        },
      ]
    );
  };

  return (
    <>
      <Pressable onPress={handleModalToggle}>
        <List.Item
          title={props.word.word}
          description={props.word.meaning}
          left={(props) => <List.Icon {...props} icon="bookmark-check" />}
        />
      </Pressable>

      <Modal visible={showModal} transparent={true}>
        <View style={styles.modal.container}>
          <View style={styles.modal.box}>
            <Pressable onPress={handleModalToggle}>
              <View style={styles.close.container}>
                <AntDesign name="closesquare" size={25} color={Colors.text}/>
              </View>
            </Pressable>

            <Title>{props.word.word}</Title>
            <Paragraph>{props.word.meaning}</Paragraph>

            <View style={styles.options}>
              <Button
                icon="bookmark-remove"
                mode="contained"
                onPress={handleRemovePress}
              >
                Remove word
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
