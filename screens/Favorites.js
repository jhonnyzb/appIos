import React, { useEffect, useState } from 'react'
import useFavorites from '../hooks/useFavorites'
import FlatListMain from '../components/FlatListMain'
import HeaderMain from '../components/HeaderMain'
import MainViewTabs from '../components/MainViewTabs'
import Nothing from '../components/Nothing'

const Favorites = ({ navigation }) => {

       const { getFavorites } = useFavorites();
       const [events, setEvents] = useState([])

       useEffect(() => {
              const unsubscribe = navigation.addListener('focus', () => {
                     getFavorites_();
              });
              return unsubscribe;
       }, [navigation]);


       const getFavorites_ = async () => {
              const eventsFavorites = await getFavorites();
              setEvents(eventsFavorites);
       }


       return (
              <MainViewTabs>
                     <HeaderMain title='Favoritos' />
                     {
                            events.length === 0 ?
                                   <Nothing label="No tienes Eventos favoritos agregados," label1=" Toca el Boton," label2=" para ver mas novedades en nuestra pagina web." /> :
                                   <FlatListMain eventos={events} />
                     }
              </MainViewTabs>
       )
}

export default Favorites


