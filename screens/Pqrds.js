import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Animated, TouchableOpacity, Linking } from 'react-native'
import LottieView from 'lottie-react-native'
import HeaderMain from '../components/HeaderMain'
import MainViewTabs from '../components/MainViewTabs'

const { width, height } = Dimensions.get('screen');
const link = 'https://idrd.gov.co/respuestas-a-peticionarios-anonimos';

const Pqrds = ({ navigation }) => {

       const view1 = useRef(new Animated.Value(0)).current;
       const view2 = useRef(new Animated.Value(-600)).current;
       const view3 = useRef(new Animated.Value(600)).current;

       useEffect(() => {
              const unsubscribe = navigation.addListener('focus', () => {
                     Enter();
              });
              return unsubscribe;
       }, [navigation]);

       useEffect(() => {
              const unsubscribeBlur = navigation.addListener('blur', () => {
                     view1.setValue(0);
                     view2.setValue(-600);
                     view3.setValue(600);
              });
              return unsubscribeBlur;
       }, [navigation]);


       const Enter = () => {

              Animated.parallel([
                     Animated.timing(view1, {
                            toValue: 1,
                            duration: 500,
                            useNativeDriver: true
                     }),
                     Animated.timing(view2, {
                            toValue: 0,
                            duration: 500,
                            useNativeDriver: true
                     }),
                     Animated.timing(view3, {
                            toValue: 0,
                            duration: 500,
                            useNativeDriver: true
                     })
              ]).start();
       }


       return (
              <MainViewTabs>
                     <HeaderMain title='PQRDS' />
                     <Animated.View style={[styles.mainImage, { opacity: view1 }]} >
                            <LottieView
                                   source={require('../assets/lottie/office.json')}
                                   autoPlay
                                   loop
                            />
                     </Animated.View>
                     <ScrollView style={styles.mainText} showsVerticalScrollIndicator={false}>
                            <Animated.View style={[styles.title, { transform: [{ translateX: view2 }] }]}>
                                   <Text style={styles.textTitle}>Peticiones, Quejas, Reclamos, Denuncias y Solicitudes.</Text>
                            </Animated.View>
                            <Animated.View style={[styles.title, { transform: [{ translateX: view3 }] }]}>
                                   <Text style={styles.textPqrds}>Tenga en cuenta que la PQRDS debe contener datos de contacto
                                          como nombre, dirección y teléfono, de lo contrario la PQRDS será
                                          recibida como anónima y se le dará dicho tratamiento.
                                   </Text>
                            </Animated.View>
                            <Animated.View style={[styles.pqrdsAnonimas, { transform: [{ translateX: view2 }] }]}>
                                   <TouchableOpacity style={styles.touchAnonimas} onPress={() => Linking.openURL(link)}>
                                          <View style={styles.touchAnonimasView}>
                                                 <Text style={{ fontSize: 18 }} >Para conocer las respuestas a PQRDS anónimas{' '}
                                                        <Text style={{ color: '#5b3d90', fontWeight: 'bold', fontSize: 18 }}>Toca Aquí.</Text>
                                                 </Text>
                                          </View>
                                          <View style={styles.viewImage}>
                                                 <LottieView
                                                        source={require('../assets/lottie/clickMe.json')}
                                                        autoPlay
                                                        loop
                                                 />
                                          </View>
                                   </TouchableOpacity>
                            </Animated.View>
                            <Animated.View style={[styles.newPqrds, { transform: [{ translateX: view3 }] }]}>
                                   <TouchableOpacity style={styles.touchNewPqrds} onPress={() => Linking.openURL(`mailto:atncliente@idrd.gov.co`)}>
                                          <View style={styles.touchAnonimasView}>
                                                 <Text style={{ fontSize: 18 }} >Para crear una nueva PQRDS{' '}
                                                        <Text style={{ color: '#5b3d90', fontWeight: 'bold', fontSize: 18 }}>Toca Aquí.</Text>
                                                 </Text>
                                          </View>
                                          <View style={styles.viewImage}>
                                                 <LottieView
                                                        source={require('../assets/lottie/clickMe.json')}
                                                        autoPlay
                                                        loop
                                                 />
                                          </View>
                                   </TouchableOpacity>
                            </Animated.View>
                     </ScrollView>
              </MainViewTabs>
       )
}

export default Pqrds

const styles = StyleSheet.create({
       mainImage: {
              flex: .8,
              alignItems: 'center',
              justifyContent: 'center'
       },
       mainText: {
              flex: 1.2,
              paddingHorizontal: width * 0.05
       },
       img: {
              width: width * 0.9,
              height: height * 0.3,
              borderRadius: 10
       },
       title: {
              alignItems: 'center',
              marginBottom: 15
       },
       textTitle: {
              fontSize: 18,
              textAlign: 'center',
              fontWeight: 'bold'
       },
       textPqrds: {
              fontSize: 17,
              textAlign: 'center',
       },
       pqrdsAnonimas: {
              minHeight: 100,
              borderRadius: 10,
              marginBottom: 15
       },
       touchAnonimas: {
              flex: 1,
              borderRadius: 10,
              backgroundColor: '#e9f7fa',
              flexDirection: 'row',
              alignItems: 'center',
              borderLeftWidth: 4,
              borderLeftColor: '#5c3d90'
       },
       touchAnonimasView: {
              width: '75%',
              paddingLeft: 5
       },
       newPqrds: {
              minHeight: 100,
              borderRadius: 10,
              marginBottom: 15
       },
       touchNewPqrds: {
              flex: 1,
              borderRadius: 10,
              backgroundColor: '#D2C6E7',
              flexDirection: 'row',
              alignItems: 'center',
              borderLeftWidth: 4,
              borderLeftColor: '#5c3d90'
       },
       viewImage: {
              flex: 1,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center'
       },
       image: {
              width: '50%',
              height: '50%'
       }
})
