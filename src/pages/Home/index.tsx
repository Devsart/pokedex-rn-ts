import React, { useState } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  ImageBackground,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import { TextInput, RectButton, BaseButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'


const Home = () => {

const [name, setName] = useState('');
const [password, setPassword] = useState('');
const navigation = useNavigation();
function handleNatigateToPokedex(){
  navigation.navigate('Pokedex',{
    name
  })
}

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView style={{flex:1}} behavior ={Platform.OS=== 'ios' ? "padding" : undefined}>
            <ImageBackground source={require('../../assets/pokebackground.png')} 
            style={styles.container}
            imageStyle={{height:700,width:375}}>
            <View style={styles.container}>
              <Text style={styles.title}>{`Bem-vindo,\nMestre Pokémon!`}</Text>
            </View>
            <View style={styles.container}>
              <TextInput 
              style={styles.input} 
              returnKeyType='next' 
              placeholder="Insira seu nome" 
              value={name} 
              autoCorrect={false} 
              onChangeText={setName} 
              
              />
              <TextInput 
              style={styles.input}
              textContentType="password" 
              placeholder="Insira sua senha" 
              value={password} 
              autoCorrect={false}
              keyboardType='numeric' 
              secureTextEntry 
              onChangeText={setPassword}  />
            </View>
            <View style={{flex:1, justifyContent:'center', paddingLeft:64, flexDirection:'column'}}>
            <RectButton style={styles.button} onPress={handleNatigateToPokedex}>
              <View style={styles.buttonIcon}>
                <Image source={require('../../assets/pokego.png')} 
                />
              </View>
              <Text style={styles.buttonText}>{`Acesse sua\n  Pokedéx`}</Text>
            </RectButton>
            </View>
          </ImageBackground>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    paddingTop: 90,
    color: '#322153',
    fontSize: 24,
    fontFamily: 'Ubuntu Bold',
    maxWidth: 260,
    marginTop: 64,
    textAlign: "center",
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#FB4E4E',
    height: 60,
    width: 160,
    flexDirection: 'row',
    borderRadius: 30,
    overflow: 'hidden',
    alignItems: 'center',
  },

  buttonIcon: {
    height: 60,
    width: 60,
    borderRadius:30,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    color: '#FFF',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: "bold",
  }
});

export default Home;
