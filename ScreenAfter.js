import { StyleSheet, Text, View, TextInput, Button, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import axios from "axios";

const API_KEY = "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";
const API_URL = "https://api.openai.com/v1/completions";

export const ScreenAfter = (props) => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [respostaCliente, setRespostaCliente] = useState("");

  const handleSend = async () => {
    
    if (prompt.trim() === "") {
      return; 
    }

    const requestBody = {
      model: "text-davinci-003",
      prompt:
        "Chat, agora você é um bot de serviço. Considere esta mensagem como um cliente pedindo informações e responda de forma direta. Esta é a pergunta do cliente: {" +
        prompt +
        "}",
      max_tokens: 2048,
      temperature: 0.5,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + API_KEY,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        const respostaBot = data.choices[0].text;

        const novaMensagem = { texto: prompt, tipo: "cliente" };
        const novaRespostaBot = { texto: respostaBot, tipo: "bot" };

        setMessages([...messages, novaMensagem, novaRespostaBot]);
        setPrompt(""); // Limpa o campo de entrada após o envio
      } else {
        console.error("Erro ao enviar a mensagem");
      }
    } catch (error) {
      console.error("Erro ao enviar a mensagem", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 20 }}>
        <Text style={{ textAlign: "center", fontSize: 30 }}>
          Olá! {props.usuario}
        </Text>
        <View style={{ margin: 10, width: "50%", padding: 10 }}>
          <Text
            style={{
              margin: 10,
              borderWidth: 1,
              fontSize: 15,
              padding: 10,
              borderRadius: 10,
              backgroundColor: "white",
            }}
          >
            Olá, Como podemos te ajudar?
          </Text>
        </View>
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={{
                marginTop: 10,
                marginLeft: item.tipo === "cliente" ? 200 : 8,
                width: "50%",
                padding: 10,
              }}
            >
              
              <Text
                style={{
                  textAlign: "center",
                  borderWidth: 1,
                  fontSize: 15,
                  margin: 10,
                  fontSize: 15,
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: item.tipo === "cliente" ? "#FFBD59" : "white",
                }}
              >
                {item.texto}
              </Text>
            </View>
          )}
        />
      </View>
      <View
        style={{
          backgroundColor: "#FFBD59",
          flexDirection: "row",
          justifyContent: "space-between",
          borderWidth: 1,
          margin: 10,
        }}
      >
        <TextInput
          style={{ borderWidth: 1, flex: 1, padding: 8 }}
          placeholder="Digite algo"
          value={prompt}
          onChangeText={(text) => {
            setPrompt(text);
          }}
        />
        <View
          style={{
            alignItems: "center",
            borderWidth: 1,
            width: "20%",
            backgroundColor: "white",
            borderRadius: 20,
          }}
        >
          <Text
            style={{ alignItems: "center", marginTop: 14, color: "#c77d0e" }}
            onPress={() => {
              handleSend();
            }}
          >
            Enviar
          </Text>
        </View>
      </View>
    </View>
  );
};
