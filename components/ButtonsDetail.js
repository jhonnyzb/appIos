import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import useFavorites from '../hooks/useFavorites';
import usePermisions from '../hooks/usePermisions';


const SIZE_ICON = 40;
const ButtonsDetail = ({ flag, evento }) => {

	const [favorite, setFavorite] = useState(false);
	const { getFavorites, addFavorites, removeFavorites } = useFavorites();
	const { checkLocationPermisions, askLocationPermisions } = usePermisions();
	const navigation = useNavigation()

	useEffect(() => {
		isFavorite();
	}, [])

	const isFavorite = async () => {
		const favorites = await getFavorites();
		setFavorite(favorites.map(e => e._id).indexOf(evento._id) > -1)
	}


	const addFavorites_ = async () => {
		const flagAdd = await addFavorites(evento);
		setFavorite(flagAdd);
	}


	const removeFavorites_ = async () => {
		const flagRemove = await removeFavorites(evento);
		setFavorite(flagRemove);
	}


	const openLink = async () => {
		if (flag === 1) {
			Linking.openURL(evento.link.substr(0, 5) === 'https' ? evento.link : `https://${evento.link}`);
		} else if (flag === 2) {
			Linking.openURL(`mailto:atncliente@idrd.gov.co?subject=${evento.nombre}`);
		} else if (flag === 3) {
			favorite ? removeFavorites_() : addFavorites_();
		} else if (flag === 4) {
			const responseCheck = await checkLocationPermisions();
			if (responseCheck === 'granted') {
				navigation.navigate('mapEvents', { evento });
			} else if (responseCheck === 'denied') {
				const responseAsk = await askLocationPermisions();
				if (responseAsk === 'granted') {
					navigation.navigate('mapEvents', { evento });
				}
			} else {
				console.log('blocked');
			}
			
		}
	}


	const getImage = () => {
		if (flag === 1) {
			return <Icon name={'information-circle'} size={SIZE_ICON} color={'#5c3d90'} />
		} else if (flag === 2) {
			return <Icon name={'help-circle'} size={SIZE_ICON} color={'#5c3d90'} />
		} else if (flag === 3) {
			if (favorite)
				return <Icon name={'heart'} size={SIZE_ICON} color={'#5c3d90'} />
			return <Icon name={'heart-outline'} size={SIZE_ICON} color={'#5c3d90'} />
		} else {
			return <Icon name={'location'} size={SIZE_ICON} color={'#5c3d90'} />
		}
	}


	return (
		<TouchableOpacity style={styles.buttonsInt} onPress={openLink}>
			<Text style={{ textAlign: 'center' }}>
				{getImage()}
			</Text>
			<Text style={styles.textButton}>
				{flag === 1 ? 'Info aquí' : flag === 2 ? 'Dudas' : flag === 3 ? 'Favoritos' : 'Ir'}
			</Text>
		</TouchableOpacity>
	)
}

export default ButtonsDetail

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain'
	},
	buttonsInt: {
		flex: 1,
	},
	textButton: {
		textAlign: 'center',
		color: '#ccccccee'
	}
})
