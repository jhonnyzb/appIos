

import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import MapView, { Marker, Circle, Polyline } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import Fab from '../components/Fab';
import useLocation from '../hooks/useLocation';

const MapEvents = ({ route }) => {

	const evento = route.params?.evento ?? {};
	const { recorrido1, instrucciones1, getCoordenadas, times, loading, clearTimeOut, followUserLocation, stopFollowUserLocation, userLocation } = useLocation();
	const [colorLine, setcolorLine] = useState('#28a9e4');
	const [colorAuxiliar, setcolorAuxiliar] = useState('#28a9e4');
	const [iconRoute, setIconRoute] = useState('car');


	const mapViewRef = useRef();
	const following = useRef(true);


	useEffect(() => {
		if (!following.current) return;
		const { latitude, longitude } = userLocation;
		mapViewRef.current.animateCamera({
			center: { latitude, longitude },
			altitude: 13000
		})

	}, [userLocation]);


	useEffect(() => {
		setcolorLine(colorAuxiliar);
	}, [recorrido1])


	useEffect(() => {
		return () => {
			clearTimeOut();
		}
	}, [])


	useEffect(() => {
		followUserLocation();
		return () => {
			stopFollowUserLocation();
		}
	}, []);


	const getRoute = (typeVehicle, strokeColor) => {
		getCoordenadas(userLocation.latitude, userLocation.longitude, parseFloat(evento.ubicacion.lat), parseFloat(evento.ubicacion.lon), typeVehicle)
		setcolorAuxiliar(strokeColor);
		setIconRoute(typeVehicle);

	}


	const centerPosition = () => {
		following.current = true;
		mapViewRef.current.animateCamera({
			center: {
				latitude: userLocation.latitude,
				longitude: userLocation.longitude
			},
			altitude: 13000
		})
	}

	return (
		<View style={{ flex: 1 }}>
			<View style={{  position: 'absolute', top: 50, zIndex: 9999, width: '50%' }}>
				<View style={{marginBottom: 10}}>
					<Text style={{ color: '#a2abb5', fontSize: 10 }}>PUNTO ORIGEN</Text>
					<Text style={{ color: '#a2abb5', fontSize: 10 }}>Lat: {userLocation.latitude}</Text>
					<Text style={{ color: '#a2abb5', fontSize: 10 }}>Lon: {userLocation.longitude}</Text>
				</View>
				<View>
					<Text style={{ color: '#a2abb5', fontSize: 10 }}>PUNTO DESTINO</Text>
					<Text style={{ color: '#a2abb5', fontSize: 10 }}>Lat: {evento.ubicacion.lat}</Text>
					<Text style={{ color: '#a2abb5', fontSize: 10 }}>Lon: {evento.ubicacion.lon}</Text>
				</View>

			</View>

			<MapView
				ref={(el) => mapViewRef.current = el}
				style={{ flex: 1 }}
				initialRegion={{
					latitude: userLocation.latitude,
					longitude: userLocation.longitude,
					latitudeDelta: 0.10,
					longitudeDelta: 0.10,
				}}
				onTouchStart={() => following.current = false}
			>
				<Circle
					center={{
						latitude: userLocation.latitude,
						longitude: userLocation.longitude
					}}
					radius={300}
					strokeColor={'#5c3d904f'}
					fillColor={'#5c3d904f'}
				/>

				<Marker
					coordinate={{
						latitude: userLocation.latitude,
						longitude: userLocation.longitude
					}}
					title={'INICIO'}
					description={'Punto de inicio'}
				>
					<Image
						style={styles.imgIconInicio}
						source={require('../assets/img/inicio.png')}
					/>
				</Marker>

				{instrucciones1.map((marker, index) => {
					if (index !== 0) {
						return (
							<Marker
								key={marker.point.latitude + index}
								coordinate={{
									latitude: marker.point.latitude,
									longitude: marker.point.longitude
								}}
								title={'INSTRUCCION'}
								description={marker.message}
							>
								<Image
									style={styles.imgIconConstrucion}
									source={require('../assets/img/iconInstruccion.png')}
								/>

							</Marker>
						)
					}
				})}
				<Marker
					coordinate={{
						latitude: parseFloat(evento.ubicacion.lat),
						longitude: parseFloat(evento.ubicacion.lon)
					}}
					title={evento.nombre}
				/>
				<Polyline
					coordinates={recorrido1}
					strokeColor={colorLine}
					strokeWidth={4}
				/>


			</MapView>
			<Fab iconName='locate' onPress={centerPosition} />
			<View style={styles.mainFoot} >
				<View style={styles.viewButtons}>
					<View style={styles.textViewIcon} >
						<TouchableOpacity style={[styles.touch, { backgroundColor: '#28a9e4' }]} onPress={() => getRoute('car', '#28a9e4')} >
							{
								loading ?
									<ActivityIndicator size="small" color="white" /> :
									<Icon name='car' size={30} color='black' />
							}
						</TouchableOpacity>
						<Text style={styles.textIcon}>Carro</Text>
					</View>
					<View style={styles.textViewIcon}>
						<TouchableOpacity style={[styles.touch, { backgroundColor: '#dc195c' }]} onPress={() => getRoute('bicycle', '#dc195c')}>
							{
								loading ?
									<ActivityIndicator size="small" color="white" /> :
									<Icon name='bicycle' size={30} color='black' />
							}

						</TouchableOpacity>
						<Text style={styles.textIcon}>Bicicleta</Text>
					</View>
					<View style={styles.textViewIcon}>
						<TouchableOpacity style={[styles.touch, { backgroundColor: '#fcb040' }]} onPress={() => getRoute('pedestrian', '#fcb040')}>
							{
								loading ?
									<ActivityIndicator size="small" color="white" /> :
									<Icon name='walk' size={30} color='black' />

							}

						</TouchableOpacity>
						<Text style={styles.textIcon}>Caminar</Text>
					</View>
					<View style={styles.textViewIcon}>
						<TouchableOpacity style={[styles.touch, { backgroundColor: '#31b472' }]} onPress={() => getRoute('motorcycle', '#31b472')}>
							{
								loading ?
									<ActivityIndicator size="small" color="white" /> :
									<Icon name='bicycle' size={30} color='black' />
							}

						</TouchableOpacity>
						<Text style={styles.textIcon}>Moto</Text>
					</View>
				</View>
				<View style={styles.viewTimes}>
					<View style={{ flexDirection: 'row' }} >
						<View style={{ flexDirection: 'row', alignItems: 'center', width: '60%' }}>
							<Icon name={iconRoute === 'pedestrian' ? 'walk' : iconRoute === 'motorcycle' ? 'bicycle' : iconRoute}
								size={30}
								color='black' />
							<Text style={styles.textTimes1}>{loading ? '--' : times.travelTime.toFixed(0)} min</Text>
							<Text style={styles.textTimes2} >({loading ? '--' : times.distance.toFixed(1)} Km )</Text>
						</View>

						<View style={{ width: '40%' }}>
							<Text style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }} >Toca tu Transporte favorito</Text>
						</View>
					</View>
					<View>
						<Text style={styles.textTimes3}>{loading ? 'Buscando ruta hacia el destino' : 'Destino: ' + evento.nombre} </Text>
					</View>
				</View>
			</View>

		</View>
	)
}

export default MapEvents;

const styles = StyleSheet.create({
	mainFoot: {
		height: 130,
		bottom: 0,
		position: 'absolute',
		width: '100%'
	},
	viewButtons: {
		backgroundColor: '#5c3d904f',
		height: '50%',
		width: '100%',
		justifyContent: 'space-around',
		alignItems: 'center',
		flexDirection: 'row'
	},
	touch: {
		height: 40,
		width: 40,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	viewTimes: {
		backgroundColor: 'white',
		height: '50%',
		width: '100%'
	},
	viewDistance: {
		height: '50%',
		width: '20%',
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center'

	},
	textTimes1: {
		fontWeight: 'bold',
		fontSize: 18,
		marginHorizontal: 2
	},
	textTimes2: {
		fontSize: 21,
		color: '#a2abb5'
	},
	textTimes3: {
		color: '#a2abb5',
		fontSize: 15
	},
	imgIconConstrucion: {
		height: 15,
		width: 15
	},
	imgIconInicio: {
		height: 15,
		width: 15
	},
	textViewIcon: {
		alignItems: 'center',
	},
	textIcon: {
		fontWeight: 'bold',
		fontSize: 10
	}

})

