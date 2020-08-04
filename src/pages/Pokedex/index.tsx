/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import { ImageBackground ,StatusBar ,SafeAreaView, ActivityIndicator ,View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Details from '../Details';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RectButton } from 'react-native-gesture-handler';

interface Params {
  name: string;
}
interface Pokemon {
  name: string;
  id: number;
}

const Pokedex = (props: Pokemon) => {
  const route = useRoute();
  const routeParams = route.params as Params;
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchfeild, setSearchfeild] = useState('');
  const navigation = useNavigation();
  const [pokeid,setPokeid] = useState('0');
  const [details, setDetails] = useState([]); 

useEffect(() => {
 fetchPokemons('https://pokeapi.co/api/v2/pokemon?limit=20');
},[]);
const fetchPokemons = (url:string) => {
fetch(url)
.then(response => response.json())
.then(pokemons => setPokemons(pokemons.results));
};

function handleselectedPokemon(name:string,id:string){
  navigation.navigate('Details',{
    name,
    id,
  });
}
function handleRegister(){
  navigation.navigate('Register');
}
function handleNavigateBack() {
  navigation.goBack();
}

return (
  <>
  <StatusBar barStyle="dark-content" />
  <ImageBackground source={require('../../assets/pokefundo.png')} 
            style={styles.container}
            imageStyle={{height:600,width:350}}>
  <SafeAreaView>
      <TouchableOpacity style={styles.backButton} onPress={handleNavigateBack}>
        <Icon name="chevron-left" size={20} color="#6C6C80" />
      </TouchableOpacity>
      <Text style={styles.title}>Olá, {routeParams.name}</Text>
    <View style={styles.searchCont}>
      <Icon name="search" size={20} style={{position:'absolute', marginTop:15, marginLeft:10, color:'#6C6C80'}} />
      <TextInput
        style={styles.searchfeild}
        placeholder="Procurar Pokemons"
        onChangeText={value => setSearchfeild(value)}
        value={searchfeild}
      />
    </View>
    <ScrollView>
      
      <View style={styles.container}>
        {pokemons
          .filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchfeild.toLowerCase())
          )
          .map((pokemon, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                key={index}
                style={styles.card}
                onPress={()=> handleselectedPokemon(pokemon.name,String(index + 1))}>
                <Image
                  style={{width: 150, height: 150}}
                  source={{
                    uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${
                      pokemon.name
                    }.png`,
                  }}
                />
                <Text style={styles.description}>{pokemon.name.toUpperCase()}</Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </ScrollView>
    <View style={styles.indicator}>
        <ActivityIndicator size="large" color="#E63F34" />
    </View>
    <RectButton style={styles.button} onPress={handleRegister}>
      <Icon name="plus" size={40} color="white" />
    </RectButton>
  </SafeAreaView>
  </ImageBackground>
  </>
  //:
  //(
  //  <View style={styles.indicator}>
  //    <ActivityIndicator size="large" color="#E63F34" />
  //  </View>
  //)
)
};
const styles = StyleSheet.create({  
  container: {    
   display: 'flex',    
   flexDirection: 'row',    
   flexWrap: 'wrap',    
   justifyContent: 'center',  
  },
  button: {
    position:'absolute',
    backgroundColor: '#FB4E4E',
    height: 60,
    width: 60,
    flexDirection: 'row',
    borderRadius: 30,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'flex-end',
    top: 600,
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
   backgroundColor: '#ededed',    
   display: 'flex',    
   alignItems: 'center',    
   borderWidth: 2,
   borderRadius:10,   
   borderColor: '#322153',       
   marginVertical: 10,
   marginHorizontal: 4,  
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
    color: '#6C6C80',
    fontSize: 16,
    marginBottom: 16,
    fontFamily: 'Ubuntu Bold',
    maxWidth: 260,
    lineHeight: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Ubuntu Bold',
  },
  selectedPoke: {
    borderColor: 'red',
    borderWidth: 2,
  },
  title: {
    color: '#322153',
    fontSize: 24,
    fontFamily: 'Ubuntu Bold',
    marginTop: 40,
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

export default Pokedex;
