import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


interface Props {
  requestPermission: () => void;
}

export default function PermissionScreen({ requestPermission }: Props) {
  return (
    <View

      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
      }}
    >
      <Text style={{ fontSize: 48, marginBottom: 24 }}><Ionicons name="camera" size={48} color="#BB52E0"/></Text>

      <Text
        style={{
          color: '#BB52E0',
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 12,
        }}
      >
        Camera Access Needed
      </Text>

      <Text
        style={{
          textAlign: 'center',
          marginBottom: 32,
          fontSize: 13,
          color: '#FF49B580',
        }}
      >
        Grant camera permission to start scanning QR codes
      </Text>

      <TouchableOpacity onPress={requestPermission}>
        <LinearGradient
          colors={['#BB52E0', '#FF49B5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            paddingVertical: 14,
            paddingHorizontal: 40,
            borderRadius: 16,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              letterSpacing: 2,
              fontSize: 12,
            }}
 >
            GRANT PERMISSION
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}