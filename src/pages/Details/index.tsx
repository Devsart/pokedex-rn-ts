import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RectButton } from 'react-native-gesture-handler';
import localStorage from '../../services/localstorage';

interface Params {
  name: string;
  uri:string;
  evolucao:string;
}
interface Details {
  name: string;
  height: number;
  weight: number;
  type1: string
}

const Details = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [name,setName] = useState('')
  const [type1,setType1] = useState('');
  const [type2,setType2] = useState('');
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [evolution, setEvolution] = useState('');
  const routeParams = route.params as Params;
  useEffect(() => {
    fetchPokemonTypes();
    fetchPokemonDetails();
  }, []);

  async function fetchPokemonDetails() {
    await fetch(`https://pokeapi.co/api/v2/pokemon-species/${routeParams.name}/`)
      .then((res) => res.json())
      .then(function(evolution){
        setEvolution(
          evolution.evolves_from_species ? 
          evolution.evolves_from_species.name.toUpperCase() : 
          'NENHUM' );
        
        });
 }
 async function fetchPokemonTypes() {
  await fetch(`https://pokeapi.co/api/v2/pokemon/${routeParams.name}/`)
    .then((res) => res.json())
    .then(function(details){
      setName(details.name.toUpperCase());
      setType1(details.types[0].type.name.toUpperCase());
      setType2(details.types[1] ? details.types[1].type.name.toUpperCase() : 'NENHUM');
      setWeight((details.weight) / 10);
      setHeight((details.height) / 10);
    });
};

  function handleNavigateBack() {
    navigation.goBack();
  }

  async function handleRemove(){
    Alert.alert(
      'Tem certeza que deseja remover este pokémon?',
      '',
      [
        {text: 'Cancelar.', onPress: async () => {
            console.log('Cancelado.')
        }},
        {text: 'De Acordo.', onPress: async () => {
          localStorage.deleteItem(routeParams.name);
          navigation.navigate('Home');
        }},
      ],
      { cancelable: true }
    )

  };

  return (
    <>
    <StatusBar barStyle="dark-content" />
    <ImageBackground source={require('../../assets/pokefundo.png')} 
            style={styles.container}
            imageStyle={{height:600,width:350}}>
    <View style={{flex: 1}}>
      <TouchableOpacity style={styles.backButton} onPress={handleNavigateBack}>
        <Icon name="chevron-left" size={20} color="white" />
      </TouchableOpacity>
        <Text style={styles.buttontext}>Voltar</Text>
      <Image
        style={styles.imagecontainer}
        source={{
          uri: routeParams.uri,
        }}
      />
      <View style={styles.containercard}>
      <Text style={styles.text}>NOME: {name}</Text>
      <Text style={styles.text}>ALTURA: {height} M </Text>
      <Text style={styles.text}>PESO: {weight} KG </Text>
      <Text style={styles.text}>TIPO 1: {type1} </Text>
      <Text style={styles.text}>TIPO 2: {type2} </Text>
      <Text style={styles.text}>EVOLUÇÃO DE: {evolution}</Text>
      <Text style={styles.text}>EVOLUIRÁ PARA: {routeParams.evolucao.toUpperCase()}</Text>
      </View>
      <RectButton style={styles.button} onPress={handleRemove}>
        <Text style={styles.text}>Remover do meu time</Text>
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
    backgroundColor:'#C42A2A',
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    color: '#6C6C80',
    fontSize: 16,
    marginBottom: 16,
    fontFamily: 'Ubuntu Bold',
    maxWidth: 260,
    lineHeight: 16,
  },
  containercard: {
    backgroundColor: '#ededed',    
    display: 'flex',    
    alignItems: 'center',    
    borderWidth: 2,
    borderRadius:10,   
    borderTopColor: 'gray',
    borderLeftColor: 'gray',
    borderBottomColor: 'white',
    borderRightColor: 'white',       
    marginVertical: 10,
    marginHorizontal: 4,
    paddingTop:10,  
   },
   imagecontainer: {
    width: 250,
    height: 250,
    backgroundColor: '#C2D9AD',    
    display: 'flex',    
    alignItems: 'center',    
    borderWidth: 2,
    borderRadius:10,       
    marginTop: 80,
    marginHorizontal: 4,
    marginLeft:24,
    borderColor: '#b22929',  
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
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  backButton: {
    flex: 1,
    position: 'absolute',
    paddingTop: 10,
  },
  button: {
    backgroundColor: '#ededed',    
    display: 'flex',    
    alignItems: 'center',    
    borderWidth: 2,
    borderRadius:10,   
    borderTopColor: 'gray',
    borderLeftColor: 'gray',
    borderBottomColor: 'white',
    borderRightColor: 'white',       
    marginVertical: 10,
    marginHorizontal: 4,
    marginBottom:30,
    paddingTop:10,
   },
});

export default Details;
