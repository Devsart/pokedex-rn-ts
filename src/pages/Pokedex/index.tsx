import React, {useState, useEffect} from 'react';
import { SafeAreaView, ActivityIndicator ,View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Details from '../Details';
import api from '../../services/api';

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
 fetchPokemons('https://pokeapi.co/api/v2/pokemon?limit=500');
},[]);
const fetchPokemons = (url:string) => {
fetch(url)
.then(response => response.json())
.then(pokemons => setPokemons(pokemons.results));
};

function handleselectedPokemon(name:string){
  navigation.navigate('Details',{
    name
  })  
  //, {pokemon:,}
  
}
  

return (
  <SafeAreaView>
    <View>
      <Text style={styles.title}>Olá, {routeParams.name}</Text>
    </View>
    <View style={styles.searchCont}>
      <TextInput
        style={styles.searchfeild}
        placeholder="Search Pokemons"
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
                onPress={()=> handleselectedPokemon(pokemon.name)}>
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
  </SafeAreaView>
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
  selectedPoke: {
    borderColor: 'red',
    borderWidth: 2,
  },
  title: {
    color: '#322153',
    fontSize: 24,
    fontFamily: 'Ubuntu Bold',
    marginTop: 40,
    textAlign: "center",
  },
  });

export default Pokedex;