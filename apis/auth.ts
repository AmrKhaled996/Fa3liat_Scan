import axiosInstance from "./axiosInstance";


export async function login (email:string,password:(string|number)){

    return await axiosInstance.post(
      "/mobile/login",
      {
        email,
        password,
      }
    );

}