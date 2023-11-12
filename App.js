import { StyleSheet, Text, View, Image, TextInput, Button } from "react-native";
import imgLogo from "./assets/LOGO.webp";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Registro } from "./Registrar";
import { Formulario } from "./Login";
import { ScreenAfter } from "./ScreenAfter";
import { EsquecerSenha } from "./EsquecerSenha";
import { AlterarSenha } from "./AlterarSenha";

const Stack = createStackNavigator();

export default function App(props) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [idUsuario, setIdUsuario] = useState("")

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{
            header: () => (
              <View style={styles.main}>
                <View style={styles.container}>
                  <Image style={styles.imgStyle} source={imgLogo} />
                </View>
              </View>
            ),
          }}
          name="Login"
        >
          {(props) => (
            <Formulario
              {...props}
              usuario={usuario}
              setUsuario={setUsuario}
              senha={senha}
              setSenha={setSenha}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Registro">
          {(props) => (
            <Registro
              {...props}
              usuario={usuario}
              setUsuario={setUsuario}
              senha={senha}
              setSenha={setSenha}
              confirmarSenha={confirmarSenha}
              setConfirmarSenha={setConfirmarSenha}
              cnpj={cnpj}
              setCnpj={setCnpj}
            />
          )}
        </Stack.Screen>
        <Stack.Screen options={{title: "ASSISTENTE", headerTitleStyle:{textAlign: 'center', marginLeft: 95}}} name="Teste">
          {(props) => <ScreenAfter usuario={usuario} />}
        </Stack.Screen>
        <Stack.Screen name="EsquecerSenha">
          {(props) => (
            <EsquecerSenha
              {...props}
              usuario={usuario}
              setUsuario={setUsuario}
              cnpj={cnpj}
              setCnpj={setCnpj}
              idUsuario={idUsuario}
              setIdUsuario={setIdUsuario}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AlterarSenha">
          {(props) => (<AlterarSenha {...props} 
           senha={senha}
           setSenha={setSenha}
           idUsuario={idUsuario}
           setIdUsuario={setIdUsuario}
           setCnpj={setCnpj}
           cnpj={cnpj}
           usuario={usuario}
           setUsuario={setUsuario}/>)}

        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//STYLE

const styles = StyleSheet.create({
  main: {},
  container: {
    flex: 5,
    borderWidth: 1,
    alignItems: "center",
  },
  imgStyle: {
    width: "50%",
    marginTop: 60,
  },
  container2: {
    flex: 8,
    backgroundColor: "#FFEEEE",
  },
});
