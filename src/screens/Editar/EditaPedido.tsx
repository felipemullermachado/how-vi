import React, { useEffect } from "react";
import {
  Container,
  View,
  Button,
  Title,
  Label,
  Input,
  Delete,
} from "./styles";
import uuid from "react-native-uuid";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

//Tela responsável para editar e cadastrar novos pedidos

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

export const EditaPedido = ({ route, navigation }) => {
  const [desenho, setDesenho] = React.useState("");
  const [tamanho, setTamanho] = React.useState("");
  const [local, setLocal] = React.useState("");
  const [preco, setPreco] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [agendado, setAgendado] = React.useState("");

  const { idCliente, pedido } = route.params;

  const { getItem, setItem } = useAsyncStorage("@tattoo:pedidos");

  //Para que apareça as informações do pedido que será editado nos seus devidos inputs
  useEffect(() => {
    if (pedido) {
      setDesenho(pedido.desenho);
      setTamanho(pedido.tamanho);
      setLocal(pedido.local);
      setPreco(pedido.preco);
      setStatus(pedido.status);
      setAgendado(pedido.agendado);
    }
  }, [pedido]);

  //Função que é disparada para atualizar os dados do pedido desejado
  const handleUpdate = async () => {
    const result = await getItem();
    let pedidos = [];
    if (result !== null) pedidos = JSON.parse(result);

    const atualizaPedido = pedidos.filter((item) => {
      if (item.id === pedido.id) {
        item.desenho = desenho;
        item.tamanho = tamanho;
        item.local = local;
        item.preco = preco;
        item.status = status.trim();
        item.agendado = agendado;
      }
      return item;
    });

    await setItem(JSON.stringify(atualizaPedido));
    navigation.navigate({
      name: "Perfil",
      params: { desenho: desenho, status: status, agendado: agendado },
      merge: true,
    });
  };

  //Função que serve para armazenar os dados de um novo pedido cadastrado
  //Para relacionar os pedidos com seu respectivo cliente, coloquei como um dos atributos cliente
  // o atributo cliente recebe como valor o id do cliente
  // assim é possível apresentar na tela de perfil, somente os pedidos do cliente selecionado pelo usuário
  const handleSubmit = async () => {
    try {
      const id = uuid.v4();
      const cliente = idCliente;
      const newData = {
        id,
        cliente,
        desenho,
        tamanho,
        local,
        preco,
        status: status.trim(),
        agendado,
      };

      const response = await getItem();
      const previousData = response ? JSON.parse(response) : [];

      const data = [...previousData, newData];

      //salva o item no storage local

      await setItem(JSON.stringify(data));
      navigation.navigate({
        name: "Perfil",
        params: { idCliente },
        merge: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  //Função que serve para deletar os dados de um pedido
  const handleDelete = async () => {
    const result = await getItem();
    let pedidos = [];
    if (result !== null) pedidos = JSON.parse(result);

    const newPedidos = pedidos.filter((item) => item.id !== pedido.id);
    await setItem(JSON.stringify(newPedidos));
    navigation.navigate({
      name: "Perfil",
      params: { idCliente },
      merge: true,
    });
  };

  return (
    <Container>
      <View>
        <Button onPress={() => navigation.goBack()}>Voltar</Button>
        <Button onPress={idCliente ? handleSubmit : handleUpdate}>
          Concluído
        </Button>
      </View>
      <Title>{idCliente ? "Cadastrar pedido" : "Editar Pedido"}</Title>
      <Label>Desenho</Label>
      <Input onChangeText={setDesenho} value={desenho} />
      <Label>Tamanho</Label>
      <Input onChangeText={setTamanho} value={tamanho} />
      <Label>Local no corpo</Label>
      <Input onChangeText={setLocal} value={local} />
      <Label>Valor (R$)</Label>
      <Input onChangeText={setPreco} value={preco} />
      <Label>Status</Label>
      <Input onChangeText={setStatus} value={status} />
      <Label>Agendada para</Label>
      <Input onChangeText={setAgendado} value={agendado} />
      {!idCliente && <Delete onPress={handleDelete}>Deletar pedido</Delete>}
    </Container>
  );
};

export default EditaPedido;
