import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

const HeaderMain = ({ title, search, back, searchEvents, setFlagSeaM }) => {

       const [flagSearch, setflagSearch] = useState(false);
       const [text, setText] = useState('');
       const navigation = useNavigation();



       const changeText = (text) => {
              setText(text)
              searchEvents(text)
       }



       return (
              <View style={styles.mainHeader}>
                     {!flagSearch &&
                            <>
                                   <View style={[styles.viewHeader, { width: '20%', }]}>
                                          <View style={styles.containerImg}>
                                                 {back ?
                                                        <TouchableOpacity onPress={() => navigation.goBack()}>
                                                               <Text>
                                                                      <Icon name='arrow-back' size={30} color='#ffff' />
                                                               </Text>
                                                        </TouchableOpacity> :
                                                        <Image style={styles.imgHeader} source={require('../assets/img/slogan.png')} />
                                                 }
                                          </View>
                                   </View>
                                   <View style={[styles.viewHeader, { width: '55%' }]}>
                                          <Text style={styles.textHeader}>{title}</Text>
                                   </View>
                            </>
                     }
                     {!flagSearch &&
                            <View style={[styles.viewHeader, { width: '15%', }]}>
                                   {search ?
                                          <TouchableOpacity onPress={() => {
                                                 setflagSearch(true)
                                                 setFlagSeaM(true)
                                          }}>
                                                 <Text>
                                                        <Icon name='search' size={30} color='#ffff' />
                                                 </Text>
                                          </TouchableOpacity> :
                                          <TouchableOpacity>
                                                 <Text></Text>
                                          </TouchableOpacity>
                                   }

                            </View>}
                     {flagSearch &&
                            <View style={styles.viewSearch}>
                                   <TouchableOpacity onPress={() => {
                                          setflagSearch(false)
                                          changeText('')
                                          setFlagSeaM(false)
                                   }}>
                                          <Text>
                                                 <Icon name='arrow-back' size={25} color='#5b3d90' />
                                          </Text>
                                   </TouchableOpacity>
                                   <TextInput
                                          style={styles.input}
                                          onChangeText={changeText}
                                          value={text}
                                          autoFocus
                                   />

                            </View>
                     }

              </View>
       )
}

export default HeaderMain

const styles = StyleSheet.create({
       mainHeader: {
              backgroundColor: '#5b3d90',
              height: 60,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
       },
       viewHeader: {
              alignItems: 'center'
       },
       containerImg: {
              height: '70%',
              width: '100%',
              justifyContent: 'center',
              marginLeft: 10

       },
       imgHeader: {
              resizeMode: 'contain',
              width: '100%',
              height: '100%'
       },
       textHeader: {
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 18
       },
       viewSearch: {
              flex: 1,
              height: '70%',
              marginHorizontal: 10,
              justifyContent: 'center',
              backgroundColor: '#ffff',
              borderRadius: 15,
              flexDirection: 'row',
              alignItems: 'center'
       },
       input: {
              height: '100%',
              width: '90%',
              fontSize: 16,
              color: 'black'

       },

})
