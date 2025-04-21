/**
 * Airport type used in our app. We take properties from RapidAPI that we need (not everything)
 */
type Airport = {
  skyId: string
  entityId: string,
  entityType: 'AIRPORT' | 'CITY'
  title: string,
  /** title in autosuggest(autocomplete) */
  suggestionTitle: string,
  country: string
}

export default Airport
