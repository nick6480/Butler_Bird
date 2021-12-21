import axios from 'axios';

import { useEffect,  useState} from 'react';



export const fetchCompany = async () => {

    const URL = 'https://butlerbird.herokuapp.com/company/get';

    const { data } = await axios.get(URL)

    return data;
}




export const fetchSettings = async () => {

    const URL = 'https://butlerbird.herokuapp.com/settings/get';

    const { data } = await axios.get(URL)

    return data;
}



export function FetchContent(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [content, setContent] = useState([])
  const [hasMore, setHasMore] = useState(false)

  //const URL = 'https://butlerbird.herokuapp.com/data/get'
  const URL = 'http://localhost:4000/data/get'


  useEffect(() => {
    setContent([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    console.log("SEND");
    axios({
      method: 'GET',
      url: URL,
      params: { q: query, page: pageNumber, id: '61b69314c7b6ccf56a46e34e'},
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setContent(prevContent => {
        return [...prevContent, ...res.data]
      })
      setHasMore(res.data.length > 0)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [pageNumber])

  return { loading, error, content, hasMore }
}




export const fetchWeather = async () => {

    const URL = 'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY = '61b69314c7b6ccf56a46e34e';

    const { data } = await axios.get(URL, {
        params: {
            q: 'london',
            units: 'metric',
            APPID: API_KEY,
        }
    });
    return data;
}
