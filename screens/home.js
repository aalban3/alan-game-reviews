import React, { useState, useEffect } from "react";
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
import axios from "axios";

export default function Home({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  // {
  //   title: "Zelda: Breath of the wild",
  //   rating: 5,
  //   body: "Amazing game, I loved it!",
  //   id: 1,
  // },
  // {
  //   title: "Mario Oddysey",
  //   rating: 5,
  //   body: "Brings me back to my childhood!",
  //   id: 2,
  // },
  // {
  //   title: "Call Of Duty: War Zone",
  //   rating: 3,
  //   body: "Fun but too many loot boxes, I am not rich!",
  //   id: 3,
  // },
  const fetchReviews = async () => {
    try {
      const { data } = await axios.get("http://192.168.1.154:3000/reviews");
      setReviews(data);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchReviews();
    return () => "App will unmount";
  }, []);

  const handleForm = async (text) => {
    try {
      const { data: newReview } = await axios.post(
        "http://192.168.1.154:3000/reviews",
        text
      );
      setReviews((prevReview) => {
        return [...prevReview, newReview];
      });
      setModalOpen(false);
    } catch (err) {
      throw err;
    }
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
        data={reviews}
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
