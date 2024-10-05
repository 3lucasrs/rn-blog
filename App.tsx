import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import HomeScreen from "./src/App/Screens/HomeScreen";
import AddPostScreen from "./src/App/Screens/AddPostScreen";
import EditPostScreen from "./src/App/Screens/EditPostScreen";
import { RootStackParamList } from "./src/types/StackParamList";

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Postgram"
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <Image
                source={require("./assets/logo.png")}
                style={{ width: 140, height: 60 }}
                resizeMode="contain"
              />
            ),
            headerTitleAlign: "left",
          }}
        />
        <Stack.Screen name="Publicar" component={AddPostScreen} />
        <Stack.Screen name="Editar" component={EditPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
