import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovieList = () => {
  const { data, error, isLoading } = useSWR("api/movies", fetcher, {
    // This makes it so that the user will not get a random movie url any time any of these happen (https://swr.vercel.app/docs/api.en-US#options)
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useMovieList;
