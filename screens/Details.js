import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Animated, Dimensions, ScrollView, StatusBar } from 'react-native';
import MainViewTabs from '../components/MainViewTabs';
//import { NavigationEvents, SafeAreaView } from 'react-navigation';
//import { StatusBar } from 'react-native';

import DateDetail from '../components/DateDetail';
import ButtonsDetail from '../components/ButtonsDetail';
import InfoDetails from '../components/InfoDetails';


const { height, width } = Dimensions.get('window');

const Evento = ({ route, navigation }) => {

       useEffect(() => {
              const unsubscribe = navigation.addListener('focus', () => {
                     Enter();
              });
              return unsubscribe;
       }, [navigation]);

       const evento = route.params?.evento ?? {};;
       const view1 = useRef(new Animated.Value(0)).current;
       const view2 = useRef(new Animated.Value(0)).current;
       const view3 = useRef(new Animated.Value(0)).current;
       const view4 = useRef(new Animated.Value(0)).current;
       const view4Translate = useRef(new Animated.Value(-600)).current;
       const view5Translate = useRef(new Animated.Value(600)).current;

       const Enter = () => {
              Animated.parallel([
                     Animated.sequence([
                            Animated.timing(view1,
                                   {
                                          toValue: 1,
                                          duration: 200,
                                          useNativeDriver: true,
                                   }
                            ),
                            Animated.timing(view2,
                                   {
                                          toValue: 1,
                                          duration: 200,
                                          useNativeDriver: true,

                                   }
                            ),
                            Animated.timing(view3,
                                   {
                                          toValue: 1,
                                          duration: 200,
                                          useNativeDriver: true,

                                   }
                            ),
                            Animated.timing(view4,
                                   {
                                          toValue: 1,
                                          duration: 200,
                                          useNativeDriver: true,

                                   }
                            )
                     ]),
                     Animated.timing(view4Translate,
                            {
                                   toValue: 0,
                                   duration: evento.ubicacion ? 800 : 600,
                                   useNativeDriver: true,

                            }
                     ),
                     Animated.timing(view5Translate,
                            {
                                   toValue: 0,
                                   duration: evento.ubicacion ? 800 : 600,
                                   useNativeDriver: true,

                            }
                     )
              ]).start();
       }

       return (
              <MainViewTabs >
                     <View style={{ flex: .9 }}>
                            <ImageBackground source={require('../assets/img/people-sports1.jpg')} style={styles.imageBackground} imageStyle={styles.image_Style}>

                                   <Animated.View style={[styles.bagImg, { opacity: view2 }]} >
                                          <DateDetail fecha={evento.fecha} fecha_fin={evento.fecha_fin} />
                                   </Animated.View>
                                   <Animated.View style={[styles.bagRol, { opacity: view2 }]} >
                                          <Text style={{ color: '#ffff' , fontWeight: 'bold' }}>ROL</Text>
                                          <Text style={{ color: '#ffff' , fontWeight: 'bold', textTransform: 'uppercase'}}>{evento.tipo}</Text>
                                   </Animated.View>

                            </ImageBackground>
                     </View>

                     <View style={styles.buttons}>
                            <Animated.View style={[styles.viewAnimatedButtons, { opacity: view1 }]}>
                                   <ButtonsDetail flag={1} evento={evento} />
                            </Animated.View>

                            <Animated.View style={[styles.viewAnimatedButtons, { opacity: view2 }]}>
                                   <ButtonsDetail flag={2} evento={evento} />
                            </Animated.View>

                            <Animated.View style={[styles.viewAnimatedButtons, { opacity: view3 }]}>
                                   <ButtonsDetail flag={3} evento={evento} />
                            </Animated.View>

                            {evento.ubicacion &&
                                   <Animated.View style={[styles.viewAnimatedButtons, { opacity: view4 }]}>
                                          <ButtonsDetail flag={4} evento={evento} />
                                   </Animated.View>
                            }
                     </View>

                     <View style={{ flex: 1.1 }}>
                            <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll_View}>
                                   <Text style={styles.nombre}>{evento.nombre}</Text>
                                   <Text style={[styles.subTitle, { marginBottom: 15 }]}>Instituto Distrital de Recreación y Deporte</Text>

                                   <Animated.View style={[styles.info, { borderLeftColor: '#5c3d90', backgroundColor: '#D2C6E7', transform: [{ translateX: view4Translate }] }]}>
                                          <Text style={styles.textInfo}>Información</Text>
                                          <InfoDetails flag={1} info={`${evento.localidad && evento.localidad} - ${evento.lugar && evento.lugar}`} />
                                          <InfoDetails flag={2} info={evento.hora && evento.hora} />
                                          <InfoDetails flag={3} info={evento.entrada && evento.entrada} />
                                          <View style={styles.viewLogo}>
                                                 <Image source={require('../assets/img/logoBogota.png')} style={styles.viewLogoImage} />
                                          </View>
                                   </Animated.View>

                                   <Animated.View style={[styles.info, { borderLeftColor: '#9BDAE8', backgroundColor: '#e9f7fa', transform: [{ translateX: view5Translate }] }]}>
                                          <Text style={styles.textDescription}>Descripción</Text>
                                          <View style={styles.viewDescription}>
                                                 <View style={{ width: '95%' }}>
                                                        <Text style={styles.textDescriptionInfo}>{evento.descripcion && evento.descripcion}</Text>
                                                 </View>
                                          </View>

                                          <Text style={styles.textDirigido}>Dirigido a:</Text>
                                          <View style={styles.viewPoblacion}>
                                                 <View style={{ width: '95%' }}>
                                                        <Text style={styles.textPoblacion}>{evento.tipo_poblacion && evento.tipo_poblacion}</Text>
                                                 </View>
                                          </View>

                                          <View style={styles.logoDescription}>
                                                 <Image source={require('../assets/img/logoBogota.png')} style={styles.imageLogoDescription} />
                                          </View>
                                   </Animated.View>

                            </ScrollView>
                     </View>
              </MainViewTabs>
       )
}

