import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Registro } from "./Registrar";

const api = axios.create({
    baseURL: "https://hearmeout-40ddb-default-rtdb.firebaseio.com/",
  });

export const EsquecerSenha = (props) => {


  const usuario = props.usuario;
  const cnpj = props.cnpj;
  


  //ASYNC CADASTRO
  const verificarUsuario = () => {

    api.get("/Registro.json").then((res)=>{
        const data = res.data
        let achou  = false

        for (const chave in data) {
          const registro = chave;
          console.log(registro)
          props.setIdUsuario(registro)
                  
        
        if (data) {
            const dataArray = Object.values(data); 
  
            for (let i = 0; i < dataArray.length; i++) {
              const obj = dataArray[i];
              obj.map((item, index)=>{
                
                // console.log("id" + id)
                // console.log("")
                // console.log(item.usuario)
                // console.log(item.cnpj)
                // console.log('')
                // console.log(cnpj)
                // console.log(usuario)
                // console.log(index)
                if (item.usuario === usuario && item.cnpj === cnpj) {
                  console.log(chave[index])
                  achou = true;
                  alert("USUÁRIO ENCONTRADO")
                  props.navigation.navigate("AlterarSenha");
                }
              })
            }
            if (!achou) {
                alert("Usuario ou cnpj nao confere");
              }
            }
            break;
          }
    })

    // api.get("/Registro").then((info) => {
    //   let lista = [];
    //   let achou = false;
    //   if (info) {
    //     lista = JSON.parse(info);
    //   }
    //   for (let i = 0; i < lista.length; i++) {
    //     const obj = lista[i];
    //     if (obj.usuario === usuario && obj.cnpj === cnpj) {
    //       achou = true;
    //       alert("USUARIO ENCONTRADO");
    //       props.navigation.navigate("AlterarSenha")
    //       break;
    //     }
    //   }
    //   if (!achou) {
    //     alert("Usuario ou senha estão incorretos");
    //   }
    // });
  };

  return (
    <View style={stylesRegistro.main}>
      <View style={stylesRegistro.mainTitulo}>
        <Text style={stylesRegistro.titulo}>Recupere sua conta</Text>
        <Text style={stylesRegistro.descricao}>Digite as informações abaixo para poder recuperar</Text>
      </View>
      <View style={stylesRegistro.formsMain}>
        <Text style={stylesRegistro.textInput}>Usuario</Text>
        <TextInput
          value={props.usuario}
          onChangeText={props.setUsuario}
          style={stylesRegistro.Inputs}
        />
        <Text style={stylesRegistro.textInput}>cnpj</Text>
        <TextInput
          value={props.cnpj}
          onChangeText={props.setCnpj}
          style={stylesRegistro.Inputs}
        />
        <View style={stylesRegistro.botao}>
          <Text
            style={stylesRegistro.botaoTxt}
            onPress={() => {
              verificarUsuario();
            }}
          >
            Continuar
          </Text>
          <View>
            <Text
              style={stylesRegistro.botaoBack}
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              Voltar
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const stylesRegistro = StyleSheet.create({
  main: { flex: 1 },
  descricao:{textAlign: "center", fontSize: 15 },
  mainTitulo: { flex: 1, marginTop: 50 },
  titulo: { textAlign: "center", fontSize: 35 },
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
  botaoBack: {
    fontSize: 20,
    backgroundColor: "#FFBD59",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
});
