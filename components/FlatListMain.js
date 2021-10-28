import React, { useRef } from 'react';
import { StyleSheet, Text, View, Animated, Image, Dimensions, StatusBar, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { getDistance } from '../util';
import DateEvents from './DateEvents';



//const { width, height } = Dimensions.get('screen');
const SPACING = 20;
const SIZE = 100;
const ITEM_SIZE = SIZE + SPACING * 3


const FlatListMain = ({ eventos }) => {

       const scrollY = useRef(new Animated.Value(0)).current;
       const navigation = useNavigation();

       const cercano = ({ ubicacion }) => {
              if (ubicacion) {
                     let distance = getDistance(parseFloat(ubicacion.lat), parseFloat(ubicacion.lon), parseFloat(location.coords.latitude), parseFloat(location.coords.longitude))
                     return (
                            <Text numberO fLines={1} style={styles.itemCercano}>
                                   A ({distance.toFixed(2)} Km) de tu ubicación
                            </Text>
                     )
              }

       }

       return (
              <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                     <Animated.FlatList
                            data={eventos}
                            keyExtractor={item => item._id}
                            scrollEventThrottle={16}
                            onScroll={Animated.event(
                                   [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                                   { useNativeDriver: true }

                            )}
                            contentContainerStyle={{
                                   padding: SPACING,
                                   paddingTop: StatusBar.currentHeight || 42
                            }}
                            renderItem={({ item, index }) => {

                                   const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)]
                                   const opacityInputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)]

                                   const scale = scrollY.interpolate({
                                          inputRange,
                                          outputRange: [1, 1, 1, 0]
                                   })

                                   const opacity = scrollY.interpolate({
                                          inputRange: opacityInputRange,
                                          outputRange: [1, 1, 1, 0]
                                   })

                                   return <Animated.View style={{
                                          padding: SPACING, marginBottom: SPACING, borderRadius: 5, backgroundColor: index % 2 === 0 ? '#D2C6E7' : '#e9f7fa', transform: [{ scale }],
                                          opacity,
                                          borderLeftWidth: 4,
                                          borderLeftColor: index % 2 === 0 ? '#5c3d90' : '#9BDAE8'

                                   }}>
                                          <Image style={styles.background} source={require('../assets/img/logoBogota.png')} />
                                          <TouchableOpacity onPress={() =>navigation.navigate('Details', { evento: item })} style={{ height: SIZE }} >
                                                 <View>
                                                        <Text numberOfLines={1} style={styles.itemTitle}>{item.nombre}</Text>
                                                 </View>
                                                 <View style={{ marginTop: 6 }}>
                                                        <Text
                                                               numberOfLines={1}
                                                               style={styles.itemDirection}>
                                                               {
                                                                      ('localidad' in item && item.localidad ? item.localidad + ' - ' : '') + item.lugar
                                                               }
                                                        </Text>
                                                 </View>
                                                 <View style={{ marginTop: 6, flexDirection: 'row', height: 35, alignItems: 'center' }}>
                                                        <Text
                                                               numberOfLines={2}
                                                               style={[styles.itemDescription, { width: '90%' }]}>
                                                               {
                                                                      item.resumen
                                                               }
                                                        </Text>
                                                        {item.soloFavoritos &&
                                                               <Notificacion fecha={item.fecha} nombre={item.nombre} notify={item.notify} index={index} idNotification={item.idNotification} checkFavorites={checkFavorites} />

                                                        }
                                                 </View>
                                                 <View style={{ marginTop: 6 }}>
                                                        {/* {cercano(item)} */}
                                                 </View>
                                          </TouchableOpacity>
                                          <DateEvents fecha_inicio={item.fecha} fecha_fin={item.fecha_fin ? item.fecha_fin : item.fecha} />
                                   </Animated.View>
                            }}
                     />


              </View>
       )
}

export default FlatListMain

const styles = StyleSheet.create({
       background: {
              position: 'absolute',
              top: SPACING,
              left: SPACING,
              width: '100%',
              height: '100%',
              opacity: 0.15,
       },
       itemTitle: {
              fontSize: 18,
              fontWeight: 'bold',
              width: '90%',
              textTransform: 'capitalize',

       },
       itemDirection: {
              fontSize: 13,
              fontWeight: '900',
              color: '#666'
       },
       itemDescription: {
              fontSize: 14,
              fontWeight: '900',
              color: '#333',
              textTransform: 'capitalize',
       },
       itemCercano: {
              width: '60%',
              backgroundColor: '#5b3d90',
              color: '#ffffff',
              fontSize: 13,
              paddingLeft: 4,
              paddingVertical: 2,

       },
})
