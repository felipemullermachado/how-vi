import React, { useCallback } from "react";
import {
  Container,
  View,
  BtnText,
  Title,
  Item,
  Text,
  Input,
  List,
} from "./styles";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

//Tela inicial
//A persistência de dados ocorre com o auxilio da biblioteca 'useAsyncStorage'
//Esta biblioteca salva os dados no formato de coleção represetada por chave-valor
//Foi necessário construir duas coleções (clientes e pedidos)

type CardProps = {
  id: string;
  nome: string;
  cpf: string;
  nascimento: string;
  endereco: string;
  phone: string;
  email: string;
  instagram: string;
};

export const Home = ({ navigation }) => {
  const [text, onChangeText] = React.useState("");
  const [data, setData] = React.useState<CardProps[]>([]);

  const { getItem } = useAsyncStorage("@tattoo:clientes");

  //Função que atualiza a lista dos clientes existentes
  const handleFetchData = async () => {
    const response = await getItem();
    const data = response ? JSON.parse(response) : [];
    setData(data);
  };

  useFocusEffect(
    useCallback(() => {
      handleFetchData();
    }, [])
  );


  //Funções que configuram as rotas existentes na tela Home
  const openScreen = (newCliente) => {
    navigation.navigate("EditaCliente", { newCliente });
  };
  const openProfile = (cliente) => {
    navigation.navigate("Perfil", { cliente });
  };

  return (
    <Container>
      <View>
        <BtnText>
          Agenda
        </BtnText>
        <BtnText onPress={openScreen}>
          Novo cliente
        </BtnText>
      </View>
      <Title>Clientes</Title>
      <Input onChangeText={onChangeText} value={text} placeholder="Pesquisar" />
      <List
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item>
            <Text onPress={() => openProfile(item)}>{item.nome}</Text>
          </Item>
        )}
      />
    </Container>
  );
};

export default Home;
