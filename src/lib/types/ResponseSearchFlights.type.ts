import Itinerary from './Itinerary.type'

type Carrier = {
  id: number,
  alternateId: string,
  logoUrl: string,
  name: string
}
type CityAirport = {
  id: string,
  entityId: string,
  name: string
}
type FilterAirport = {
  city: string,
  airports: CityAirport[]
}

/** Response of RapidAPI SearchFlight (version-1)  */
type ResponseSearchFlights = {
  status: boolean
  timestamp: number
  sessionId: string
  data: {
    context: {
      sessionId?: string
      status: string
      totalResults: number
    }
    itineraries: Itinerary[]
    filterStats: {
      duration: {
        min: number
        max: number
        multiCityMin?: number
        multiCityMax?: number
      },
      airports: FilterAirport[]
      carriers: Carrier[]
      stopPrices: {
        direct: {
          formattedPrice: string
          isPresent: boolean
        }
        one: {
          formattedPrice: string
          isPresent: boolean
        }
        twoOrMore: {
          formattedPrice: string
          isPresent: boolean
        }
      }
    }
  }
}

export default ResponseSearchFlights
