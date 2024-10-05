import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

interface RouteParams {
  postId: string;
}

const EditPostScreen: React.FC = () => {
  const [autor, setAutor] = useState("");
  const [postagem, setPostagem] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { postId } = route.params as RouteParams;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://10.0.0.103:3001/${postId}`);
        const data = await response.json();
        setAutor(data.autor);
        setPostagem(data.postagem);
      } catch (error) {
        console.error("Erro ao carregar post:", error);
        Alert.alert("Erro", "Falha ao carregar o post");
      }
    };

    fetchPost();
  }, [postId]);

  const handleSavePost = async () => {
    if (!autor || !postagem) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      const response = await fetch(`http://10.0.0.103:3001/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          autor,
          postagem,
        }),
      });

      const data = await response.json();
      if (data.item) {
        Alert.alert("Sucesso", "Post atualizado com sucesso!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", "Falha ao atualizar o post");
      }
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
      Alert.alert("Erro", "Falha ao conectar com o servidor");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Autor</Text>
      <TextInput
        placeholder="Digite o nome do autor"
        value={autor}
        onChangeText={setAutor}
        style={styles.input}
      />

      <Text style={styles.label}>Postagem</Text>
      <TextInput
        placeholder="Digite a postagem"
        value={postagem}
        onChangeText={setPostagem}
        style={styles.input}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSavePost}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "#0c5b80",
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditPostScreen;
