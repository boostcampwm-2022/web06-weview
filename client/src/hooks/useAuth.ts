import useAuthStore from "@/store/useAuthStore";
import useGithubOAuth from "@/hooks/OAuth/useGithubOAuth";
import { logOutAPI } from "@/apis/auth";
import customLocalStorage from "@/utils/localStorage";
import axiosInstance from "@/apis/axios";
import { MyInfo } from "@/types/auth";

interface UseAuthResult {
  isLoggedIn: boolean;
  myInfo: MyInfo | null;
  handleLogin: () => void;
  handleLogout: () => void;
}

const useAuth = (): UseAuthResult => {
  const [myInfo, login, logout] = useAuthStore((state) => [
    state.myInfo,
    state.login,
    state.logout,
  ]);
  const { handleOpenGithubOAuthPopup } = useGithubOAuth(login);

  const isLoggedIn = myInfo !== null;

  const handleLogin = (): void => {
    handleOpenGithubOAuthPopup();
  };

  const handleLogout = (): void => {
    logOutAPI()
      .then(() => {
        customLocalStorage.removeItem("expiresIn");
        delete axiosInstance.defaults.headers.common.Authorization;
      })
      .catch((e) => console.log("로그아웃 실패", e))
      .finally(() => {
        logout();
      });
  };

  return { isLoggedIn, myInfo, handleLogin, handleLogout };
};

export default useAuth;
