import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import { MaterialIcons } from "@expo/vector-icons";
import ReviewForm from "./reviewForm";

export const GAMES_QUERY = gql`
  query Games {
    games {
      title
      body
      rating
      id
    }
  }
`;

export default function Home({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { data, loading } = useQuery(GAMES_QUERY);

  if (loading) {
    return <Text>Loading games...</Text>;
  }

  const handleForm = (res) => {
    setModalOpen(false);
  };
  return (
    <View style={globalStyles.container}>
      <Modal visible={modalOpen} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons
              name="close"
              size={32}
              style={styles.modalClose}
              onPress={() => setModalOpen(false)}
            />
            <ReviewForm handleForm={handleForm} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <MaterialIcons
        name="add"
        size={32}
        style={styles.modalToggle}
        onPress={() => setModalOpen(true)}
      />
      <FlatList
        data={data.games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Reviews", item)}
          >
            <Card>
              <Text style={globalStyles.titleText}>{item.title}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalToggle: {
    alignSelf: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 10,
  },
  modalClose: {
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 10,
    width: 50,
  },
  modalContent: {
    flex: 1,
  },
});
