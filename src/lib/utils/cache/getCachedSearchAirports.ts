import Airport from '@/lib/types/Airport.type'

/**
 * Get cached search airport into user's browser local storage, so we don't need to fetch API if this user is already searched the same strings before
 * @param searchedString
 * @returns
 */
export default function getCachedSearchAirports (searchedString: string): Airport[] | null {
  const airportsString = localStorage.getItem(`search-airports-${searchedString}`)
  if (airportsString) {
    return JSON.parse(airportsString)
  }
  return null
}
