import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import usePermisions from '../hooks/usePermisions';


const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const ModalInfo = (props, ref) => {

	const [visible, setVisible] = useState(false);
	const [visibleLocationBlock, setVisibleLocationBlock] = useState(false);
	const { setBlocked } = usePermisions();


	useImperativeHandle(ref, () => ({
		setvisible: () => {
			setVisible(!visible);
		},
		setVisibleLocation: () => {
			setVisibleLocationBlock(!visibleLocationBlock)
		}

	}));


	const settingsLocation = () => {
		setVisibleLocationBlock(false);
		setBlocked()
	}


	return (
		<>
			<Modal
				animationType="fade"
				transparent={true}
				visible={visible}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<View style={styles.textView} >

							<Text style={styles.modalText}>
								Dale Click a la Campana en el Evento y Agenda IDRD te notificara,
								<Text style={styles.text1}>
									{' '}¡Para que no olvides tus Eventos favoritos!
								</Text>
							</Text>

						</View>
						<View style={styles.btnIconView} >
							<View style={styles.notiView}>
								<Icon name='notifications-off-circle-outline' size={35} color='red' />
								<Icon name='chevron-forward-outline' size={35} color='green' />
								<Icon name='notifications-circle-outline' size={35} color='green' />
							</View>
							<TouchableOpacity style={styles.Touchab1} onPress={() => setVisible(false)} >
								<Text style={styles.text2}>
									CERRAR
								</Text>
							</TouchableOpacity>

						</View>

					</View>
				</View>
			</Modal>
			<Modal
				animationType="fade"
				transparent={true}
				visible={visibleLocationBlock}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<View style={styles.textView} >

							<Text style={styles.modalText}>
								Se ha detectado bloqueo en el permiso de geolocalización para Agenda IDRD
								<Text style={styles.text1}>
									{' '}¡Da click en configuración para habilitar!
								</Text>
							</Text>

						</View>
						<View style={styles.btnIconView} >
							<TouchableOpacity style={styles.Touchab1} onPress={settingsLocation} >
								<Text style={styles.text2}>
									CONFIGURACION
								</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.Touchab1} onPress={() => setVisibleLocationBlock(false)} >
								<Text style={styles.text2}>
									CERRAR
								</Text>
							</TouchableOpacity>

						</View>
					</View>
				</View>
			</Modal>
		</>
	)
}

export default forwardRef(ModalInfo);

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: '#9999997a'
	},
	modalView: {
		width: '90%',
		backgroundColor: "white",
		borderRadius: 5,
		alignItems: "center"
	},
	textView: {
		width: '80%',
		paddingTop: 15
	},
	btnIconView: {
		width: '80%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 15
	},
	notiView: {
		flexDirection: 'row',
		borderRadius: 5,

	},
	modalText: {
		marginBottom: 25,
		textAlign: "justify",
		fontSize: 0.024 * height
	},
	text1: {
		fontWeight: 'bold',
		color: '#5b3d90',
		fontSize: 0.024 * height
	},
	Touchab1: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#5b3d90',
		width: '45%',
		borderRadius: 5,
		height: 40
	},
	text2: {
		color: '#ffffff',
		fontWeight: 'bold'
	}
})
