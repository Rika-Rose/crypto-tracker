import { useState, useEffect, useMemo } from 'react';
import { useCoinStore } from '../store/useCoinStore';

export default function Table() {
  const { coins, isLoading, error, fetchCoins } = useCoinStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCoins = useMemo(() => {
    const input = searchTerm.toLowerCase();
    return coins.filter(coin => 
      coin.name.toLowerCase().includes(input) || 
      coin.symbol.toLowerCase().includes(input)
    );
  }, [coins, searchTerm]);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

 if (isLoading && coins.length === 0) {
    return <div className="p-10 text-white animate-pulse text-center">Syncing...</div>;
  }
  
  if (error && coins.length === 0) {
    return <div className="p-10 text-rose-500 font-bold text-center">{error}</div>;
  }

  return (
    <div className="w-full flex-1 bg-[#0f172a]/50 border border-[#1e293b] flex flex-col text-white">
      {/* Search Bar */}
      <div className="p-4 bg-[#0f172a]/40 border-b border-[#1e293b]">
        <input
          type="text"
          placeholder="Search assets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-64 bg-[#1e293b]/50 border border-[#334155] rounded-lg px-4 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
        />
      </div>

      {/*Header Row */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 px-6 py-4 text-slate-400 text-xs font-bold uppercase tracking-widest bg-[#0f172a]/80 border-b border-[#1e293b] sticky top-0 z-10">
        <div className="text-left">Asset</div>
        <div className="text-right">Price</div>
        <div className="text-right">24h %</div>
        <div className="text-right hidden md:block">Market Cap</div>
      </div>

      {/*Data Rows */}
      <div className="flex-1 flex flex-col bg-[#07111B] overflow-y-auto">
        {filteredCoins.map((coin) => (
          <div 
            key={coin.id} 
            className="grid grid-cols-3 md:grid-cols-4 gap-4 px-6 py-4 border-b border-slate-800/50 items-center hover:bg-emerald-950/10 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <img src={coin.image} alt={coin.name} className="w-6 h-6 object-contain" />
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{coin.name}</span>
                <span className="text-[10px] text-slate-500 uppercase">{coin.symbol}</span>
              </div>
            </div>

            <div className="text-right font-mono text-sm">
              ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>

            <div className={`text-right text-sm font-medium ${coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {coin.price_change_percentage_24h > 0 ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
            </div>

            <div className="text-right text-sm text-slate-400 hidden md:block">
              ${(coin.market_cap / 1e9).toFixed(2)}B
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}