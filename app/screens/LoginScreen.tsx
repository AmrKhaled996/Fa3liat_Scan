// screens/LoginScreen.tsx

import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { use, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { validateLogin } from "@/utils/FormValidation";
import { login } from "@/apis/auth";

const Flogo = require("../../assets/images/FLogo.png") as any;

type errors = {
  email?: String | null;
  password?: String | null;
};
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<errors>({ email: null, password: null });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigation();

  const handleLogin = async () => {
    const validationErr: errors = validateLogin({
      email,
      password,
    });

    setErrors(validationErr);


    if (validationErr.email != null || validationErr.password != null) {
      return;
    }

    try {
      setLoading(true);
      const expireDate = Date.now() + 24 * 60 * 60 * 1000;

      const response = await login(email, password);
      await AsyncStorage.setItem("accessToken", response?.data?.data?.token);
      await AsyncStorage.setItem("expierdIn", expireDate.toString());

      router.push("/scanner");
      
      const token = await AsyncStorage.getItem("accessToken");
      
    } catch (error: any) {
      const message =
        error?.response?.data?.data?.message || "Something went wrong";
      console.log(error?.response.data.data.message);
      if (typeof message === "string") Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#fff", "#fff", "#fff"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 24,
        }}
      >
        {/* Logo */}
        <View style={{ alignItems: "center", marginBottom: 40 }}>
          <View
            style={{
              width: 112,
              height: 112,
              borderRadius: 24,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              backgroundColor: "rgba(187, 82, 224, 0.08)",
              borderWidth: 2,
              borderColor: "#BB52E0",
            }}
          >
            <Image
              source={Flogo}
              style={{
                width: 80,
                height: 80,
                borderRadius: 16,
              }}
              resizeMode="contain"
            />
          </View>

          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              letterSpacing: 4,
              color: "#BB52E0",
              fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
            }}
          >
            Fa3liat Scan
          </Text>

          <Text
            style={{
              fontSize: 12,
              letterSpacing: 3,
              marginTop: 4,
              color: "#FF49B5",
            }}
          >
            SIGN IN TO CONTINUE
          </Text>
        </View>

        {/* Card */}
        <View
          style={{
            borderRadius: 24,
            padding: 16,
            backgroundColor: "rgba(255,255,255,0.05)",
            borderWidth: 1,
            borderColor: "rgba(187, 82, 224, 0.3)",
          }}
        >
          {/* Email */}
          <Text
            style={{
              fontSize: 10,
              letterSpacing: 2,
              marginBottom: 8,
              color: "#BB52E0",
            }}
          >
            EMAIL ADDRESS
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 12,
              paddingHorizontal: 8,
              marginBottom: 4,
              height: 52,
              backgroundColor: "#fff",
            }}
          >
            <Text style={{ color: "#000", marginRight: 12, fontSize: 16 }}>
              <Ionicons name="mail" size={20} color={"purple"} />
            </Text>

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor="rgba(0,0,0,0.3)"
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                width: "100%",
                flex: 1,
                color: "black",
                fontSize: 14,
                borderColor: errors.email == null ? "#BB52E0" : "red",
                borderWidth: 1,
                borderRadius: 12,
                padding: 8,
              }}
              className="shadow-purple-400 shadow-lg"
            />
          </View>
          {errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}

          {/* Password */}
          <Text
            style={{
              fontSize: 10,
              letterSpacing: 2,
              marginBottom: 8,
              marginTop: 16,
              color: "#BB52E0",
            }}
          >
            PASSWORD
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 12,
              paddingHorizontal: 8,
              marginBottom: 4,
              gap: 8,

              height: 52,
              backgroundColor: "#fff",
            }}
          >
            <Text style={{ color: "#BB52E0", marginRight: 1, fontSize: 16 }}>
              <Ionicons name="lock-closed" size={20} color={"purple"} />
            </Text>

            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="enter your password"
              placeholderTextColor="rgba(0,0,0,0.4)"
              secureTextEntry={!showPassword}
              style={{
                width: "100%",
                flex: 1,
                color: "black",
                fontSize: 14,
                borderColor: errors.password === null ? "#BB52E0" : "red",
                borderWidth: 1,
                borderRadius: 12,
                padding: 8,
              }}
            />
          </View>
          {errors.password && (
            <Text style={{ color: "red" }}>{errors.password}</Text>
          )}

          {/* Button */}
          <TouchableOpacity onPress={() => handleLogin()} activeOpacity={0.85}>
            <LinearGradient
              colors={["#BB52E0", "#FF49B5"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: 52,
                borderRadius: 12,
                alignItems: "center",
                marginBlock: 16,
                justifyContent: "center",
                opacity: loading ? 0.5 : 1,
              }}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    letterSpacing: 2,
                    fontSize: 12,
                  }}
                >
                  SIGN IN{" "}
                  <Ionicons name="arrow-forward" size={16} color={"#fff"} />
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
