import React, { useState, useCallback } from "react";
import {
  Container,
  View,
  Button,
  Title,
  Label,
  Item,
  Text,
  BtnAdd,
  ListRequests,
  Link,
  Subtitle,
} from "./styles";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Linking } from "react-native";

//Tela perfil que apresenta o cliente e seus respectivos pedidos

export const Perfil = ({ route, navigation }) => {
  const [pedidos, setPedidos] = useState([]);
  const { getItem, setItem } = useAsyncStorage("@tattoo:clientes");
  const { cliente } = route.params;
  const idCliente = cliente.id;

  //Funções que configuram as rotas existentes na tela Perfil
  const openPedido = (pedido) => {
    navigation.navigate("Pedido", { pedido });
  };
  const openEditaCliente = (cliente) => {
    navigation.navigate("EditaCliente", { cliente });
  };
  const openEditaPedido = (idCliente) => {
    navigation.navigate("EditaPedido", { idCliente });
  };

  //Função que atualiza a lista dos pedidos existentes
  // Repare que é utilizado a função filter, para filtrar os pedidos do cliente que aparece nesta tela
  const handleFetchData = async () => {
    const response = await AsyncStorage.getItem("@tattoo:pedidos");
    let pedidos = [];
    if (response !== null) pedidos = JSON.parse(response);

    const atualizaPedidos = pedidos.filter((item) => {
      if (item.cliente === cliente.id) {
        return item;
      }
    });
    setPedidos(atualizaPedidos);
  };
  useFocusEffect(
    useCallback(() => {
      handleFetchData();
    }, [])
  );

  return (
    <Container>
      <View>
        <Button onPress={() => navigation.goBack()}>Voltar</Button>
        <Button onPress={() => openEditaCliente(cliente)}>Editar</Button>
      </View>
      <Title>{route.params?.nome || cliente.nome}</Title>
      <Item>
        <Label>Celular</Label>
        <Link
          onPress={() =>
            Linking.openURL(
              `https://wa.me/55${(
                route.params?.whats || cliente.phone
              ).replace(/[^0-9]/g, "")}`
            )
          }
        >
          {route.params?.whats || cliente.phone}
        </Link>
      </Item>
      <Item>
        <Label>E-mail</Label>
        <Link>{route.params?.email || cliente.email}</Link>
      </Item>
      <Item>
        <Label>Instagram</Label>
        <Text>@{route.params?.insta || cliente.instagram}</Text>
      </Item>
      <View>
        <Subtitle>Pedidos</Subtitle>
        <Button onPress={() => openEditaPedido(idCliente)}>Adicionar</Button>
      </View>
      <ListRequests
        data={pedidos}
        renderItem={({ item }) => (
          <Item onPress={() => openPedido(item)}>
            <Text>{item.desenho}</Text>
            <Text>{item.status}</Text>
            <Text>{item.agendado && "Agendada para: " + item.agendado}</Text>
          </Item>
        )}
      />
    </Container>
  );
};

export default Perfil;
