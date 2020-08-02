import React, { useState, useEffect } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  ImageBackground,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import api from '../../services/api'

interface ID {
    id: number;
    }

const PokeCard = () => {
    const [pokeID,setPokeID] = useState<ID[]>([])
    const [data,setData] = useState()
    useEffect(()=>{
        api.get('pokemon').then(response => {
            setData(response.data);
        })
    },[])
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 32,
    },
    
    itemsContainer: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 32,
    },
  
    item: {
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#eee',
      height: 120,
      width: 120,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 16,
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'space-between',
      textAlign: 'center',
    },
  
    selectedItem: {
      borderColor: '#34CB79',
      borderWidth: 2,
    },
  
    itemTitle: {
      fontFamily: 'Roboto_400Regular',
      textAlign: 'center',
      fontSize: 13,
    },
  });



export default PokeCard;