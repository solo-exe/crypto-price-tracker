import { useState, useEffect } from 'react';
import { fetchCryptos } from '../api/coinGecko'
import CryptoCard from '../components/CryptoCard';

const Home = () => {
    const [cryptoList, setCryptoList] = useState([]);

    const [filteredList, setFilteredList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState("list");
    const [sortBy, setSortBy] = useState("market_cap_rank");
    const [searchQuery, setSearchQuery] = useState("");

    const fetchCryptoData = async () => {
        try {
            const data = await fetchCryptos();
            setCryptoList(data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    const filterAndSort = () => {
        const filtered = cryptoList
            .filter((crypto) => (
                crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
            ));

        filtered.sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return String(a.name).localeCompare(b.name);
                case "price":
                    return a.current_price - b.current_price
                case "price_desc":
                    return b.current_price - a.current_price
                case "change":
                    return a.price_change_percentage_24h - b.price_change_percentage_24h
                case "change_desc":
                    return b.price_change_percentage_24h - a.price_change_percentage_24h
                case "market_cap":
                    return a.market_cap - b.market_cap
                default:
                    return a.market_cap_rank - b.market_cap_rank
            }
        })
        setFilteredList(filtered);
    }

    useEffect(() => {
        // If we have already fetched, stop here.
        // if (hasFetched.current) return;
        const interval = setInterval(fetchCryptoData, 30000);
        // hasFetched.current = true; // Mark as fetched
        return (() => clearInterval(interval))
    }, [])

    useEffect(() => {
        filterAndSort();
    }, [sortBy, cryptoList, searchQuery])

    return (
        <div className='app'>

            <header className='header'>
                <div className="header-content">
                    <div className="logo-section">
                        <h1>🚀 Crypto Tracker</h1>
                        <p>Real-time cryptocurrentcy prices and market data</p>
                    </div>
                    <div className="search-section">
                        <input
                            type="text"
                            placeholder='Search cryptos...'
                            className='search-input'
                            onChange={(e) => setSearchQuery(e.target.value)}
                            value={searchQuery}
                        />
                    </div>
                </div>
            </header>

            <div className="controls">
                <div className="filter-group">
                    <label htmlFor="select-sort">Sort by:</label>
                    <select
                        value={sortBy}
                        name="filter-select"
                        id="select-sort"
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="market_cap_rank">Ranks</option>
                        <option value="name">Name</option>
                        <option value="price">Price (Low to High)</option>
                        <option value="price_desc">Price (High to Low)</option>
                        <option value="change">24h Change (Low to High)</option>
                        <option value="change_desc">24h Change (High to Low)</option>
                        <option value="market_cap">Market Cap</option>
                    </select>
                </div>
                <div className="view-toggle">
                    <button
                        className={viewMode === "grid" ? "active" : ""}
                        onClick={() => setViewMode("grid")}>
                        Grid
                    </button>
                    <button
                        className={viewMode === "list" ? "active" : ""}
                        onClick={() => setViewMode("list")}>
                        List
                    </button>
                </div>
            </div>

            {isLoading
                ? (
                    <div className='loading'>
                        <div className="spinner" />
                        <p>Loading crypto data...</p>
                    </div>
                ) : (
                    <div className={`crypto-container ${viewMode}`}>
                        {filteredList.map((crypto, key) => (
                            < CryptoCard key={key} crypto={crypto} />
                        ))}
                    </div>
                )
            }
            <footer className="footer">
                <p>Data provided by CoinGecko API • Updated every 30 seconds</p>
            </footer>
        </div>
    )
}

export default Home