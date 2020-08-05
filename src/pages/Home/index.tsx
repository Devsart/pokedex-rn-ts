/* eslint-disable prettier/prettier */
import React, { useRef } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Image,
} from 'react-native';
import { TextInput, RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import AsyncStorage  from '@react-native-community/async-storage'

const Home = () => {

const name = useRef(null);
const password = useRef(null);
const navigation = useNavigation();
const FormSchema = Yup.object().shape({
    name: Yup.string().required('Nome é Obrigatório'),
    password: Yup.string()
    .required('Senha é Obrigatório')
    .min(6, 'Sua senha deve conter pelo menos 6 caracteres')
})



  return (
    <>
      <Formik
      initialValues={{
        name: '',
        password: ''
      }}
      onSubmit = {function(values){
        AsyncStorage.multiSet([['@myUserKey',values.name],['@myUserPass',values.password]]);
        navigation.navigate('Pokedex',{
        name: values.name,
      });
    }
  }
      validationSchema={FormSchema}>
      {({values,handleChange,handleSubmit,errors, touched, setFieldTouched}) =>
      <KeyboardAvoidingView style={{flex:1}} behavior ={Platform.OS=== 'ios' ? "padding" : undefined}>
            <ImageBackground source={require('../../assets/pokebackground.png')} 
            style={styles.container}
            imageStyle={{height:700,width:375}}>
            <View>
              <Text style={styles.title}>{`Bem-vindo,\nMestre Pokémon!`}</Text>
            </View>
            <View>
              {errors.name && touched.name && <Text style={{color:'white'}}>{errors.name}</Text>}
              <TextInput 
              style={styles.input} 
              placeholder="Insira seu nome"
              ref={name} 
              value={values.name} 
              autoCorrect={false} 
              onChangeText={handleChange('name')} 
              onBlur={() => setFieldTouched('name',true)}
              />
              {errors.password && touched.password && <Text style={{color:'white'}}>{errors.password}</Text>}
              <TextInput 
              style={styles.input}
              textContentType="password" 
              placeholder="Insira sua senha"
              ref={password} 
              value={values.password} 
              autoCorrect={false}
              keyboardType='default' 
              secureTextEntry
              onBlur={() => setFieldTouched('password',true)} 
              onChangeText={handleChange('password')}  />
              
            </View>
            <View style={{flex:1, alignItems:'center'}}>
            <RectButton style={styles.button} onPress={handleSubmit}>
              <View style={styles.buttonIcon}>
                <Image source={require('../../assets/pokego.png')} 
                />
              </View>
              <Text style={styles.buttonText}>{`Acesse sua\n  Pokedéx`}</Text>
            </RectButton>
            </View>
          </ImageBackground>
      </KeyboardAvoidingView>
}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
       backgroundColor:'#C42A2A', 
    
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    paddingTop: 90,
    color: 'white',
    fontSize: 24,
    fontFamily: 'Ubuntu Bold',
    maxWidth: 260,
    marginTop: 24,
    textAlign: "center",
    marginLeft: 20,
    paddingBottom:40,
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
  },

  button: {
    backgroundColor: '#FB4E4E',
    height: 60,
    width: 160,
    flexDirection: 'row',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
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
    color: '#FFF',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: "bold",
  }
});

export default Home;
