import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosInstance";
import { router } from "expo-router";
import { Alert } from "react-native";

export async function scanQR(id:string) {
    const token =await AsyncStorage.getItem("accessToken")
    const expierdIn = await AsyncStorage.getItem("expierdIn")

    const isExpired =
  Date.now() > Number(expierdIn);
if (isExpired) {



  await AsyncStorage.removeItem(
    "accessToken"
  );

  await AsyncStorage.removeItem(
    "accessTokenExpire"
  );
  Alert.alert(
    "Session Expired",
    "Please login again",
    [
      {
        text: "Back",
        onPress: () => router.replace("/login"),
      },
    ]
  )
  return;
} else {
  console.log("Token still valid");
}
    return await axiosInstance.post(`/mobile/scan`,{ticketId:id},{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
    
}