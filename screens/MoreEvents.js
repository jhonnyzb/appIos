import React, { useContext, useState, useEffect, useRef } from 'react'
import { StyleSheet, Text } from 'react-native'
import FlatListMain from '../components/FlatListMain';
import HeaderMain from '../components/HeaderMain';
import Loading from '../components/Loading';
import MainViewTabs from '../components/MainViewTabs';
import Nothing from '../components/Nothing';
import { AppContext } from '../contexts/app-Context';
import useEventos from '../hooks/useEventos';
import { like } from '../util';

const MoreEvents = () => {

       const { state: { loading, eventos } } = useContext(AppContext);
       const { masEventos } = useEventos();

       const [moreEvents, setMoreEvents] = useState(masEventos)
       const [flagSeaM, setFlagSeaM] = useState(false)
       const label = useRef('Estamos descargando la información,').current
       const labelSe = useRef('No tenemos resultados para tu busqueda,').current
       const label1 = useRef(' ¡Se Paciente!,').current
       const label1Se = useRef(' Intenta nuevamente.').current
       const label2 = useRef(' no debería tardar mucho...').current
       const label2Se = useRef('').current

       useEffect(() => {
              setMoreEvents(masEventos);
       }, [eventos])

       const searchEvents = (text) => {
              const eventsFilter = masEventos.filter(evento => {
                     return like(evento, ['nombre', 'lugar', 'resumen', 'localidad'], text);
              });
              setMoreEvents(eventsFilter);
       }

       return (
              <MainViewTabs>
                     <HeaderMain title='Mas Eventos' search={true} searchEvents={searchEvents} setFlagSeaM={setFlagSeaM} />
                     {
                            loading ? <Loading /> :
                                   moreEvents.length === 0 ?
                                          <Nothing label={flagSeaM ? labelSe : label} label1={flagSeaM ? label1Se : label1} label2={flagSeaM ? label2Se : label2} /> :
                                          <FlatListMain eventos={moreEvents} />
                     }
              </MainViewTabs>
       )
}

export default MoreEvents

const styles = StyleSheet.create({})