/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  Alert,
  TextInput,
} from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import localStorage from '../../services/localstorage';
import { useNavigation } from '@react-navigation/native';


interface Pokemon {
  name: string;
  uri: string;
  evolucao: string;
}



const Register = () => {
  const [searchfeild, setSearchfeild] = useState('');
  const [searchfeild2, setSearchfeild2] = useState('');
  const [avatar,setAvatar] = useState('');
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedpokemon] = useState<string[]>(['']);
  const [selectedEvolution, setSelectedevolution] = useState<string[]>(['']);
  const navigation = useNavigation();
  
  useEffect(() => {
    fetchPokemons('https://pokeapi.co/api/v2/pokemon?limit=300');
  },[]);
  const fetchPokemons = (url:string) => {
    fetch(url)
    .then(response => response.json())
    .then(pokemons => setPokemons(pokemons.results));
  };

  function handleselectedPokemon(name: string){
    const alreadySelected = selectedPokemon.findIndex(item => item === name);

    if(alreadySelected >= 0){
        const filteredItems = selectedPokemon.filter(item => item !== name);
        setSelectedpokemon(filteredItems);
    }
    else{
        setSelectedpokemon([name]);
    }
  };

  function handleselectedEvolution(name: string){
    const alreadySelected = selectedEvolution.findIndex(item => item === name);

    if(alreadySelected >= 0){
      const filteredItems = selectedEvolution.filter(item => item !== name);
      setSelectedevolution(filteredItems);
    }
    else{
      setSelectedevolution([name]);
    }
  };
  async function handleSubmit(){
    let pokemao = {
      name : selectedPokemon[0],
      uri : avatar,
      evolucao: selectedEvolution[0],
    }
    localStorage.setItem(pokemao);
    Alert.alert(
      'Pokemón Capturado!',
      'Parabéns Mestre! Faça login nova mente para ter seu time atualizado!',
      [
        {text: 'OK', onPress: async () => {navigation.navigate('Home')}},
      ],
      { cancelable: false }
    )

  };

  function handleNavigateBack() {
    navigation.goBack();
  }

  function imagePickerCallback(data){
    if (data.didCancel){
      return;
    }
    if (data.error){
      return;
    }
    if (!data.uri){
      return;
    }
    setAvatar(data.uri);
  }
  return (pokemons[1] ?
    <>
      <StatusBar barStyle="dark-content" />
      <ImageBackground source={require('../../assets/pokefundo.png')} 
            style={styles.container}
            imageStyle={{height:600,width:350}}>
        <View>
        <TouchableOpacity style={styles.backButton} onPress={handleNavigateBack}>
          <Icon name="chevron-left" size={20} color="white" />
        </TouchableOpacity>
          <Text style={styles.title2}>REGISTRO DE POKÉMON</Text>
        <Image
          source={ avatar ? {uri:avatar} : require('../../assets/avatardefault.png')}
         style={styles.avatar}
         />
         <TouchableOpacity style={styles.button} onPress={() => ImagePicker.showImagePicker({}, imagePickerCallback )}>
           <Text style={styles.buttonText}>Escolha a foto</Text>
         </TouchableOpacity>
      
      <View style={styles.searchCont}>
          <Icon name="search" size={20} style={{position:'absolute', marginTop:10, marginLeft:10, color:'white'}} />
          <TextInput
            style={styles.searchfeild}
            placeholder="Quem é esse Pokémon???"
            placeholderTextColor='white'
            onChangeText={value => setSearchfeild(value)}
            value={searchfeild}
          />
          </View>
         <View>
       <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal:20}}>    
        {pokemons
          .filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchfeild.toLowerCase())
          )
          .map((pokemon, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                key={index}
                style={[styles.card, selectedPokemon.includes(pokemon.name) ? styles.selectedPoke : {}]}
                onPress={()=> handleselectedPokemon(pokemon.name,String(index + 1))}>
                <Text style={styles.buttonText}>{pokemon.name.toUpperCase()}</Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
      
        <View style={styles.searchCont}>
          <Icon name="search" size={20} style={{position:'absolute', marginTop:10, marginLeft:10, color:'white'}} />
          <TextInput
            style={styles.searchfeild}
            placeholder="Qual será sua evolução???"
            placeholderTextColor='white'
            onChangeText={value => setSearchfeild2(value)}
            value={searchfeild2}
          />
          </View>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal:20}}>    
        {pokemons
          .filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchfeild2.toLowerCase())
          )
          .map((pokemon, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                key={index*1000}
                style={[styles.card, selectedEvolution.includes(pokemon.name) ? styles.selectedPoke : {}]}
                onPress={()=> handleselectedEvolution(pokemon.name,String(index + 1))}>
                <Text style={styles.buttonText}>{pokemon.name.toUpperCase()}</Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
           
           <RectButton style={styles.button2} onPress={() => handleSubmit()}>
             <Icon name="check" size={20} />
           </RectButton>
         </View>
         </View>
         </ImageBackground>
    </>
    : <Text style={{flex:1,textAlign:'center',justifyContent:'center',alignItems:'center', marginTop:300, fontWeight: 'bold'}}>Carregando...</Text>
  );
};

