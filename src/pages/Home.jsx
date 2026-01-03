import { useState, useEffect, useRef } from 'react';
import { fetchCryptos } from '../api/coinGecko'
import CryptoCard from '../components/CryptoCard';

const Home = () => {
    const [cryptoList, setCryptoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const hasFetched = useRef(false); // Track if fetch has run

    const fethCryptoData = async () => {
        try {
            const data = await fetchCryptos();
            setCryptoList(data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        // If we have already fetched, stop here.
        if (hasFetched.current) return;

        fethCryptoData();
        hasFetched.current = true; // Mark as fetched
    }, [])

    console.log(cryptoList, "<<<<< CRYPTO LIST")
    return (
        <div className='app'>
            <div className="controls">
                <div className="filter-group"></div>
                <div className="view-toggle"></div>
            </div>

            {isLoading
                ? (
                    <div className='loading'>
                        <div className="spinner" />
                        <p>Loading crypto data...</p>
                    </div>
                ) : (
                    <div className='crypto-container'>
                        {cryptoList.map((crypto, key) => (
                            < CryptoCard key={key} crypto={crypto} />
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default Home