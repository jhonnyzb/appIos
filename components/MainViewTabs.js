import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MainViewTabs = ({ children }) => {
       const insets = useSafeAreaInsets();
       return (
              <View style={[styles.mainEvents, { marginTop: insets.top }]}>
                     {children}
              </View>
       )
}

export default MainViewTabs


const styles = StyleSheet.create({
       mainEvents: {
              flex: 1,
              backgroundColor: '#f1f1f1',
       }
})
