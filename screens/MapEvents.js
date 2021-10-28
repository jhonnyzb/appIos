

import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker, Circle } from 'react-native-maps';
import Fab from '../components/Fab';
import useLocation from '../hooks/useLocation';

const MapEvents = ({ route }) => {

	const evento = route.params?.evento ?? {};
	const { followUserLocation, stopFollowUserLocation, userLocation, loading } = useLocation();

	const mapViewRef = useRef();
	const following = useRef(true);


	useEffect(() => {
		if (!following.current) return;
		const { latitude, longitude } = userLocation;
		mapViewRef.current.animateCamera({
			center: { latitude, longitude },
			zoom: 15
		})

	}, [userLocation]);

	useEffect(() => {
		followUserLocation();
		return () => {
			stopFollowUserLocation();
		}
	}, []);


	const centerPosition = () => {
		following.current = true;
		mapViewRef.current.animateCamera({
			center: {
				latitude: userLocation.latitude,
				longitude: userLocation.longitude
			},
			zoom: 15
		})
	}

	return (
		<View style={{ flex: 1 }}>
			<View style={{ flexDirection: 'row', position: 'absolute', top: 50, zIndex: 9999, width: '100%', justifyContent: 'space-between' }}>
				<View >
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
				/>
				<Marker
					coordinate={{
						latitude: parseFloat(evento.ubicacion.lat),
						longitude: parseFloat(evento.ubicacion.lon)
					}}
					title={evento.nombre}
				/>

			</MapView>
			<Fab iconName='locate' onPress={centerPosition} />
		</View>
	)
}

export default MapEvents;

const styles = StyleSheet.create({})

