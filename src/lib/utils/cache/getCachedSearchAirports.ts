import Airport from '@/lib/types/Airport.type'

export default function getCachedSearchAirports (keyword: string): Airport[] | null {
  const airportsString = localStorage.getItem(`search-airports-${keyword}`)
  if (airportsString) {
    return JSON.parse(airportsString)
  }
  return null
}
