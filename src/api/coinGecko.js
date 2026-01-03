const BASE_URL = "api";

export const fetchCryptos = async (currency = 'usd', page = 1, perPage = 100, order = 'market_cap_desc', search = '', sparkline = false) => {
    const response = await fetch(`${BASE_URL}/coins/markets?vs_currency=${currency}&order=${order}&per_page=${perPage}&page=${page}&sparkline=${sparkline}`)

    if (!response.ok) {
        throw new Error("Failed to fetch cryptos");
    }

    return response.json();
}