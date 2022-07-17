import styled from 'styled-components/native'

export const Container = styled.ScrollView`
  background: #EFEFEF;
  flex: 1;
  padding: 0 20px;
  position: relative;
`

export const BigView = styled.View`
  flex: 1;
  padding: 25px 0;
`

export const View = styled.View`
  padding-top: 25px;
  justify-content: space-between;
  flex-direction: row;
  align-items: baseline;
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
  margin-top: 55px;
  margin-bottom: 20px;
`

export const Label = styled.Text`
  font-family: 'ReadexPro_400Regular';
  font-size: 17px;
  line-height: 21px;
  margin-bottom: 7px;
`

export const Text = styled.Text`
  font-family: 'ReadexPro_400Regular';
  font-size: 16px;
  line-height: 20px;
  margin-top: 12px;
  color: #676C72;
`

export const Input = styled.TextInput`
  background: #F7F7F7;
  font-family: 'ReadexPro_300Light';
  font-size: 16px;
  line-height: 20px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-bottom: 35px;
  &:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
  }
`

export const Delete = styled.Text`
  font-family: 'ReadexPro_400Regular';
  font-size: 15px;
  color: #FF2929;
  text-decoration: underline;
  text-decoration-color: #FF2929;
  margin-top: 25px;
  padding-bottom: 25px;
`
