/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-community/async-storage';

interface Pokemon {
    evolucao: string,
    name: string,
    uri: string,
}

class LocalStorage {
    
    async getItem(name: string): Promise<Pokemon> {
        return await AsyncStorage.getItem(`@myPokemons:${name}`)
        .then((json) => {
            return JSON.parse(json) as Pokemon;
        });
    }

    async setItem(pokemon: Pokemon): Promise<void> {
        return AsyncStorage.setItem(`@myPokemons:${pokemon.name}`, JSON.stringify(pokemon));
    }

    async deleteItem(name: string): Promise<void> {
        return AsyncStorage.removeItem(`@myPokemons:${name}`);
    }

    async getAllItems(): Promise<Pokemon[]> {
        return AsyncStorage.getAllKeys()
        .then((keys: string[]) => {
            const fetchKeys = keys.filter((k) => { return k.startsWith('@myPokemons:'); });
            return AsyncStorage.multiGet(fetchKeys);
        })
        .then((result) => {
            return result.map((r) => { return JSON.parse(r[1]) as Pokemon; });
        });
    }
};

const localStorage = new LocalStorage();
export default localStorage;