import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import CalendarPicker from 'react-native-calendar-picker';
import HeaderMain from '../components/HeaderMain';
import MainViewTabs from "../components/MainViewTabs";
import useCalendar from '../hooks/useCalendar';

const Calendar = ({ navigation }) => {

       const { customDatesStyles } = useCalendar();

       const onDateChange = (date) => {
              navigation.navigate('eventsDay', { date });

       }

       return (
              <MainViewTabs>
                     <HeaderMain title='Calendario de eventos' />
                     <CalendarPicker
                            weekdays={['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']}
                            months={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
                            onDateChange={onDateChange}
                            customDatesStyles={customDatesStyles}
                            selectedDayStyle={{ backgroundColor: '#cecece' }}
                            previousTitle="Anterior"
                            nextTitle="Siguiente"
                     />
              </MainViewTabs>
       )
}

export default Calendar


const styles = StyleSheet.create({

})