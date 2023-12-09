import { useState } from "react";
import { View, Text, Pressable, Modal, Switch, Alert } from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as database from "../../../database";
import { Colors } from "../../../styles/colors";
import { List, IconButton, Paragraph, Title, Button } from "react-native-paper";

export default function Word(props) {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleStatusChangePress = () => {
    database
      .update(props.word.id, { done: !props.word.done })
      .then((updated) => {
        if (updated) {
          props.onStatusChange(props.word.id);
        } else {
          Alert.alert(
            "Database Update",
            "There was an error updating the database. Please, try again later."
          );
        }
      });
  };

  const handleRemovePress = () => {
    Alert.alert(
      "Remove word",
      "This action will permanently delete this word. This action cannot be undone!",
      [
        {
          text: "Confirm",
          onPress: () => {
            database
              .remove(props.word.id, { done: !props.word.done })
              .then((removed) => {
                if (removed) {
                  props.onWordRemoval(props.word.id);
                  setShowModal(false);
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
            {/* Close Modal */}
            <Pressable onPress={handleModalToggle}>
              <View style={styles.close.container}>
                <AntDesign name="closesquare" size={25} color={Colors.close} />
              </View>
            </Pressable>

            {/* word Description */}
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
