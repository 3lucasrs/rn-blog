import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface PostItemProps {
  id: string;
  title: string;
  content: string;
  onEdit: () => void;
  onDelete: () => void;
}

const PostItem: React.FC<PostItemProps> = ({ title, content, onEdit, onDelete }) => {
  return (
    <View style={styles.postContainer}>
      <Text style={styles.title}>
        {title}
        <Text style={styles.sufix}> publicou: </Text>
      </Text>
      <Text style={styles.content}>{content}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={onEdit}>
          <Icon name="edit" size={20} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onDelete}>
          <Icon name="trash" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#FFF",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sufix: {
    fontSize: 18,
    fontWeight: "400",
  },
  content: {
    fontSize: 14,
    marginVertical: 2,
  },
  actions: {
    flexDirection: "row",
    alignSelf: "flex-end",
    gap: 10,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#328835",
  },
  deleteButton: {
    backgroundColor: "#c42a1f",
  },
});

export default PostItem;
