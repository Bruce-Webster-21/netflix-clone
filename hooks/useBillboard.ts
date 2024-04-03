import useSWR from "swr"; //https://swr.vercel.app/
import fetcher from "@/lib/fetcher";

const useBillboard = () => {
  const { data, error, isLoading } = useSWR("/api/random", fetcher, {
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

export default useBillboard;
