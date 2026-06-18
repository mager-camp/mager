import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

const getAthletes = async () => {
  const { data } = await api.get('/athletes');
  return data.data;
};

export function useAthletes() {
  return useQuery({
    queryKey: ['athletes'],
    queryFn: getAthletes,
    staleTime: 1000 * 60 * 2,
  });
}