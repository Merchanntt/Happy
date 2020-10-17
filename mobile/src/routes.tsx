import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanagesDetail from './pages/OrphanageDetails';
import MapSelectedPoint from './pages/createOrphanagesPages/SelectMapPosition';
import CreateOrphanage from './pages/createOrphanagesPages/OrphanageData';

import Header from './components/Header';

const {Navigator, Screen} = createStackNavigator()

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false ,cardStyle: {backgroundColor: '#f2f3f5'}}}>
        <Screen name='OrphanagesMap' component={OrphanagesMap}/>
        
        <Screen 
          name='OrphanageDetails' 
          component={OrphanagesDetail}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title='Orfanato'/>
          }}  
        />

        <Screen 
          name='MapSelectedPoint' 
          component={MapSelectedPoint}
          options={{
            headerShown: true,
            header: () => <Header title='Selecione no mapa'/>
          }}  
        />
        <Screen 
          name='CreateOrphanage'
          component={CreateOrphanage}
          options={{
            headerShown: true,
            header: () => <Header title='Informe os dados'/>
          }}  
        />
      </Navigator>
    </NavigationContainer>
  );
}

export default Routes;