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
} from 'react-native';
import { RectButton, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import localStorage from '../../services/localstorage';

interface Pokemon {
  name: string;
  uri: string;
  evolucao: string;
}



const Register = () => {
  
  const [avatar,setAvatar] = useState('');
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedpokemon] = useState<string[]>(['']);
  const [selectedEvolution, setSelectedevolution] = useState<string[]>(['']);
  useEffect(() => {
    fetchPokemons('https://pokeapi.co/api/v2/pokemon?limit=20');
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
  //async function handleSubmit(){
  //  var pokemao = new Pokemon({
  //    name : selectedPokemon[0],
  //    uri : avatar,
  //    evolucao: selectedEvolution[0],
  //  })
  //  await localStorage.setItem(pokemao);
//
  //  console.log(localStorage.getAllItems());
//
  //};
//
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
  return (
    <>
      <StatusBar barStyle="dark-content" />
        <View  style={styles.container}>
        <Image
          source={ avatar ? {uri:avatar} : require('../../assets/avatardefault.png')}
         style={styles.avatar}
         />
         <TouchableOpacity style={styles.button} onPress={() => ImagePicker.showImagePicker({}, imagePickerCallback )}>
           <Text style={styles.buttonText}>Escolha a foto</Text>
         </TouchableOpacity>
         <View style={styles.container}>
           <Text style={styles.title}>Quem é esse Pokémon??</Text>
       <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal:20}}>    
        {pokemons
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
      
           <Text style={styles.title}>Evoluirá para:</Text>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal:20}}>    
        {pokemons
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
    </>
  );
};

const styles = StyleSheet.create({  
  container: {    
   display: 'flex',
   backgroundColor:'#C42A2A',    
  },  
  avatar: {
    marginTop:100,
    height: 200,
    width:200,
    marginLeft:88,    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#C2D9AD',
    borderRadius: 100,
    marginBottom: 16,  
      
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
    marginBottom:70,
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
    borderColor: 'red',
    borderWidth: 2,
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
  searchCont: {
   display: 'flex',   
   marginBottom: 5,
   left: '20%',    
   zIndex: 1,
   paddingTop:5,
  },  
  searchfeild: {    
  height: 40,    
  borderWidth: 1,    
  borderColor: '#000',    
  textAlign: 'center',    
  width: 250,    
  borderRadius: 50,  
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
  selectedPoke: {
    borderColor: 'red',
    borderWidth: 2,
  },
  title: {
    color: '#ffd1d1',
    fontSize: 16,
    fontFamily: 'Ubuntu Bold',
    marginTop: 8,
    textAlign: 'center',
  },
  backButton: {
    flex: 1,
    marginTop: 32,
    marginLeft:24,
    paddingTop:16,
    position: 'absolute',
  },
  });

export default Register;
