import React, { useState, useCallback } from "react";
import {
  Container,
  View,
  Button,
  Title,
  List,
  Item,
  Text,
} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export const Agenda = ({ navigation }) => {
  const [desenhando, setDesenhando] = useState([]);
  const [validando, setValidando] = useState([]);
  const [agendado, setAgendado] = useState([]);
  const [concluido, setConcluido] = useState([]);

  const handleFetchData = async () => {
    const responsePedidos = await AsyncStorage.getItem("@tattoo:pedidos");
    let pedidos = [];
    if (responsePedidos !== null) pedidos = JSON.parse(responsePedidos);

    const responseClientes = await AsyncStorage.getItem("@tattoo:clientes");
    let clientes = [];
    if (responseClientes !== null) clientes = JSON.parse(responseClientes);

    //Método para colocar o nome do cliente
    const atualizaNome = pedidos.map((item) => {
      for (let i = 0; i < clientes.length; i++) {
        if (item.cliente === clientes[i].id) {
          item.cliente = clientes[i].nome;
        }
      }
      return item;
    });

    const listDesenhando = atualizaNome.filter((item) => {
      if (item.status === "Desenhando") {
        return item;
      }
    });
    setDesenhando(listDesenhando);

    const listValidando = atualizaNome.filter((item) => {
      if (item.status === "Validando") {
        return item;
      }
    });
    setValidando(listValidando);

    const listAgendado = atualizaNome.filter((item) => {
      if (item.status === "Agendado") {
        return item;
      }
    });
    setAgendado(listAgendado);

    const listConcluido = atualizaNome.filter((item) => {
      if (item.status === "Concluido") {
        return item;
      }
    });
    setConcluido(listConcluido);
  };

  useFocusEffect(
    useCallback(() => {
      handleFetchData();
    }, [])
  );

  console.log(desenhando);

  return (
    <Container>
      <View>
        <Button onPress={() => navigation.goBack()}>Clientes</Button>
      </View>
      <Title>Desenhando</Title>
      <List>
        {desenhando.map(({ cliente, desenho, agendado }, index) => (
          <Item key={index}>
            <Text>{cliente}</Text>
            <Text>{desenho}</Text>
            <Text>{agendado}</Text>
          </Item>
        ))}
      </List>
      <Title>Validando</Title>
      <List>
        {validando.map(({ cliente, desenho, agendado }, index) => (
          <Item key={index}>
            <Text>{cliente}</Text>
            <Text>{desenho}</Text>
            <Text>{agendado}</Text>
          </Item>
        ))}
      </List>
      <Title>Agendado</Title>
      <List>
        {agendado.map(({ cliente, desenho, agendado }, index) => (
          <Item key={index}>
            <Text>{cliente}</Text>
            <Text>{desenho}</Text>
            <Text>{agendado}</Text>
          </Item>
        ))}
      </List>
      <Title>Concluído</Title>
      <List>
        {concluido.map(({ cliente, desenho, agendado }, index) => (
          <Item key={index}>
            <Text>{cliente}</Text>
            <Text>{desenho}</Text>
            <Text>{agendado}</Text>
          </Item>
        ))}
      </List>
    </Container>
  );
};

export default Agenda;
