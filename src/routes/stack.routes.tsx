import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { Perfil } from "../screens/Perfil";
import { Pedido } from "../screens/Pedido";
import { EditaCliente } from "../screens/EditaCliente";
import { EditaPedido } from "../screens/EditaPedido";

const { Screen, Navigator } = createNativeStackNavigator();
//Arquivo que configura as rotas das telas existentes
export const StackRoutes = () => {
  return (
    <Navigator>
      <Screen name="Home" component={Home} options={{headerShown: false}} />
      <Screen name="Perfil" component={Perfil}  options={{headerShown: false}} />
      <Screen name="Pedido" component={Pedido}  options={{headerShown: false}} />
      <Screen name="EditaCliente" component={EditaCliente}  options={{headerShown: false}} />
      <Screen name="EditaPedido" component={EditaPedido}  options={{headerShown: false}} />
    </Navigator>
  );
};
