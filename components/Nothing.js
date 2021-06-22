import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native'
import LottieView from 'lottie-react-native';

const Nothing = ({ label, label1 = '', label2 = ''  }) => {
       return (
              <View style={styles.mainNothing}>

                     <View style={{ height: '45%', width: '90%' }}>
                            <LottieView
                                   source={require('../assets/lottie/24249-girl-on-the-bicycle.json')}
                                   autoPlay
                                   loop
                            />
                     </View>
                     <View style={{ width: '90%' }}>
                            <Text style={styles.text}>{label}
                                   <Text style={styles.text1}>{label1}</Text>{label2}
                            </Text>
                     </View>
                     <View style={{ width: '90%' }}>
                            <TouchableOpacity style={styles.touchNovedades} onPress={() => Linking.openURL('https://idrd.gov.co')}>
                                   <Text style={styles.textTouch}>Ver Mas Novedades</Text>
                            </TouchableOpacity>
                     </View>

              </View>
       )
}

export default Nothing

const styles = StyleSheet.create({
       mainNothing: {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#e9f7fa',
              justifyContent: 'space-evenly',

       },
       imgNothing: {
              width: '100%',
              height: '70%',
              resizeMode: 'contain'
       },
       text: {
              fontSize: 20,
              textAlign: 'center'
       },
       text1: {
              fontSize: 22,
              fontWeight: 'bold',
              color: '#5c3d90'
       },
       touchNovedades: {
              backgroundColor: '#5c3d90',
              minHeight: 50,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center'
       },
       textTouch:{
              color: '#ffff',
              fontSize: 18,
              fontWeight: 'bold'
       }
})
