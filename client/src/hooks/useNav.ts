import { useCallback } from "react";

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
  const [navState, setNavState, resetNavState] = useNavStore((state) => [
    state.navState,
    state.setNavState,
    state.resetNavState,
  ]);
  const isOpened = !MINIMUM_NAV_STATE.includes(navState);
  const isSearching = navState === NAV_STATE.SEARCH;
  const isWriting = navState === NAV_STATE.SEARCH;
  const isBookmarking = navState === NAV_STATE.SEARCH;
  const isProfile = navState === NAV_STATE.SEARCH;
  const isSetting = navState === NAV_STATE.SEARCH;

  // 네비게이션 바 컴포넌트 최소화
  const handleNavClose: NavClickHandler = useCallback(
    (fn) => {
      resetNavState();
      if (fn !== undefined) {
        fn();
      }
    },
    [resetNavState]
  );

  // 검색 로직 실행
  const handleSearch: NavClickHandler = useCallback(
    (fn) => {
      setNavState(NAV_STATE.SEARCH);
      if (fn !== undefined) {
        fn();
      }
    },
    [setNavState]
  );

  // 새 포스트 로직 실행
  const handleWrite: NavClickHandler = useCallback(
    (fn) => {
      setNavState(NAV_STATE.WRITE);
      if (fn !== undefined) {
        fn();
      }
    },
    [setNavState]
  );

  // 북마크 보기 로직 실행
  const handleBookmark: NavClickHandler = useCallback(
    (fn) => {
      setNavState(NAV_STATE.BOOKMARK);
      if (fn !== undefined) {
        fn();
      }
    },
    [setNavState]
  );

  // 프로필 로직 실행
  const handleProfile: NavClickHandler = useCallback(
    (fn) => {
      setNavState(NAV_STATE.PROFILE);
      if (fn !== undefined) {
        fn();
      }
    },
    [setNavState]
  );

  // 환경설정 로직 실행
  const handleSetting: NavClickHandler = useCallback(
    (fn) => {
      setNavState(NAV_STATE.SETTING);
      if (fn !== undefined) {
        fn();
      }
    },
    [setNavState]
  );

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
