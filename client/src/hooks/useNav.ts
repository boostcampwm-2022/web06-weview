import { useCallback } from "react";

import useNavStore, { NAV_STATE, NAV_STATE_TYPE } from "@/store/useNavStore";

type NavClickHandler = (fn?: Function) => void;

interface UseNavResult {
  navState: NAV_STATE_TYPE;
  isOpened: boolean;
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

  const handleBookmark: NavClickHandler = useCallback(
    (fn) => {
      setNavState(NAV_STATE.BOOKMARK);
      if (fn !== undefined) {
        fn();
      }
    },
    [setNavState]
  );

  const handleProfile: NavClickHandler = useCallback(
    (fn) => {
      setNavState(NAV_STATE.PROFILE);
      if (fn !== undefined) {
        fn();
      }
    },
    [setNavState]
  );

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
    handleNavClose,
    handleSearch,
    handleWrite,
    handleBookmark,
    handleProfile,
    handleSetting,
  };
};

export default useNav;
