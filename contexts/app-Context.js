import React, { createContext, useReducer } from 'react'
import moment from 'moment';
import { db } from '../configDB/db';
import { appReducer } from './app-reducer';


export const appInitialState = {
       categorias: [],
       eventos: [],
       loading: true
}


export const AppContext = createContext();


export const AppProvider = ({ children }) => {


       const [state, dispatch] = useReducer(appReducer, appInitialState)

       const generateUUID = () => {
              let uuid1 = moment().unix();
              let ramdon = Math.floor(Math.random() * 100);
              let uuid2 = uuid1.toString().slice(-5) + ramdon.toString();
              return uuid2;
       }

       const load = (key) => {
              db.find({ selector: { schema: key, }, })
                     .then(result => {
                            if (result.docs.length > 0) {
                                   if (key === 'categorias') {
                                          dispatch({ type: 'loadCategorias', payload: result.docs })
                                   } else {
                                          dispatch({
                                                 type: 'loadEventos', payload: {
                                                        data: result.docs.map((evento, index) => {
                                                               return {
                                                                      ...evento,
                                                                      // notify: false,
                                                                      // idNotify: generateUUID()
                                                               }
                                                        }),
                                                        loading: false
                                                 }
                                          })
                                   }
                            }
                     });
       }


       return (
              <AppContext.Provider value={{
                     state,
                     load
              }}>
                     {children}
              </AppContext.Provider>

       )
}