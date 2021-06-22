

import React, { useContext } from 'react';
import moment from 'moment';
import { AppContext } from '../contexts/app-Context';


const useEventos = () => {
     const { state: { eventos } } = useContext(AppContext);

     const eventos_en_rango = eventos.filter(evento => {
          const fecha_inicio = evento.fecha;
          const fecha_fin = evento.fecha_fin ? evento.fecha_fin : evento.fecha;
          return (
               (moment(fecha_inicio).isSameOrAfter(moment(), 'day') &&
                    moment(fecha_inicio).isBefore(moment().add(3, 'days'), 'day')) || moment().isBetween(fecha_inicio, fecha_fin));
     });

     const eventos_en_rangoMore = eventos.filter(evento => {
          const fecha_inicio = evento.fecha;
          const fecha_fin = evento.fecha_fin ? evento.fecha_fin : evento.fecha;
          return (
               (moment(fecha_inicio).isSameOrAfter(moment(), 'day') &&
                    moment(fecha_inicio).isBefore(moment().add(5, 'days'), 'day')) || moment().isBetween(fecha_inicio, fecha_fin));
     });


     const masEventos = eventos_en_rangoMore
          .sort((a, b) => moment(a.fecha) >= moment(b.fecha) ? 1 : -1)
     const eventosRecreacion = eventos_en_rango
          .filter(evento => evento.categoria.toString() === '1')
          .sort((a, b) => moment(a.fecha) >= moment(b.fecha) ? 1 : -1);
     const eventosDeportes = eventos_en_rango
          .filter(evento => evento.categoria.toString() === '2')
          .sort((a, b) => moment(a.fecha) >= moment(b.fecha) ? 1 : -1);
     const otrosEventos = eventos_en_rango
          .filter(evento => evento.categoria.toString() === '3')
          .sort((a, b) => moment(a.fecha) >= moment(b.fecha) ? 1 : -1);


     return {
          eventosRecreacion,
          eventosDeportes,
          otrosEventos,
          masEventos,
     }
}

export default useEventos;

