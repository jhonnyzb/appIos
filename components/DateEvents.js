import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import moment from 'moment'

const DateEvents = ({fecha_inicio, fecha_fin, modal = false }) => {
       return fecha_inicio == fecha_fin ?
              (
                     <View style={modal ? styles.dateModal : styles.date}>
                            <Text style={styles.single_dateDay}>
                                   {moment(fecha_inicio).format('DD')}
                            </Text>
                            <Text style={styles.single_dateMonth}>
                                   {moment(fecha_inicio).format('MMM')}
                            </Text>
                     </View>
              ) : (
                     <View style={modal ? styles.dateModal : styles.date}>
                            <View style={styles.duoLeft}>
                                   <Text style={styles.duo_dateDay}>
                                          {moment(fecha_inicio).format('DD')}
                                   </Text>
                                   <Text style={styles.duo_dateMonth}>
                                          {moment(fecha_inicio).format('MMM')}
                                   </Text>
                            </View>
                            <View style={styles.duoRight}>
                                   <Text style={styles.duo_dateDay}>
                                          {moment(fecha_fin).format('DD')}
                                   </Text>
                                   <Text style={styles.duo_dateMonth}>
                                          {moment(fecha_fin).format('MMM')}
                                   </Text>
                            </View>
                     </View>
              )
}

export default DateEvents

const styles = StyleSheet.create({
       dateModal: {
		position: 'absolute',
		right: 0,
		top: 0,
		width: 40,
		height: 40,
		backgroundColor: '#38245f',
		borderTopRightRadius: 5
	},
	date: {
		position: 'absolute',
		right: 0,
		top: 0,
		width: 40,
		height: 40,
		backgroundColor: '#38245f',
		borderTopRightRadius: 5
	},
	single_dateDay: {
		fontSize: 16,
		color: '#FFFFFF',
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 5,
		flex: 1
	},
	single_dateMonth: {
		fontSize: 10,
		textAlign: 'center',
		color: '#FFFFFF',
		flex: 1
	},
	duoLeft: {
		flex: 1,
		position: 'absolute',
		left: 3,
		top: 2
	},
	duoRight: {
		flex: 1,
		position: 'absolute',
		right: 3,
		bottom: 2
	},
	duo_dateDay: {
		fontSize: 10,
		color: '#FFFFFF',
		fontWeight: 'bold',
		textAlign: 'center',
		flex: 1
	},
	duo_dateMonth: {
		fontSize: 7,
		color: '#FFFFFF',
		textAlign: 'center',
		color: '#FFFFFF',
		marginTop: -3,
		flex: 1
	}
})
