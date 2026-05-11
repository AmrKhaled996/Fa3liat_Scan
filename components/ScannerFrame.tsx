import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  scannedData: string | null;
  handleCopy: () => void;
  handleOpen: () => void;
  handleReset: () => void;
}

export default function ResultCard({
  scannedData,
  handleCopy,
  handleOpen,
  handleReset,
}: Props) {
  if (!scannedData) {
    return (
      <View
        style={{
          padding: 24,
          borderRadius: 24,
          alignItems: "center",
          borderWidth: 1,
          borderStyle: "dashed",
          borderColor: "rgba(255,255,255,0.1)",
          backgroundColor: "rgba(255,255,255,0.03)",
        }}
      >
        <Text style={{ fontSize: 32, marginBottom: 10 }}>⬛</Text>
        <Text style={{ color: "white" }}>Waiting for scan...</Text>
      </View>
    );
  }

  return (
    <>
      <View
        style={{
          padding: 20,
          borderRadius: 24,
          backgroundColor: "rgba(255,255,255,0.05)",
          borderWidth: 1,
          borderColor: "rgba(255,73,181,0.4)",
        }}
      >
        <Text style={{ color: "#FF49B5", fontSize: 10, marginBottom: 10 }}>
          SCANNED RESULT
        </Text>

        <Text style={{ color: "white", marginBottom: 20 }}>{scannedData}</Text>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            onPress={handleCopy}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#BB52E0",
              backgroundColor: "rgba(187,82,224,0.2)",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#BB52E0" }}>COPY</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleOpen}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#FF49B5",
              backgroundColor: "rgba(255,73,181,0.2)",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#FF49B5" }}>OPEN</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={handleReset} style={{ marginTop: 16 }}>
        <LinearGradient
          colors={["#BB52E0", "#FF49B5"]}
          style={{
            padding: 14,
            borderRadius: 16,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>SCAN AGAIN</Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
}
