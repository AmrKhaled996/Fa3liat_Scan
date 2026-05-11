import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
  flashOn: boolean;
  toggleFlash: () => void;
}
export default function ScannerHeader({ flashOn, toggleFlash }: Props) {
  return (
    <View
      style={{
        paddingTop: 56,
        paddingBottom: 16,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View>
        <Text
          style={{
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
            letterSpacing: 2,
          }}
        >
          QR SCANNER
        </Text>

        <Text
          style={{
            fontSize: 10,
            marginTop: 4,
            letterSpacing: 2,
            color: '#FF49B5',
          }}
        >
          POINT AT ANY QR CODE
        </Text>
      </View>

      <TouchableOpacity
        onPress={toggleFlash}
        style={{
          width: 44,
          height: 44,
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: flashOn
            ? 'rgba(255,73,181,0.25)'
            : 'rgba(255,255,255,0.07)',
          borderWidth: 1,
          borderColor: flashOn ? '#FF49B5' : 'rgba(255,255,255,0.1)',
        }}
      >
        <Text style={{ fontSize: 20 }}><Ionicons name='bulb' size={20} color={flashOn ? '#FF49B5' : 'white'}/></Text>
      </TouchableOpacity>
    </View>
  );
}