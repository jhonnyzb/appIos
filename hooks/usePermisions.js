import { check, openSettings, PERMISSIONS, request, checkLocationAccuracy, requestLocationAccuracy } from 'react-native-permissions';


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

	const askLocationAcuraccy = async () => {
		let locatioStatusAccuraccy;
		locatioStatusAccuraccy = await checkLocationAccuracy();
		return locatioStatusAccuraccy;
	}

	const requestLocationAcuraccy = async() => {
		let locatioStatusAccuraccy;
		locatioStatusAccuraccy = await requestLocationAccuracy({purposeKey: 'full'});
		return locatioStatusAccuraccy;
	}


	const setBlocked = () => {
		openSettings();
	}


	return {
		askLocationPermisions,
		checkLocationPermisions,
		askLocationAcuraccy,
		requestLocationAcuraccy,
		setBlocked
	}
}

export default usePermisions;


