import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import { TextInput, TouchableOpacity, RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'


const Home = () => {

  const [name, setName] = useState('');
const navigation = useNavigation();
function handleNatigateToPokedex(){
  navigation.navigate('Pokedex',{
    name
  })
}

  return (
    <>
      <StatusBar barStyle="dark-content" />
        
            <ImageBackground source={require('../../assets/pokebackground.png')} 
            style={styles.container}
            imageStyle={{height:368,width:274}}>
            <View style={styles.container}>
              <Text style={styles.title}>{`Bem-vindo,\nMestre Pokémon!`}</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.description}>Name:</Text>
              <TextInput style={styles.input} placeholder="Insira seu nome" value={name} autoCorrect={false} onChangeText={setName} />
            </View>
            <View style={styles.container}>
            <RectButton style={styles.button} onPress={handleNatigateToPokedex}>
              <View style={styles.buttonIcon}>
              </View>
              <Text style={styles.buttonText}>Temos que pegar!</Text>
            </RectButton>
            </View>
          </ImageBackground>
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
    paddingTop: 50,
    color: '#322153',
    fontSize: 24,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
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
    width: 230,
    flexDirection: 'row',
    borderRadius: 30,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'center',
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
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
    fontWeight: "bold",
  }
});

export default Home;
