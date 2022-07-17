import styled from 'styled-components/native'

export const Container = styled.ScrollView`
  background: #EFEFEF;
  padding: 0 20px;
`

export const View = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-end;
  padding-top: 25px;
`

export const Button = styled.Text`
  font-family: 'ReadexPro_400Regular';
  font-size: 14px;
  color: #3070EA;
`

export const Title = styled.Text`
  font-family: 'ReadexPro_400Regular';
  font-size: 19px;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
`

export const ListRequests = styled.FlatList``

export const Item = styled.TouchableOpacity`
  padding: 0 10px 20px 10px;
  border-radius: 8px;
  background: #FFFFFF;
  margin-bottom: 18px;
`

export const Label = styled.Text`
  font-family: 'ReadexPro_400Regular';
  font-size: 17px;
  line-height: 21px;
  padding-top: 12px;
`

export const Text = styled.Text`
  font-family: 'ReadexPro_400Regular';
  font-size: 16px;
  line-height: 20px;
  margin-top: 12px;
  color: #676C72;
`

export const Link = styled.Text`
  font-family: 'ReadexPro_400Regular';
  font-size: 16px;
  line-height: 20px;
  margin-top: 10px;
  color: #4A95ED;
`

export const Subtitle = styled.Text`
  font-family: 'ReadexPro_500Medium';
  font-size: 18px;
  line-height: 25px;
  margin-bottom: 10px;
  padding-top: 50px;
  color: #1A1A1A;
`

export const BtnAdd = styled.TouchableOpacity`
  width: 16px;
  height: 16px;
  background-size: contain;
`