export default Evento;

const styles = StyleSheet.create({
       touchBack: {
              position: 'absolute',
              top: 30,
              left: 10,
              zIndex: 999
       },
       imageBack: {
              height: 25,
              width: 30
       },
       imageBackground: {
              flex: 1,
              resizeMode: 'cover',
              justifyContent: "center"
       },
       image_Style: {
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30
       },
       buttons: {
              height: 90,
              width: width * 0.9,
              marginLeft: width * 0.05,
              backgroundColor: '#ffffff',
              position: 'absolute',
              top: (height * 0.45) - 50,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              zIndex: 999,
       },
       viewAnimatedButtons: {
              width: '20%',
              height: 45,
       },
       scroll_View: {
              marginTop: 45,
              paddingTop: 10,
              width: '100%',
              marginLeft: width * 0.05,
              width: width * 0.9
       },
       nombre: {
              textTransform: 'capitalize',
              fontSize: 18,
              fontWeight: 'bold',
              color: '#5c3d90'

       },
       subTitle: {
              fontSize: 15,
              fontWeight: '500',
              color: '#ccccccee',
              textTransform: 'capitalize'
       },
       info: {
              minHeight: 150,
              width: '100%',
              marginBottom: 5,
              borderRadius: 10,
              borderLeftWidth: 4,
              marginBottom: 15,
              padding: 10
       },
       bagImg: {
              height: 55,
              width: 55,
              borderRadius: 5,
              backgroundColor: '#5214c49f',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 30,
              right: 15,
              zIndex: 999,

       },
       bagRol: {
              minHeight: 40,
              borderRadius: 5,
              backgroundColor: '#5214c49f',
              justifyContent: 'center',
              position: 'absolute',
              top: height * 0.3,
              left: 15,
              zIndex: 999,
              paddingHorizontal: 5
       },
       textInfo: {
              fontSize: 21,
              fontWeight: 'bold',
              color: '#5c3d90',
              marginBottom: 5
       },
       viewLogo: {
              height: 80,
              width: 100,
              position: 'absolute',
              bottom: 0,
              right: 0
       },
       viewLogoImage: {
              width: '100%',
              height: '100%'
       },
       textDescription: {
              fontSize: 16,
              fontWeight: 'bold',
              color: '#5c3d90'
       },
       viewDescription: {
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5
       },
       textDescriptionInfo: {
              color: '#5c3d90',
              fontSize: 14,
              textTransform: 'capitalize',
              textAlign: 'justify'
       },
       textDirigido: {
              fontSize: 16,
              fontWeight: 'bold',
              color: '#5c3d90',
              marginTop: 5
       },
       viewPoblacion: {
              flexDirection: 'row',
              alignItems: 'center'
       },
       textPoblacion: {
              color: '#5c3d90',
              fontSize: 14,
              textTransform: 'capitalize'
       },
       logoDescription: {
              height: 80,
              width: 100,
              position: 'absolute',
              bottom: 0,
              right: 0,
              opacity: .5
       },
       imageLogoDescription: {
              width: '100%',
              height: '100%',
              resizeMode: 'cover'
       }
})




// import React from 'react'
// import { StyleSheet, Text, View } from 'react-native'

// const Details = ({ route }) => {
//        const evento = route.params?.evento ?? {};;

//        return (
//               <View>
//                      <Text>{JSON.stringify(evento)}</Text>
//               </View>
//        )
// }

// export default Details

// const styles = StyleSheet.create({})
