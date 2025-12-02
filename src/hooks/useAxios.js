import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { api } from "../api/api";
import axios from "axios";
export const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const interchepRequest = api.interceptors.request.use(
      (config) => {
        const AuthToken = auth?.AuthToken;
        if (AuthToken) {
          config.headers.Authorization = `Berrar Token ${AuthToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const interchepResponse = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const orginalRequest = error?.config;
        if (error.response.status === 401 && !orginalRequest._retry) {
          orginalRequest._retry = true;
          try {
            const refreshToken = auth?.RefreshToken;
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );
            const { token } = response.data;
            setAuth({ ...auth, AuthToken: token });
            orginalRequest.headers.Authorization = `Berrar Token ${token}`;
            return axios(orginalRequest);
          } catch (error) {
            console.log(error);
          }
        }

        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(interchepRequest);
      api.interceptors.request.eject(interchepResponse);
    };
  }, [auth.AuthToken]);

  return { api };
};
