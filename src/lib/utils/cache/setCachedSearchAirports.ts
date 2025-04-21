import Airport from '@/lib/types/Airport.type'

/**
 * Write search airport into user's browser local storage for caching, so we don't need to fetch API if this user is already searched the same strings before
 * @param searchedString
 * @returns
 */
export default function setCachedSearchLocation (searchedString:string, airports: Airport[]) {
  localStorage.setItem(`search-airports-${searchedString}`, JSON.stringify(airports))
}
