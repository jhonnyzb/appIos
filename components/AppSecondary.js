import React, { useContext, useEffect } from 'react'
import { StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { AppContext } from '../contexts/app-Context'
import { db, synchandler } from '../configDB/db'
import NavigatorStack from '../navigator/NavigatorStack'

const AppSecondary = () => {
       const { load } = useContext(AppContext);

       useEffect(() => {
              synchandler.on('change', onchange)
              synchandler.on('error', err => console.log(err))
              setupDatabase();
              SplashScreen.hide();
              return () => {
                     synchandler.cancel()
              }
       }, [])

       const setupDatabase = () => {
              db.createIndex({ index: { fields: ['_id'], }, })
                     .then(function (result) {
                            // handle result
                     })
                     .catch(function (err) {
                            console.log(err);
                     });
			  load('sliders');
              load('categorias');
              load('eventos');
       }

       const onchange = () => {
              load('categorias');
              load('eventos');
			  load('sliders');
       }



       return (
              <>
                     <StatusBar backgroundColor="#000000"/>
                     <NavigatorStack />
					
					 
              </>
       )
}

export default AppSecondary;

