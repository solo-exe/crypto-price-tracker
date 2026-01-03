const BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchCryptos = async (currency = 'usd', page = 1, perPage = 100, order = 'market_cap_desc', search = '', sparkline = false) => {
    const response = await fetch(`${BASE_URL}/coins/markets?vs_currency=${currency}&order=${order}&per_page=${perPage}&page=${page}&sparkline=${sparkline}`)

    if (!response.ok) {
        throw new Error("Failed to fetch cryptos");
    }

    return response.json();
}

// export const fetchCoinData = async (id, localization = false, tickers = false, market_data = true, community_data = false, developer_data = false, sparkline = false) => {
//     const query = `localization=${localization}&tickers=${tickers}&market_data=${market_data}&community_data=${community_data}&developer_data=${developer_data}&sparkline=${sparkline}`

//     const url = `${BASE_URL}/coins/${id}?${query}`

//     console.log(url)

//     const response = await fetch(url);

//     console.log(response)

//     if (!response.ok) {
//         throw new Error("Failed to fetch coin data");
//     }

//     return response;
// };

export const fetchCoinData = async (id) => {
    const response = await fetch(
        `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch coin data");
    }
    return response.json();
};