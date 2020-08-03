import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
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

const Details = (props: Details) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [details, setDetails] = useState<Details[]>([]);
  const routeParams = route.params as Params

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  async function fetchPokemonDetails() {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${routeParams.name}/`)
      .then((res) => res.json())
      .then((details) => setDetails(details));
  }

  function handleNavigateBack() {
    navigation.goBack();
  }
  //const nome = details.name;
  //const altura = details.height;
  //async function tipo1(){ await(details.types[0].type.name)}
  //const tipo2 = details.types[1].type.name;

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <TouchableOpacity onPress={handleNavigateBack}>
        <Icon name="chevron-left" size={20} color="#34cb79" />
      </TouchableOpacity>
      <Image
        style={styles.image}
        source={{
          uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${details.name}.png`,
        }}
      />
      <Text style={styles.text}>Nome: {details.name}</Text>
      <Text style={styles.text}>Altura: {details.height}</Text>
      <Text style={styles.text}>Peso: {details.weight}</Text>
      <Text style={styles.text}>Moves:</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 22,
    marginBottom: 15,
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Details;
