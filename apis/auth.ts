import axiosInstance from "./axiosInstance";


export async function login (email:string,password:(string|number)){
    console.log("url:",process.env.EXPO_PUBLIC_API_URL)
    console.log("email",email,"password",password)
    return await axiosInstance.post(
      "/mobile/login",
      {
        email,
        password,
      }
    );

}