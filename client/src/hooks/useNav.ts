import { useNavigate } from "react-router-dom";

import useNavStore, { NAV_STATE, NAV_STATE_TYPE } from "@/store/useNavStore";

type NavClickHandler = (fn?: Function) => void;

interface UseNavResult {
  navState: NAV_STATE_TYPE;
  isOpened: boolean;
  isSearching: boolean;
  isWriting: boolean;
  isBookmarking: boolean;
  isProfile: boolean;
  isSetting: boolean;
  handleNavClose: NavClickHandler;
  handleSearch: NavClickHandler;
  handleWrite: NavClickHandler;
  handleBookmark: NavClickHandler;
  handleProfile: NavClickHandler;
  handleSetting: NavClickHandler;
}

const useNav = (): UseNavResult => {
  const navigate = useNavigate();
  const [navState, setNavState] = useNavStore((state) => [
    state.navState,
    state.setNavState,
  ]);

  const handleNav =
    (newNavState: NAV_STATE_TYPE) => (fn: Function | undefined) => {
      navigate("/");
      const state = navState === newNavState ? NAV_STATE.DEFAULT : newNavState;
      setNavState(state);
      if (fn !== undefined) {
        fn();
      }
    };

  const isOpened = navState === NAV_STATE.DEFAULT;
  const isSearching = navState === NAV_STATE.SEARCH;
  const isWriting = navState === NAV_STATE.SEARCH;
  const isBookmarking = navState === NAV_STATE.SEARCH;
  const isProfile = navState === NAV_STATE.SEARCH;
  const isSetting = navState === NAV_STATE.SEARCH;
  const handleNavClose: NavClickHandler = handleNav(NAV_STATE.DEFAULT);
  const handleSearch: NavClickHandler = handleNav(NAV_STATE.SEARCH);
  const handleWrite: NavClickHandler = handleNav(NAV_STATE.WRITE);
  const handleBookmark: NavClickHandler = handleNav(NAV_STATE.BOOKMARK);
  const handleProfile: NavClickHandler = handleNav(NAV_STATE.PROFILE);
  const handleSetting: NavClickHandler = handleNav(NAV_STATE.SETTING);

  return {
    navState,
    isOpened,
    isSearching,
    isWriting,
    isBookmarking,
    isProfile,
    isSetting,
    handleNavClose,
    handleSearch,
    handleWrite,
    handleBookmark,
    handleProfile,
    handleSetting,
  };
};

export default useNav;
