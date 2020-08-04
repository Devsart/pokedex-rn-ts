import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import { RectButton, TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import ImagePicker from 'react-native-image-picker';




const Register = () => {
  const [avatar,setAvatar] = useState('');

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
    setAvatar(data);
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <View  style={styles.container}>
        <Image
          source={ avatar? {uri:avatar.uri} : require('../../assets/avatardefault.png')}
         style={styles.avatar}
         />
         <TouchableOpacity style={styles.button} onPress={() => ImagePicker.showImagePicker({}, imagePickerCallback )}>
           <Text style={styles.buttonText}>Escolha a foto</Text>
         </TouchableOpacity>
         <View style={styles.container}>
           <Text style={styles.title}>Nome do seu Pokémon:</Text>
           <TextInput style={styles.input} />
           <Text style={styles.title}>Altura:</Text>
           <TextInput style={styles.input} />
           <Text style={styles.title}>Peso:</Text>
           <TextInput style={styles.input} />
           <Text style={styles.title}>Tipo 1:</Text>
           <TextInput style={styles.input} />
           <Text style={styles.title}>Tipo 2:</Text>
           <TextInput style={styles.input} />
           <Text style={styles.title}>Evolução de:</Text>
           <TextInput style={styles.input} />
           <RectButton style={styles.button2}>
             <Text style={styles.buttonText}>Criar Pokémon!</Text>
           </RectButton>
         </View>
         </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({  
  container: {    
   display: 'flex',    
   justifyContent: 'center',
   alignItems: 'center'  
  },
  avatar: {
    marginTop:100,
    height: 200,
    width:200,    
    justifyContent: 'center'
      
   },
  button: {
    backgroundColor: 'white',
    height: 60,
    width: 120,
    flexDirection: 'row',
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button2: {
    backgroundColor: '#77ffa0',
    height: 60,
    width: 120,
    flexDirection: 'row',
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom:50,
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
    color: 'black',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 'bold'

  },
  selectedPoke: {
    borderColor: 'red',
    borderWidth: 2,
  },
  title: {
    color: '#322153',
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
