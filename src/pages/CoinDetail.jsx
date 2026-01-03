import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { LineChart, ResponsiveContainer } from 'recharts';

import { fetchCoinData } from "../api/coinGecko";
import { formatPrice } from "../utils/formatter";

const CoinDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [coin, setCoin] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadCoinData = async () => {
        try {
            const data = await fetchCoinData(id);
            console.log(data);
            setCoin(data);
        } catch (error) {
            console.error("Error fetching coin: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCoinData();
    }, [id]);

    if (isLoading) {
        return (
            <div className="app">
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Loading coin data...</p>
                </div>
            </div>
        );
    }

    if (!coin) {
        return (
            <div className="app">
                <div className="no-results">
                    <p>Coin not found</p>
                    <button onClick={() => navigate("/")}>Go Back</button>
                </div>
            </div>
        );
    }

    const priceChange = coin.market_data.price_change_percentage_24h || 0;
    const isPositive = priceChange >= 0;

    return (
        <div className="app">
            <header className="header">
                <div className="header-content">
                    <div className="logo-section">
                        <h1>🚀 Crypto Tracker</h1>
                        <p>Real-time cryptocurrency prices and market data</p>
                    </div>

                    <button onClick={() => navigate("/")} className="back-button">
                        ← Back to List
                    </button>
                </div>
            </header>

            <div className="coin-detail">
                <div className="coin-header">
                    <div className="coin-title">
                        <img src={coin?.image.thumb} alt={coin.name} />
                        <div>
                            <h1>{coin.name}</h1>
                            <p className="symbol">{coin.symbol.toUpperCase()}</p>
                        </div>
                    </div>
                    <span>Rank #{coin.market_cap_rank}</span>
                </div>

                <div className="coin-price-section">
                    <div className="current_price">
                        <h2 className='price'>{formatPrice(coin.market_data.current_price.usd)}</h2>
                        <span className={`change-badge ${isPositive ? 'positive' : 'negative'}`}>
                            {isPositive ? "↑" : "↓"}{" "}
                            {Math.abs(priceChange).toFixed(2)}%
                        </span>
                    </div>
                </div>

                <div className="price-ranges">
                    <div className="price-range">
                        <span className="range-label">24 High</span>
                        <span className="range-value">{formatPrice(coin.market_data.high_24h.usd)}</span>
                    </div>
                    <div className="price-range">
                        <span className="range-label">24 Low</span>
                        <span className="range-value">{formatPrice(coin.market_data.low_24h.usd)}</span>
                    </div>
                </div>
            </div>

            <div className="chart-section">
                <h3>Price Chart (7 days)</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={ }>

                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default CoinDetail