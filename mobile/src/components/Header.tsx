import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'

import { styles } from '../styles/Header';

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

const Header: React.FC<HeaderProps> = ({title, showCancel = true}) => {
  const navigate = useNavigation()

  const handleResetNavigation = useCallback(() => {
    navigate.navigate('OrphanagesMap')
  }, [])

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigate.goBack}>
        <Feather name='arrow-left' size={24} color='#15b6d6'/>
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      {showCancel ? (
        <BorderlessButton onPress={handleResetNavigation}>
        <Feather name='x' size={24} color='#ff669d'/>
      </BorderlessButton>
      ) : (
        <View style={{width: 24}}/>
      )}
    </View>
  );
}

export default Header;