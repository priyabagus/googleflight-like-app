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
