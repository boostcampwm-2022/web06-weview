import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/react-query/queryKeys";
import { getRankingAPI } from "@/apis/ranking";

interface UseRanking {
  rankingData: Array<{
    name: string;
    prev: number;
  }>;
  isStaggering: boolean;
}

const useRanking = (): UseRanking => {
  const [isStaggering, setIsStaggering] = useState(false);
  const { isFetching, data: rankingData = [] } = useQuery(
    [QUERY_KEYS.RANKING],
    getRankingAPI,
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      refetchInterval: 1000 * 10, // 10초
    }
  );

  useEffect(() => {
    setIsStaggering(true);
    const id = setTimeout(() => {
      setIsStaggering(false);
    }, 5000);
    return () => clearTimeout(id);
  }, [isFetching]);

  return { rankingData, isStaggering };
};

export default useRanking;
