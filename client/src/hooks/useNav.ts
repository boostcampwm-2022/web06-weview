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

// 사용 시 사이드바를 최소화하는 상태 목록
const MINIMUM_NAV_STATE: NAV_STATE_TYPE[] = [
  NAV_STATE.SEARCH,
  NAV_STATE.PROFILE,
];

const useNav = (): UseNavResult => {
  const [navState, setNavState] = useNavStore((state) => [
    state.navState,
    state.setNavState,
  ]);

  const handleNav =
    (newNavState: NAV_STATE_TYPE) => (fn: Function | undefined) => {
      setNavState(newNavState);
      if (fn !== undefined) {
        fn();
      }
    };

  const isOpened = !MINIMUM_NAV_STATE.includes(navState);
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
