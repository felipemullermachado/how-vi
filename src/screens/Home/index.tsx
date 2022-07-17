import React, { useCallback, useEffect } from "react";
import { Container, View, Btn, Title, Item, Text, Input, List } from "./styles";
import { Ionicons, Entypo } from "@expo/vector-icons";
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
  const [search, setSearch] = React.useState("");
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
      setSearch("");
    }, [])
  );

  //Método responsável por tratar os caracteres não reconhecidos pelo unicode, assim garante não dar erro no filtro de pesquisas
  const replaceSpecialChars = (str) => {
    const tipes = [];
    str = str.replace(/[ÀÁÂÃÄÅ]/, "A");
    str = str.replace(/[àáâãäå]/, "a");
    str = str.replace(/[ÈÉÊË]/, "E");
    str = str.replace(/[èéêë]/, "e");
    str = str.replace(/[Í]/, "I");
    str = str.replace(/[í]/, "i");
    str = str.replace(/[ÓÖÔ]/, "O");
    str = str.replace(/[óöô]/, "o");
    str = str.replace(/[Ú]/, "U");
    str = str.replace(/[úü]/, "u");
    str = str.replace(/[Ç]/, "C");
    str = str.replace(/[ç]/, "c");

    return str.replace(/[^a-z0-9]/gi, "");
  };

  //Método para realizar o filtro de pesquisas
  useEffect(() => {
    if (search === "") {
      handleFetchData();
    } else {
      setData(
        data.filter(
          (item) =>
            replaceSpecialChars(item.nome)
              .toLowerCase()
              .indexOf(replaceSpecialChars(search).toLowerCase()) > -1
        )
      );
    }
  }, [search]);

  //Métodos que configuram as rotas existentes na tela Home
  const openAgenda = () => {
    navigation.navigate("Agenda");
  };
  const openScreen = (newCliente) => {
    navigation.navigate("EditaCliente", { newCliente });
  };
  const openProfile = (cliente) => {
    navigation.navigate("Perfil", { cliente });
  };

  return (
    <Container>
      <View>
        <Btn onPress={openAgenda}>
          <Entypo name="calendar" size={24} color="black" />
        </Btn>
        <Btn onPress={openScreen}>
          <Ionicons name={"add"} size={24} color="black" />
        </Btn>
      </View>
      <Title>Clientes</Title>
      <Input onChangeText={setSearch} value={search} placeholder="Pesquisar" />
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
