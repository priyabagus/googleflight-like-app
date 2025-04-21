import Airport from '@/lib/types/Airport.type'
import ResponseSearchAirports from '@/lib/types/ResponseSearchAirports.type'

/**
 * Fetch RapidAPI, looking for airports data based on specified searched string
 * @param searchedString
 * @returns
 */
export default async function searchAirports (searchedString:string):Promise<Airport[]> {
  const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${searchedString}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
      'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
    }
  })
  const result = await response.json() as ResponseSearchAirports
  const airports: Airport[] = []
  result.data.forEach(dataItem => {
    airports.push({
      skyId: dataItem.navigation.relevantFlightParams.skyId,
      entityId: dataItem.navigation.entityId,
      title: dataItem.presentation.title,
      suggestionTitle: dataItem.presentation.suggestionTitle,
      entityType: dataItem.navigation.entityType as 'AIRPORT' | 'CITY',
      country: dataItem.presentation.subtitle
    })
  })

  return airports
}
