import { check, openSettings, PERMISSIONS, request } from 'react-native-permissions';


const usePermisions = () => {

	const askLocationPermisions = async () => {
		let permisionStatus;
		permisionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
		return permisionStatus;
	}

	const checkLocationPermisions = async () => {
		let permisionStatus;
		permisionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
		return permisionStatus;
	}


	const setBlocked = () => {
		openSettings();
	}


	return {
		askLocationPermisions,
		checkLocationPermisions,
		setBlocked
	}
}

export default usePermisions


