import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const Fab = ({ iconName, onPress }) => {
       return (
              <View >
                     <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.blackButton}>
                            <Icon name={iconName} color='white' size={30} style={{left: 1}} />
                     </TouchableOpacity>

              </View>
       )
}

export default Fab

const styles = StyleSheet.create({
       blackButton: {
              zIndex: 9999,
              height: 40,
              width: 40,
              backgroundColor: 'black',
              position: 'absolute',
              bottom: 170,
              right: 20,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              paddingRight: 2
       }
})
