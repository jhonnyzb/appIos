import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment';

import { AppContext } from '../contexts/app-Context';

const useEventsCalendar = (fecha) => {

       const { state: { eventos } } = useContext(AppContext);
       const [eventsCalendar, setEventsCalendar] = useState([])
       
       useEffect(() => {
              const events = getEvents();
              setEventsCalendar(events)
       }, [])

       const getEvents = () => {
              return eventos.filter(evento => {
                     const fecha_inicio = evento.fecha;
                     const fecha_fin = evento.fecha_fin ? evento.fecha_fin : evento.fecha;
                     return (
                            moment(fecha).isSame(fecha_inicio, 'day') ||
                            moment(fecha).isBetween(fecha_inicio, fecha_fin, null, '(]')
                     );
              });
       }

       return {
              eventsCalendar
       }
}

export default useEventsCalendar;


