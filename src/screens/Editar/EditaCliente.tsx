import React, { useEffect } from "react";
import {
  Container,
  BigView,
  View,
  Button,
  Title,
  Label,
  Input,
  Delete,
} from "./styles";
import uuid from "react-native-uuid";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

//Tela responsável para editar e cadastrar novos clientes

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

type Props = {
  data: CardProps;
  onPress: () => void;
};

export const EditaCliente = ({ route, navigation }) => {
  const [nome, setNome] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [nascimento, setNascimento] = React.useState("");
  const [endereco, setEndereco] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [instagram, setInstagram] = React.useState("");

  const { getItem, setItem } = useAsyncStorage("@tattoo:clientes");

  const { newCliente, cliente } = route.params;

  //Para que apareça as informações do cliente que será editado nos seus devidos inputs
  useEffect(() => {
    if (cliente) {
      setNome(cliente.nome);
      setCpf(cliente.cpf);
      setNascimento(cliente.nascimento);
      setEndereco(cliente.endereco);
      setPhone(cliente.phone);
      setEmail(cliente.email);
      setInstagram(cliente.instagram);
    }
  }, [cliente]);

  //Função que é disparada para atualizar os dados do cliente desejado
  const handleUpdate = async () => {
    const result = await getItem();
    let clientes = [];
    if (result !== null) clientes = JSON.parse(result);

    const novaTabela = clientes.filter((item) => {
      if (item.id === cliente.id) {
        item.nome = nome;
        item.cpf = cpf;
        item.nascimento = nascimento;
        item.endereco = endereco;
        item.phone = phone;
        item.email = email;
        item.instagram = instagram;
      }
      return item;
    });

    await setItem(JSON.stringify(novaTabela));
    navigation.navigate({
      name: "Perfil",
      params: { nome: nome, whats: phone, email: email, insta: instagram },
      merge: true,
    });
  };

  //Função que serve para armazenar os dados de um novo cliente cadastrado
  //Foi utilizado a biblioteca useAsyncStorage, que armazena os dados na forma "chave-valor"
  const handleSubmit = async () => {
    try {
      const id = uuid.v4();
      const newData = {
        id,
        nome,
        cpf,
        nascimento,
        endereco,
        phone,
        email,
        instagram,
      };

      const response = await getItem();
      const previousData = response ? JSON.parse(response) : [];

      const data = [...previousData, newData];

      //salva o item no storage local

      await setItem(JSON.stringify(data));
      navigation.navigate("Home");
    } catch (e) {
      console.log(e);
    }
  };

  //Função que serve para deletar os dados de um cliente
  const handleDelete = async () => {
    const result = await getItem();
    let clientes = [];
    if (result !== null) clientes = JSON.parse(result);

    const newClientes = clientes.filter((item) => item.id !== cliente.id);
    await setItem(JSON.stringify(newClientes));
    navigation.navigate("Home");
  };

  return (
    <Container>
      <View>
        <Button
          onPress={() =>
            newCliente
              ? navigation.goBack()
              : navigation.navigate({
                  name: "Perfil",
                  params: {
                    cliente: cliente,
                  },
                  merge: true,
                })
          }
        >
          Voltar
        </Button>
        <Button onPress={newCliente ? handleSubmit : handleUpdate}>
          Concluído
        </Button>
      </View>
      <Title>{newCliente ? "Cadastrar cliente" : "Editar cliente"}</Title>
      <Label>Nome completo</Label>
      <Input onChangeText={setNome} value={nome} />
      <Label>CPF</Label>
      <Input onChangeText={setCpf} value={cpf} />
      <Label>Nascimento</Label>
      <Input onChangeText={setNascimento} value={nascimento} />
      <Label>Endereço</Label>
      <Input onChangeText={setEndereco} value={endereco} />
      <Label>Celular</Label>
      <Input onChangeText={setPhone} value={phone} />
      <Label>E-mail</Label>
      <Input onChangeText={setEmail} value={email} />
      <Label>Instagram</Label>
      <Input onChangeText={setInstagram} value={instagram} />
      {!newCliente && <Delete onPress={handleDelete}>Deletar cliente</Delete>}
    </Container>
  );
};

export default EditaCliente;
