/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Params {
  name: string;
}
interface Details {
  name: string;
  height: number;
  weight: number;
  types: [
    {
      type: {
        name: string;
      };
    },
  ];
}

const Details = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [details, setDetails] = useState<Details[]>([]);
  const routeParams = route.params as Params;

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  async function fetchPokemonDetails() {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${routeParams.name}/`)
      .then((res) => res.json())
      // eslint-disable-next-line no-shadow
      .then((details) => setDetails(details));
  }

  function handleNavigateBack() {
    navigation.goBack();
  }
  const nome = details.name;
  const altura = details.height;
  //async function tipo1(){ await(details.types[0].type.name)}
  //const tipo2 = details.types[1].type.name;

  return (
    <>
    <StatusBar barStyle="dark-content" />
    <ImageBackground source={require('../../assets/pokefundo.png')} 
            style={styles.container}
            imageStyle={{height:600,width:350}}>
    <View style={{flex: 1}}>
      <TouchableOpacity style={styles.backButton} onPress={handleNavigateBack}>
        <Icon name="chevron-left" size={20} color="#6C6C80" />
      </TouchableOpacity>
        <Text style={styles.buttontext}>Voltar</Text>
      <Image
        style={styles.image}
        source={{
          uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${details.name}.png`,
        }}
      />
      <Text style={styles.text}>Nome: {nome}</Text>
      <Text style={styles.text}>Altura: {details.height}</Text>
      <Text style={styles.text}>Peso: {details.weight}</Text>
      <Text style={styles.text}>Moves:</Text>
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
  buttontext: {
    position: 'absolute',
    marginTop: 4,
    marginLeft:24,
    color: '#6C6C80',
    fontSize: 16,
    fontFamily: 'Roboto',
    maxWidth: 260,
    lineHeight: 16,
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  backButton: {
    flex: 1,
    position: 'absolute',
  },
});

export default Details;
