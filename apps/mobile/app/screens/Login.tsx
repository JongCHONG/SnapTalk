import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Login = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Login</Text>
      <Button
        title="Register"
        onPress={() => {
          navigation.navigate('Register');
        }}
      />
    </View>
  );
};

export default Login;
