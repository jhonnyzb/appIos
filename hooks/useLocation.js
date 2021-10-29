import { useRef, useState } from 'react';
import { Alert } from "react-native";
import Geolocation from 'react-native-geolocation-service';

let _timeout = null;
const useLocation = () => {

	const [loading, setLoading] = useState(false);
	const [recorrido1, setRecorrido1] = useState([]);
	const [instrucciones1, setInstrucciones1] = useState([]);
	const [times, setTimes] = useState({
		distance: 0,
		travelTime: 0
	});
	const [userLocation, setUserLocation] = useState({
		latitude: 4.659538777429032,
		longitude: -74.08430818683487
	});

	const wachtId = useRef();


	const followUserLocation = () => {
		wachtId.current = Geolocation.watchPosition(
			({ coords }) => {
				const location = {
					latitude: coords.latitude,
					longitude: coords.longitude
				}
				setUserLocation(location);
			},
			(err) => {
				let message = '';
				const { code } = err;
				const msscode1 = 'No se ha otorgado permiso de ubicación.';
				const msscode2 = 'No se encuentra señal de GPS, verifica si se encuentra encendido, Para poder ubicarte.';
				const msscode3 = 'Tiempo de espera para solicitud agotado, habilita y deshabilita el GPS e intenta nuevamente.';
				const msscode4 = 'El servicio Google Play no está instalado o tiene una versión anterior.';
				const msscode5 = 'El servicio de ubicación no está habilitado o el modo de ubicación no es apropiado para la solicitud actual .';
				const msscode6 = 'Se ha presesentado un error interno con la biblioteca, reinicia la aplicación e intenta nuevamente.';
				if (code === 1) {
					message = msscode1;
				} else if (code === 2) {
					message = msscode2;
				} else if (code === 3) {
					message = msscode3;
				} else if (code === 4) {
					message = msscode4;
				} else if (code === 5) {
					message = msscode5;
				} else {
					message = msscode6;
				}
				createThreeButtonAlert(message);
			},
			{ accuracy: { ios: 'best' }, enableHighAccuracy: true, distanceFilter: 5, interval: 1000, fastestInterval: 1000 }
		)
	}

	const stopFollowUserLocation = () => {
		Geolocation.clearWatch(wachtId.current);
	}

	const getCoordenadas = (lat, lon, lae, lov, travelMode = 'car') => {
		setLoading(true);
		clearTimeout(_timeout);
		let url = 'https://api.tomtom.com/routing/1/calculateRoute/' + lat + '%2C' + lon + '%3A' + lae + '%2C' + lov + '/json?instructionsType=text&language=es&routeType=fastest&traffic=true&avoid=unpavedRoads&travelMode=' + travelMode + '&key=gNsto5Im7kPCXm9DXXjob5uabJHA9ah4'
		// eslint-disable-next-line no-undef
		const abortController = new AbortController();
		fetch(url, {
			signal: abortController.signal,
		})
			.then(response => response.json())
			.then(data => {
				setRecorrido1(data.routes[0].legs[0].points);
				setInstrucciones1(data.routes[0].guidance.instructions)
				setTimes(
					{
						distance: data.routes[0].summary.lengthInMeters / 1000,
						travelTime: data.routes[0].summary.travelTimeInSeconds / 60,

					})
				setLoading(false);
			})
			.catch(error => {
				setRecorrido1([]);
				setInstrucciones1([]);
				setTimes({ distance: 0, travelTime: 0 })
				setLoading(false);
			});
		_timeout = setTimeout(() => {
			abortController.abort();
		}, 30000);
	}

	const clearTimeOut = () => {
		clearTimeout(_timeout);
	}

	const createThreeButtonAlert = (message) =>
		Alert.alert(
			"¡Atención!",
			message,
			[
				{ text: "OK", onPress: () => { } }
			]
		);



	return {
		recorrido1,
		instrucciones1,
		getCoordenadas,
		times,
		loading,
		//dialogBoxLocation,
		clearTimeOut,
		followUserLocation,
		stopFollowUserLocation,
		userLocation

	}
}

export default useLocation;


