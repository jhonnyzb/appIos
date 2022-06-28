import { StyleSheet, Text, View, Image, Linking, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native'
import { AppContext } from '../contexts/app-Context';
import Loading from '../components/Loading';


const IntroSliders = ({ navigation }) => {


	const { state: { slides, loading } } = useContext(AppContext);



	const _renderNextButton = () => {
		return (
			<View style={styles.buttonCircle}>
				<Icon
					name="md-arrow-forward"
					color="rgba(255, 255, 255, .9)"
					size={24}
				/>
			</View>
		);
	};

	const _renderDoneButton = () => {
		return (
			<View style={styles.buttonCircle}>
				<Icon name="md-checkmark" color="rgba(255, 255, 255, .9)" size={24} />
			</View>
		);
	}

	const _item = (item) => {
		if (item.flag === 'link') {
			if (item.link !== '') {
				return (
					<TouchableOpacity style={styles.touch} onPress={() => Linking.openURL(item.link)}>
						<LottieView
							source={require('../assets/lottie/clickMe.json')}
							autoPlay
							loop
						/>
					</TouchableOpacity>
				)
			}
		} else {
			return (
				<TouchableOpacity style={styles.touch} onPress={() => navigation.navigate('Details', { evento: item.evento })}>
					<LottieView
						source={require('../assets/lottie/clickMe.json')}
						autoPlay
						loop
					/>
				</TouchableOpacity>
			)
		}
	}


	const _renderItem = ({ item }) => {
		return (
			<View style={styles.slide}>
				<Image source={{ uri: item.image }} style={styles.image}  ></Image>
				{
					_item(item)
				}
			</View>
		);
	}

	const _onDone = () => {
		navigation.navigate('Tabs');
	}

	return (
		<>
			{loading ? <Loading /> :
				<AppIntroSlider
					renderItem={_renderItem}
					data={slides}
					renderDoneButton={_renderDoneButton}
					renderNextButton={_renderNextButton}
					onDone={_onDone}
				/>

			}
			<TouchableOpacity style={styles.buttonSkip} onPress={_onDone}>
				<Text style={{ color: '#ffffff' }}>Saltar</Text>
			</TouchableOpacity>
		</>
	)
}

export default IntroSliders

const styles = StyleSheet.create({
	slide: {
		flex: 1,
	},
	image: {
		height: '100%',
		width: '100%',
		resizeMode: 'stretch',
	},
	text: {
		color: '#333',
		marginTop: 92,
		textAlign: 'center',
	},
	buttonCircle: {
		width: 44,
		height: 44,
		backgroundColor: '#5c3d90',
		borderRadius: 22,
		justifyContent: 'center',
		alignItems: 'center',
	},
	touch: {
		backgroundColor: 'rgba(0, 0, 0, .2)',
		height: 80,
		width: 80,
		position: 'absolute',
		top: '50%',
		right: 0,
		borderRadius: 50,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'

	},
	buttonSkip: {
		alignItems: 'center',
		backgroundColor: '#5c3d90',
		borderRadius: 22,
		bottom: 35,
		display: 'flex',
		height: 44,
		left: 20,
		justifyContent: 'center',
		position: 'absolute',
		width: 44,
	},
});