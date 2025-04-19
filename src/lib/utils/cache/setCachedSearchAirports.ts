import Airport from '@/lib/types/Airport.type'

export default function setCachedSearchLocation (keyword:string, airports: Airport[]) {
  localStorage.setItem(`search-airports-${keyword}`, JSON.stringify(airports))
}
