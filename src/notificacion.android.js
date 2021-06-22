import PushNotification from 'react-native-push-notification'




const showNotificacion = (title, message) => {
	PushNotification.localNotification({
		title: title,
		message: message
	})
}


const handleScheduleNotificacion = (title, message) => {
	PushNotification.localNotificationSchedule({
		title: title,
		message: message,
		date: new Date(Date.now() + 5 * 1000)
	})
}


const handleCancel = () => {
	PushNotification.cancelAllLocalNotifications();
}


export { showNotificacion, handleScheduleNotificacion, handleCancel };