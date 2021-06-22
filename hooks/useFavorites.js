import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';


const useFavorites = () => {

       const getFavorites = async () => {
              try {
                     const favorites = await AsyncStorage.getItem('@favorites')
                     if (favorites) {
                            return JSON.parse(favorites)
                     } else {
                            return []
                     }
              } catch (error) {
                     return false
              }
       }


       const addFavorites = async (evento) => {
              try {
                     const arrayFavorites = await getFavorites();
                     const addNewFavorite = [...arrayFavorites, { ...evento }].sort((a, b) => moment(a.fecha) >= moment(b.fecha) ? 1 : -1);
                     await AsyncStorage.setItem('@favorites', JSON.stringify(addNewFavorite));
                     return true;
              } catch (error) {
                     return false;
              }

       }

       const removeFavorites = async (evento) => {
              try {
                     const arrayFavorites = await getFavorites();
                     const newFavorites = arrayFavorites.filter(e => e._id !== evento._id).sort((a, b) => moment(a.fecha) >= moment(b.fecha) ? 1 : -1);
                     await AsyncStorage.setItem('@favorites', JSON.stringify(newFavorites));
                     return false;
              } catch (error) {
                     return true;
              }

       }

       return {
              getFavorites,
              addFavorites,
              removeFavorites
       }
}

export default useFavorites


