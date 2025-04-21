import CabinClass from '@/lib/types/CabinClass.type'
import ResponseSearchFlight from '@/lib/types/ResponseSearchFlights.type'
import pause from '@/lib/utils/time/pause'
import querystring from 'query-string'

export type SearchFlightParam = {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  cabinClass: CabinClass;
  adults: number;
  childrens: number;
  infants: number;
  limit: number;
  returnDate?: string; // only add 'returnDate' if roundtrip
}

export default async function searchFlights (param:SearchFlightParam) : Promise<ResponseSearchFlight> {
  const maxRetry = 5
  let counter = 0
  let result:ResponseSearchFlight
  do {
    counter++

    // give some pause between retry
    if (counter > 1) {
      await pause(500)
    }

    console.log('search-', counter)
    const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights?${querystring.stringify(param)}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
      }
    })
    result = await response.json() as ResponseSearchFlight
    console.log('result.data.context.status:', result.data.context.status)
  } while (counter < maxRetry && result.data.context.status === 'failure')

  return result
}
