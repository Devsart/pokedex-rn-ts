import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Pokemon {
  name: string;
}

const Pokedex = (props: Pokemon) => {
const [pokemons, setPokemons] = useState<Pokemon[]>([]);
const [searchfeild, setSearchfeild] = useState('');
const navigation = useNavigation();

useEffect(() => {
 fetchPokemons('https://pokeapi.co/api/v2/pokemon?limit=150');
},[]);
const fetchPokemons = (url:string) => {
fetch(url)
.then(response => response.json())
.then(pokemons => setPokemons(pokemons.results));
};

function handleNavigateToDetails(){
  navigation.navigate('Details', {
    pokemon:,
  })
}
  

return (
  <View>
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
                onPress={handleNavigateToDetails}>
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
  </View>
);
};
const styles = StyleSheet.create({  
  container: {
   backgroundColor:'#FB4E4E',    
   display: 'flex',    
   flexDirection: 'row',    
   flexWrap: 'wrap',    
   justifyContent: 'center',    
   marginTop: 30,  
  },  
  card: {
   backgroundColor: '#ededed',    
   display: 'flex',    
   alignItems: 'center',    
   borderWidth: 2,
   borderRadius:10,   
   borderColor: '#ff6e72',       
   marginVertical: 10,
   marginHorizontal: 4,  
  },  
  searchCont: {
   display: 'flex',    
   position: 'relative',    
   marginBottom: 5,    
   left: '20%',    
   zIndex: 1, 
   marginTop:16,     
  },  
  searchfeild: {    
  height: 40,    
  borderWidth: 1,    
  borderColor: '#000',    
  textAlign: 'center',    
  width: 250,    
  borderRadius: 50,
  marginTop:50,  
  },
  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginBottom: 16,
    fontFamily: 'Ubuntu Bold',
    maxWidth: 260,
    lineHeight: 16,
  },
  });

export default Pokedex;