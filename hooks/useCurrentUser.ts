// The name “SWR” is derived from stale-while-revalidate, a HTTP cache invalidation strategy popularized by HTTP RFC 5861.
// SWR is a strategy to first return the data from cache (stale), then send the fetch request (revalidate), and finally come with the up-to-date data.
// https://www.freecodecamp.org/news/swr-library-for-data-fetching-in-react/#:~:text=The%20name%20%E2%80%9CSWR%E2%80%9D%20is%20derived,up%2Dto%2Ddate%20data.

import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
