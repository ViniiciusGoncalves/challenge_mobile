import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://hearmeout-40ddb-default-rtdb.firebaseio.com/",
});

export const AlterarSenha = (props) => {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const alterarSenha = () => {
    if (novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem. Por favor, verifique.");
      return;
    }

    const usuario = props.usuario;
    const cnpj = props.cnpj;
    const senha = props.senha;
    


    // Verificar se o usuário e o CNPJ existem antes de alterar a senha

    

    console.log(props.idUsuario)
    api.put(`/Registro/${props.idUsuario}.json`, [{senha: novaSenha, usuario: usuario, cnpj: cnpj}] ).then((res)=>{
      alert("Senha alterada")
      console.log("ID do usuario:" + props.idUsuario)


    }).catch((err)=>{
      console.log(err)
    })
  }

    
  //   api.get("/Registro.json").then((response) => {
  //     const data = response.data;
  //     let achou = false;

  //     if (data) {
  //       const dataArray = Object.values(data);

  //       for (let i = 0; i < dataArray.length; i++) {
  //         const obj = dataArray[i];
          

  //         if (obj.usuario === usuario && obj.cnpj === cnpj) {
  //           achou = true;
  //           // Usuário encontrado, agora faça a alteração da senha
  //           const idUsuario = Object.keys(data)[i];
  //           api
  //             .put(`/Registro/${idUsuario}.json`, {
  //               senha: novaSenha,
  //             })
  //             .then((res) => {
  //               alert("Senha alterada com sucesso.");
  //               props.navigation.navigate("Teste");
  //             })
  //             .catch((error) => {
  //               console.error("Erro ao alterar a senha:", error);
  //             });
  //           break;
  //         }
  //       }

  //       if (!achou) {
  //         alert("Usuário ou CNPJ não correspondem aos registros.");
  //       }
  //     }
  //   });
  // };

  return (
    <View style={stylesRegistro.main}>
      <View style={stylesRegistro.formsMain}>
        <Text style={stylesRegistro.textInput}>Nova Senha</Text>
        <TextInput
          value={novaSenha}
          onChangeText={setNovaSenha}
          style={stylesRegistro.Inputs}
          secureTextEntry={true}
        />
        <Text style={stylesRegistro.textInput}>Confirmar Senha</Text>
        <TextInput
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          style={stylesRegistro.Inputs}
          secureTextEntry={true}
        />
        <View style={stylesRegistro.botao}>
          <Text
            style={stylesRegistro.botaoTxt}
            onPress={() => {
              alterarSenha();
            }}
          >
            Alterar Senha
          </Text>
        </View>
      </View>
    </View>
  );
};

const stylesRegistro = StyleSheet.create({
  main: { flex: 1 },
  formsMain: { flex: 4, alignItems: "center" },
  textInput: {
    fontSize: 19,
    position: "relative",
    left: 5,
    fontWeight: "bold",
  },
  Inputs: {
    backgroundColor: "#FFBD59",
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 10,
    width: "50%",
    color: "black",
    padding: 10,
    fontSize: 20,
  },
  botao: {},
  botaoTxt: {
    fontSize: 20,
    backgroundColor: "#FFBD59",
    padding: 10,
    borderRadius: 10,
    width: "45%",
    textAlign: "center",
    fontWeight: "bold",
  },
});
