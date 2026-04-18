import { create } from 'zustand';
import axios, { isAxiosError } from 'axios';
import type { Coin } from '../types/crypto';

interface CoinState {
  coins: Coin[];
  isLoading: boolean;
  error: string | null;
  fetchCoins: () => Promise<void>;
}

export const useCoinStore = create<CoinState>((set) => ({
  coins: [],
  isLoading: false,
  error: null,
  fetchCoins: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 20,
            page: 1,
            sparkline: false,
          }
        }
      );
      set({ coins: response.data, isLoading: false });
    } catch (err) {
      let message = 'Failed to fetch coins. Check your wifi.';

      if (isAxiosError(err)) {
                message = err.response?.status === 429 
          ? 'Rate limited. Stop refreshing like a maniac.' 
          : err.message;
      }

      set({ error: message, isLoading: false });
    }
  },
}));