
import React from 'react';
import moment from 'moment';
import { StyleSheet, Text, View } from 'react-native';

const DateDetail = ({ fecha, fecha_fin }) => {
       return fecha === fecha_fin ?
              <View style={styles.dateFirst}>
                     <Text style={styles.dFText1}>
                            {moment(fecha).format('DD')}
                     </Text>
                     <Text style={styles.dFtext2}>
                            {moment(fecha).format('MMM')}
                     </Text>
              </View>

              :
              <>
                     <View style={styles.date1}>
                            <Text style={styles.text1}>
                                   {moment(fecha).format('DD')}
                            </Text>
                            <Text style={styles.text2}>
                                   {moment(fecha).format('MMM')}
                            </Text>
                     </View>
                     <View style={styles.date2}>
                            <Text style={styles.text1}>
                                   {moment(fecha_fin).format('DD')}
                            </Text>
                            <Text style={styles.text2}>
                                   {moment(fecha_fin).format('MMM')}
                            </Text>
                     </View>
              </>

}

export default DateDetail

const styles = StyleSheet.create({
       dateFirst:{
              height: '70%',
              width: '70%',
              justifyContent: 'center',
              alignItems: 'center'
       },
       date1: {
              position: 'absolute',
              top: 0,
              left: 0,
              height: '50%',
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center'
       },
       date2: {
              position: 'absolute',
              bottom: 0,
              right: 0,
              height: '50%',
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center'
       },
       text1: {
              color: '#fff',
              fontSize: 12,
              fontWeight: 'bold',
              flex: 1
       },
       text2: {
              color: '#fff',
              fontSize: 10,
              flex: 1
       },
       dFText1:{
              color: '#fff',
              fontSize: 16,
              flex: 1,
              fontWeight: 'bold' 
       },
       dFtext2:{
              color: '#fff',
              fontSize: 12,
              flex: 1,
              
       }
})
