// Permite compartilhar com a app todas as rotas disponíveis
//Criando um contexto de navegação
import { NavigationContainer } from '@react-navigation/native';

import { StackRoutes } from './stack.routes'
export const Routes = () => {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  )
}