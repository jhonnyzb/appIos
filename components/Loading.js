import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import LottieView from 'lottie-react-native';

const Loading = () => {
       return (
              <View style={styles.mainLoading}>
                     <View style={styles.viewLottie}>
                            <LottieView
                                   source={require('../assets/lottie/loader.json')}
                                   autoPlay
                                   loop
                                   style={styles.lottie}
                            />
                     </View>
                     <Text style={styles.titleLoading}>Cargando Contenido Inicial....</Text>
              </View>
       )
}

export default Loading

const styles = StyleSheet.create({
       mainLoading: {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#e9f7fa'
       },
       viewLottie: {
              justifyContent: 'center',
              height: '40%',
              width: '50%'
       },
       lottie: {
              justifyContent: 'center',
              alignItems: 'center',
       },
       titleLoading: {
              fontSize: 20,
              fontWeight:'bold',
              color: '#5c3d90'

       }
})



// import React from 'react';
// import { Text, View, Dimensions } from 'react-native';

// import EStyleSheet from 'react-native-extended-stylesheet';
// import LottieView from 'lottie-react-native';

// const Loading = () => {

//        const height = Dimensions.get('window').height

//        return (
//               <View style={styles.main}>
//                      <View style={styles.viewLottie}>
//                             <LottieView
//                                    source={require('../assets/lottie/4682-loader.json')}
//                                    autoPlay
//                                    loop
//                             />
//                      </View>

//                      <View style={styles.viewText}>
//                             <Text style={[styles.textLoading, { fontSize: 0.024 * height }]}>
//                                    Estamos descargando la información,{' '}
//                                    <Text style={styles.textInt}>¡Se Paciente!,</Text> no debería tardar
//                                    mucho...
//                             </Text>
//                      </View>
//               </View>
//        );
// };

// export default Loading;

// const styles = EStyleSheet.create({
//        main: {
//               flex: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//        },
//        viewLottie: {
//               width: '50%',
//               height: '50%',
//        },
//        viewText: {
//               width: '70%',
//               height: '10%',
//        },
//        textLoading: {
//               textAlign: 'center',
//               color: '#aaaaaa',
//        },
//        textInt: {
//               fontWeight: 'bold',
//               color: '#5b3d90',
//        },
// });
