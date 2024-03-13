import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial-next';

const BluetoothPrinter = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Subscribe to Bluetooth connection updates
    const subscription = BluetoothSerial.on('connectionLost', () => {
      setIsConnected(false);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const connectPrinter = async () => {
    try {
      const devices = await BluetoothSerial.list();
      const device = devices[0]; // Choose the desired device
      await BluetoothSerial.connect(device.id);
      setIsConnected(true);
    } catch (error) {
      console.error('Error connecting to printer:', error.message);
    }
  };

  const disconnectPrinter = async () => {
    try {
      const isConnected = await BluetoothSerial.isConnected();
      if (isConnected) {
        await BluetoothSerial.disconnect();
        setIsConnected(false);
      } else {
        console.warn('No active Bluetooth connection to disconnect.');
      }
    } catch (error) {
      console.error('Error disconnecting from printer:', error.message);
    }
  };

  const printData = async () => {
    try {
      await BluetoothSerial.write('Hello, Bluetooth Printer!\n');
    } catch (error) {
      console.error('Error printing data:', error.message);
    }
  };

  return (
    <View>
      <Text>{isConnected ? 'Connected' : 'Not Connected'}</Text>
      <Button title="Connect Printer" onPress={connectPrinter} />
      <Button title="Disconnect Printer" onPress={disconnectPrinter} disabled={!isConnected} />
      <Button title="Print Data" onPress={printData} disabled={!isConnected} />
    </View>
  );
};

export default BluetoothPrinter;
