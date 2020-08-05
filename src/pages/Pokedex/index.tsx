import React, {useState, useEffect} from 'react';
import { ImageBackground ,StatusBar ,SafeAreaView, ActivityIndicator ,View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RectButton } from 'react-native-gesture-handler';
import localStorage from '../../services/localstorage';

interface Params {
  name: string;
}
interface Pokemon {
  name: string;
  evolucao: string;
  uri: string;
}

const Pokedex = (props: Pokemon) => {
  const route = useRoute();
  const routeParams = route.params as Params;
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchfeild, setSearchfeild] = useState('');
  const navigation = useNavigation();

useEffect(() => {
 fetchPokemons();
},[]);
const fetchPokemons = () => {
  localStorage.getAllItems()
  .then((poke) => setPokemons(poke))
};

function handleselectedPokemon(name:string,uri:string,evolucao:string){
  navigation.navigate('Details',{
    name,
    uri,
    evolucao,
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
    <View style={styles.container}>
      <Text style={styles.title}>Seu time:</Text>
    </View>
    {pokemons[0]?
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      
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
                onPress={()=> handleselectedPokemon(pokemon.name,pokemon.uri,pokemon.evolucao)}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: pokemon.uri,
                  }}
                />
                <Text style={styles.description}>{pokemon.name.toUpperCase()}</Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </ScrollView>
: <Text style={styles.title2}>{`Você ainda não possui\nnenhum Pokémon.\n\nClique no botão vermelho para capturar!`}</Text>}
    <RectButton style={styles.button} onPress={handleRegister}>
      <Icon name="plus" size={40} color="white" />
    </RectButton>
  </SafeAreaView>
  </ImageBackground>
  </>
)
};

const styles = StyleSheet.create({  
  container: {    
   display: 'flex',    
   flexDirection: 'row',    
   flexWrap: 'wrap',    
   justifyContent: 'center',
  },
  avatar: {
    height: 100,
    width:100,
    backgroundColor:'#C2D9AD',
    borderRadius: 50,
    marginBottom: 16,
    marginHorizontal:20,
    marginTop: 20,
      
      
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
   marginTop:40,
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
  title2: {
    color: 'gray',
    fontSize: 24,
    fontFamily: 'Ubuntu Bold',
    marginTop: 80,
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
