import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const InfoDetails = ({ flag, info = '' }) => {



       const getImage = () => {
              if (flag === 1) {
                     return require('../assets/img/locationDetail.png')
              } else if (flag === 2) {
                     return require('../assets/img/relogDetail.png')
              } else {
                     return require('../assets/img/ticketDetail.png')
              }
       }

       return (
              <View style={styles.container}>
                     <View style={styles.view1}>
                            <Image source={getImage()} style={styles.image} />
                     </View>
                     <View style={styles.view2}>
                            <Text style={styles.text}>{info}</Text>
                     </View>
              </View>
       )
}

export default InfoDetails;

const styles = StyleSheet.create({
       container: {
              flexDirection: 'row', 
              alignItems: 'center', 
              marginTop: 5
       },
       view1: {
              width: 22, 
              height: 22, 
              marginRight: 5
       },
       view2: {
              width: '95%'
       },
       image: {
              width: '100%', 
              height: '100%', 
              resizeMode: 'contain'
       },
       text: {
              color: '#5c3d90', 
              fontSize: 14, 
              textTransform: 'uppercase'
       }

})
