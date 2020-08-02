import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

interface Params {
  name: string,
}

const Pokedex = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as Params;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>{`Olá, ${routeParams.name}! Essa é a sua Pokedex`}</Text>
      </View>
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
    fontFamily: 'Ubuntu Bold',
    maxWidth: 260,
    marginTop: 64,
    textAlign: "center",
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto',
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
    marginTop:60,
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
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: "bold",
  }
});

export default Pokedex;