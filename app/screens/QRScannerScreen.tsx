import React, { useState, useRef } from "react";
import { View, Text, Alert, Animated, Dimensions } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import PermissionScreen from "@/components/PermissionScreen";
import ScannerHeader from "@/components/ScannerHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageHook } from "@react-native-async-storage/async-storage/lib/typescript/types";
import { scanQR } from "@/apis/scanner";

export default function QRScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);
  // const [isScanning, setIsScanning] = useState(true);
  const [loading, setloading] = useState<boolean>(false);
  const [flashOn, setFlashOn] = useState(false);
  const scanningRef = useRef(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const rotateAnim = useRef(new Animated.Value(0)).current;

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  React.useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
  }, [scanningRef.current]);

  const FRAME_SIZE = 220;
  const handleBarCodeScanned = async({
    data,
    bounds,
  }: {
    data: string;
    bounds: any;
  }) => {
    // prevent multiple scans
    if (scanningRef.current) return;

    const screenWidth = Dimensions.get("window").width;
    const cameraHeight = 300;

    const frameLeft = (screenWidth - FRAME_SIZE) / 2;
    const frameTop = (cameraHeight - FRAME_SIZE) / 2;

    const x = bounds?.origin?.x || 0;
    const y = bounds?.origin?.y || 0;

    const insideFrame =
      x > frameLeft &&
      x < frameLeft + FRAME_SIZE &&
      y > frameTop &&
      y < frameTop + FRAME_SIZE;

    if (!insideFrame) return;

    scanningRef.current = true;
    try {
      const token = await AsyncStorage.getItem("accessToken");
      //api calling
      const response=await scanQR(data);




      setScannedData(data);

      Alert.alert("Scanned QR Code", data, [
        {
          text: "OK",
          onPress: () => {
            setTimeout(() => {
              scanningRef.current = false;
            }, 800);
          },
        },
      ]);
      

    } catch (error:any) {
     const message =
        error?.response?.data?.data?.message || "Something went wrong";
      console.error(message);
      // Alert.alert("Error", message)
    }
  };

  if (!permission) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#1a0a2e",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white" }}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return <PermissionScreen requestPermission={requestPermission} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#1a0a2e" }}>
      <ScannerHeader
        flashOn={flashOn}
        toggleFlash={() => setFlashOn(!flashOn)}
      />

      <View
        style={{
          flex: 1,

          width: "100%",
          height: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          enableTorch={flashOn}
          autofocus="on"
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={handleBarCodeScanned}
          // onCameraReady={() => setIsScanning(true)}
        />

        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            inset: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Scanner Frame */}
          <View
            style={{
              width: 220,
              height: 220,
              borderRadius: 24,
              borderWidth: 2,
              borderColor: "#BB52E0",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Loading spinner*/}
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loading && (
                <Animated.View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                    borderWidth: 2,
                    borderBottomColor: "transparent",
                    borderColor: "#BB52E0",
                    backgroundColor: "rgba(0,0,0,0)",
                    transform: [{ scale: pulseAnim }, { rotate: spin }],
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
