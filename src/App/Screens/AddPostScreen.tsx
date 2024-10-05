import React, { useState } from "react";
import { View, TextInput, Alert, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AddPostScreen: React.FC = () => {
  const [autor, setAutor] = useState("");
  const [postagem, setPostagem] = useState("");
  const navigation = useNavigation();

  const handleAddPost = async () => {
    if (!autor || !postagem) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      const response = await fetch("http://10.0.0.103:3001/", {
        method: "POST",
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
        Alert.alert("Sucesso", "Post adicionado com sucesso!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", "Falha ao adicionar o post");
      }
    } catch (error) {
      console.error("Erro ao adicionar post:", error);
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

      <TouchableOpacity style={styles.addButton} onPress={handleAddPost}>
        <Text style={styles.addButtonText}>Adicionar Post</Text>
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
  addButton: {
    backgroundColor: "#0c5b80",
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddPostScreen;
