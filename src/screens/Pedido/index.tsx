import React from "react";
import {
  Container,
  View,
  Button,
  Title,
  Label,
  Item,
  Text,
  ListInfos,
  Link,
} from "./styles";

//Tela que serve para apresentar os pedidos

export const Pedido = ({ route, navigation }) => {
  const { pedido } = route.params
  const data = [pedido]

  const openEditaPedido = (pedido) => {
    navigation.navigate("EditaPedido", { pedido });
  };

  return (
    <Container>
      <View>
        <Button onPress={() => navigation.goBack()}>Voltar</Button>
        <Button onPress={() => openEditaPedido(pedido)}>Editar</Button>
      </View>
      <Title>Dados do pedido</Title>
      <ListInfos
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <>
            <Item>
              <Label>Desenho</Label>
              <Text>{item.desenho}</Text>
            </Item>
            <Item>
              <Label>Tamanho</Label>
              <Text>{item.tamanho}</Text>
            </Item>
            <Item>
              <Label>Local no corpo</Label>
              <Text>{item.local}</Text>
            </Item>
            <Item>
              <Label>Valor (R$)</Label>
              <Text>{item.valor}</Text>
            </Item>
            <Item>
              <Label>Status</Label>
              <Text>{item.status}</Text>
            </Item>
            <Item>
              <Label>Agendada para</Label>
              <Text>{item.agendado}</Text>
            </Item>
          </>
        )}
      />
    </Container>
  );
};

export default Pedido;
