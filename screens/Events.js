import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TabView, TabBar } from 'react-native-tab-view';
import { AppContext } from '../contexts/app-Context'
import useEventos from '../hooks/useEventos';
import FlatListMain from '../components/FlatListMain';
import HeaderMain from '../components/HeaderMain';
import Loading from '../components/Loading';
import MainViewTabs from '../components/MainViewTabs';
import Nothing from '../components/Nothing';



const Events = () => {

       const { state: { categorias, loading } } = useContext(AppContext);
       const { eventosRecreacion, eventosDeportes, otrosEventos } = useEventos();

       const [index, setIndex] = useState(0);
       const [routes] = useState([
              { key: '1', title: 'Recreacion' },
              { key: '2', title: 'Deportes' },
              { key: '3', title: 'Otros eventos' },
       ]);

       const renderScene = ({ route }) => {
              switch (route.key) {
                     case '1':
                            return eventosRecreacion.length === 0 ?
                                   <Nothing label="Estamos descargando la información," label1=" ¡Se Paciente!," label2=" no debería tardar mucho..." /> :
                                   <FlatListMain eventos={eventosRecreacion} />
                     case '2':
                            return eventosDeportes.length === 0 ?
                                   <Nothing label="No hay Eventos Programados en esta sección," label1=" Toca el Boton," label2=" para ver mas novedades." /> :
                                   <FlatListMain eventos={eventosDeportes} />
                     case '3':
                            return otrosEventos.length === 0 ?
                                   <Nothing label="No hay Eventos Programados en esta sección," label1=" Toca el Boton," label2=" para ver mas novedades." /> :
                                   <FlatListMain eventos={otrosEventos} />
                     default:
                            return null;
              }
       };

       const renderTabBar = props => (
              <TabBar
                     {...props}
                     indicatorStyle={styles.indicatorTabView}
                     style={styles.mainStyle}
                     renderLabel={({ route, focused }) => (
                            <Text style={{ color: focused ? '#5c3d90' : '#cecece', margin: 8, fontWeight: 'bold' }}>
                                   {route.title}
                            </Text>
                     )}
              />
       );

       return (
              <MainViewTabs>
                     <HeaderMain title='Eventos' />
                     {loading ? <Loading /> :
                            <TabView
                                   renderTabBar={renderTabBar}
                                   navigationState={{ index, routes }}
                                   renderScene={renderScene}
                                   onIndexChange={setIndex}
                            //initialLayout={{ width: layout.width }}
                            />
                     }

              </MainViewTabs>

       )
}

export default Events

const styles = StyleSheet.create({
       mainStyle: {
              backgroundColor: '#ffff'
       },
       indicatorTabView: {
              backgroundColor: '#5c3d90',
              height: 3
       }

})
