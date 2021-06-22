import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet } from 'react-native'
import { LogBox } from 'react-native';
import FlatListMain from '../components/FlatListMain'
import HeaderMain from '../components/HeaderMain'
import MainViewTabs from '../components/MainViewTabs'
import Nothing from '../components/Nothing'
import useEventsCalendar from '../hooks/useEventsCalendar'
import { like } from '../util';

LogBox.ignoreLogs([
       'Non-serializable values were found in the navigation state',
]);

const EventsDay = ({ route }) => {
       const dateRoute = route.params?.date ?? {};
       const { eventsCalendar } = useEventsCalendar(dateRoute);
       const [eventsDay, setEventsDay] = useState([])
       const [flagSeaM, setFlagSeaM] = useState(false)

       const label = useRef('No hay Eventos Programados para este día,').current
       const labelSe = useRef('No tenemos resultados para tu busqueda,').current
       const label1 = useRef(' Toca el Boton,').current
       const label1Se = useRef(' Intenta nuevamente.').current
       const label2 = useRef(' para ver mas novedades en nuestra pagina web.').current
       const label2Se = useRef('').current

       useEffect(() => {
              setEventsDay(eventsCalendar)
       }, [eventsCalendar])


       const searchEvents = (text) => {
              const eventsFilter = eventsCalendar.filter(evento => {
                     return like(evento, ['nombre', 'lugar', 'resumen', 'localidad'], text);
              });
              setEventsDay(eventsFilter);
       }



       return (

              <MainViewTabs>
                     <HeaderMain title={"Eventos " + dateRoute.format('DD-MM-YYYY')} back={true} search={true} searchEvents={searchEvents} setFlagSeaM={setFlagSeaM} />
                     {eventsDay.length === 0 ?
                            <Nothing label={flagSeaM ? labelSe : label} label1={flagSeaM ? label1Se : label1} label2={flagSeaM ? label2Se : label2} /> :
                            <FlatListMain eventos={eventsDay} />}
              </MainViewTabs>
       )
}

export default EventsDay

const styles = StyleSheet.create({})
