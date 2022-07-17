import styled from 'styled-components/native'

export const Container = styled.ScrollView`
  padding: 0 20px;
  background: #FFFFFF;
  flex: 1;
`

export const View = styled.View`
  justify-content: space-between;
  flex-direction: row;
  padding-top: 25px;
`

export const Button = styled.Text`
  font-family: 'ReadexPro_400Regular';
  font-size: 14px;
  color: #3070EA;
`

export const Title = styled.Text`
  margin-top: 60px;
  margin-bottom: 12px;
  font-size: 19px;
  font-family: 'ReadexPro_700Bold';
`

export const List = styled.View`
  border-top-width: 1px;
  border-top-color: #C1C1C1;
`

export const Item = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #C1C1C1;
  padding: 13px 0;
`

export const Text = styled.Text`
  font-size: 18px;
  line-height: 23px;
  font-family: 'ReadexPro_400Regular';
  margin-top: 5px;
  margin-bottom: 5px;
`