const styles = StyleSheet.create({  
  container: {    
   display: 'flex',
   backgroundColor:'#C42A2A',    
  },  
  avatar: {
    marginTop:48,
    height: 200,
    width:200,
    marginLeft:88,    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#C2D9AD',
    borderRadius: 100,
    marginBottom: 16,  
      
   },
   searchCont: {
    display: 'flex',
    height:40,   
    left: '20%',    
    zIndex: 1,
   },  
   searchfeild: {    
   height: 40,    
   borderBottomWidth: 1,    
   borderBottomColor: 'white',    
   width: 250,
   textAlign:'center',
   color: 'white',
   },
  button: {
    backgroundColor: 'red',
    height: 60,
    width: 120,
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth:2,
    borderTopColor: '#ffdbdb',
    borderLeftColor: '#ffdbdb',
    borderBottomColor: 'gray',
    borderRightColor: 'gray',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:124,
    marginBottom:16,
  },
  button2: {
    backgroundColor: '#77ffa0',
    height: 60,
    width: 60,
    flexDirection: 'row',
    borderRadius: 30,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom:200,
    marginLeft:148,
  },
  input: {
    height: 40,
    width: 240,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    textAlign: 'center',
  },
  selectedPoke: {
    borderTopColor: 'white',
    borderLeftColor: 'white',
    borderWidth: 2,
    borderRadius:4,
    borderBottomColor: 'gray',
    borderRightColor: 'gray',
  },
  containerbg: {    
    display: 'flex',    
    flexDirection: 'row',    
    flexWrap: 'wrap',    
    justifyContent: 'center',
    backgroundColor: 'red',  
   },  
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:150,
  },
  card: {
   display: 'flex',    
   alignItems: 'center',    
   marginVertical: 10,
   marginHorizontal: 4,
   paddingHorizontal:4,  
  },  
  buttontext: {
    position: 'absolute',
    marginTop: 4,
    marginLeft:24,
    color: 'white',
    fontSize: 16,
    fontFamily: 'Roboto',
    maxWidth: 260,
    lineHeight: 16,
    paddingTop:10,
  },
  description: {
    color: '#ffd6d6',
    fontSize: 16,
    marginBottom: 16,
    fontFamily: 'Ubuntu Bold',
    maxWidth: 260,
    lineHeight: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textAlign:'center',

  },
  title: {
    color: '#ffd1d1',
    fontSize: 16,
    fontFamily: 'Ubuntu Bold',
    marginTop: 8,
    textAlign: 'center',
  },
  title2: {
    position: 'absolute',
    color: 'white',
    fontSize: 20,
    fontFamily: 'Ubuntu Bold',
    marginTop: 64,
    marginLeft:64,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 24,
    marginLeft:24,
    paddingTop:16,
   },
  });

export default Register;
