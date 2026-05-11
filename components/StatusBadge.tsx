import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  isScanning: boolean;
}

export default function StatusBadge({ isScanning }: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 16,
        alignSelf: 'center',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: isScanning
          ? 'rgba(187,82,224,0.3)'
          : 'rgba(255,73,181,0.3)',
        borderColor: isScanning ? '#BB52E0' : '#FF49B5',
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 10,
          fontWeight: 'bold',
          letterSpacing: 2,
        }}
      >
        {isScanning ? '● SCANNING' : '✓ CAPTURED'}
      </Text>
    </View>
  );
}