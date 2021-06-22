

import React, { useContext } from 'react'
import moment from 'moment';
import { AppContext } from '../contexts/app-Context';

const useCalendar = () => {

       const { state: { eventos } } = useContext(AppContext);
       const today = moment();
       const day = today.clone().startOf('month');
       let dates = [];
       let customDatesStyles = [];

       eventos.map((evento, index) => {
              const fecha_inicio = evento.fecha;
              const fecha_fin = evento.fecha_fin ? evento.fecha_fin : evento.fecha;
              if (fecha_inicio == fecha_fin) {
                     if (!dates.includes(fecha_inicio)) {
                            dates.push(fecha_inicio);
                     }
              } else {
                     let dayiter = moment(fecha_inicio);
                     while (!dayiter.isAfter(fecha_fin, 'day')) {
                            let dateString = dayiter.format('YYYY-MM-DD');
                            if (!dates.includes(dateString)) {
                                   dates.push(dateString);
                            }
                            dayiter.add(1, 'days');
                     }
              }
       })

       dates.forEach((fecha) => {
              customDatesStyles.push(!today.isSame(fecha, 'day') ?
                     {
                            date: fecha,
                            style: { backgroundColor: '#5e4495' },
                            textStyle: { color: '#FFFFFF' },
                            containerStyle: {

                            }
                     } : {
                            date: fecha,
                            style: { backgroundColor: '#bbafd7' },
                            textStyle: { color: '#FFFFFF' },
                            containerStyle: {

                            }
                     }
              );
       });


       return {
              eventos,
              customDatesStyles
       }
}

export default useCalendar;


