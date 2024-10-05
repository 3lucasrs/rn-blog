import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from "react-native";
import PostItem from "../../components/PostItem";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/StackParamList";

interface Post {
  id: string;
  autor: string;
  postagem: string;
}

type NavigationProp = StackNavigationProp<RootStackParamList, "Postgram">;

const HomeScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp>();

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://10.0.0.103:3001/");
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Erro ao carregar posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPosts();
    }, [])
  );

  const handleDeletePost = async (id: string) => {
    try {
      await fetch(`http://10.0.0.103:3001/${id}`, {
        method: "DELETE",
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      setModalVisible(false);
    } catch (error) {
      console.error("Erro ao deletar post:", error);
    }
  };

  const confirmDeletePost = (id: string) => {
    setPostToDelete(id);
    setModalVisible(true);
  };

  const handleEditPost = (id: string) => {
    navigation.navigate("Editar", { postId: id });
  };

  const renderItem = ({ item }: { item: Post }) => (
    <PostItem
      id={item.id}
      title={item.autor}
      content={item.postagem}
      onEdit={() => handleEditPost(item.id)}
      onDelete={() => confirmDeletePost(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>POSTAGENS</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0c5b80" />
      ) : (
        <FlatList data={posts} renderItem={renderItem} keyExtractor={(item) => item.id} />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Publicar")}
      >
        <Text style={styles.addButtonText}>Fazer nova publicação</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Você tem certeza que deseja excluir este post?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={() => {
                  if (postToDelete) {
                    handleDeletePost(postToDelete);
                  }
                }}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#0c5b80",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#c42a1f",
  },
  confirmButton: {
    backgroundColor: "#328835",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default HomeScreen;
