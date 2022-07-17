import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 25px 20px;
`

export const View = styled.View`
  justify-content: space-between;
  flex-direction: row;
  gap: 0 25px;
`

export const Btn = styled.TouchableOpacity`
  font-family: 'ReadexPro_400Regular';
  font-size: 14px;
  color: #3070EA;
`

export const Title = styled.Text`
  margin-top: 40px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 19px;
  font-family: 'ReadexPro_400Regular';
`

export const Input = styled.TextInput`
  background: #F7F7F7;
  font-family: 'ReadexPro_300Light';
  font-size: 16px;
  line-height: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #1A1A1A;
  margin-bottom: 50px;
  &:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
  }
`

export const List = styled.FlatList`
  border-top-width: 1px;
  border-top-color: #C1C1C1;
`

export const Item = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #C1C1C1;
  padding: 13px 0;
`

export const Text = styled.Text`
  font-size: 17px;
  line-height: 23px;
  font-family: 'ReadexPro_300Light';
`