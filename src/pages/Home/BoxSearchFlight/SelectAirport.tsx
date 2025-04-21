import Airport from '@/lib/types/Airport.type'
import getCachedSearchAirports from '@/lib/utils/cache/getCachedSearchAirports'
import setCachedSearchLocation from '@/lib/utils/cache/setCachedSearchAirports'
import { Autocomplete, TextField } from '@mui/material'
import { SyntheticEvent, useCallback, useState } from 'react'
import capitalize from 'lodash/capitalize'
import { destinationAirportState, errorInputState, originAirportState } from '@/common/states'
import { useAtom } from 'jotai'
import searchAirports from '@/lib/services/fetchRapidAPI/searchAirports'
import debounce from 'lodash/debounce'

type SelectAirportProps = {
  type: 'origin' | 'destination'
}
export default function SelectAirport (props:SelectAirportProps) {
  const [selectedAirport, setSelectedAirport] = useAtom(props.type === 'origin' ? originAirportState : destinationAirportState)
  const [errorInput, setErrorInput] = useAtom(errorInputState)

  const [options, setOptions] = useState<any>([])
  const [textNoOptions, setTextNoOptions] = useState<string>('Type at least 3 characters')

  // filterOptions for MUI's AutoComplete component
  const filterOptions = (options: Airport[], state: any) => {
    return options
  }

  /** function to get Option from fetching RapidAPI */
  const getOptionsFromFetchingAPI = (searchedString:string) => {
    (async () => {
    // shown "Loading..." text to let user know there is a process happening
      setTextNoOptions('Loading...')
      // do fetch
      const airports = await searchAirports(searchedString)
      // make it as our shown options
      setOptions(airports)
      // change no options text from "Loading..." to "No options" (if there is no options to be shown)
      setTextNoOptions('No options')
      // save to cache
      setCachedSearchLocation(searchedString, airports)
    })()
  }
  /** Debounced search Airport for getting options */
  const debouncedSearchAirports = useCallback(debounce(getOptionsFromFetchingAPI, 1000), [])

  // handleInputChange for MUI's AutoComplete component
  const handleInputChange = (evt: React.SyntheticEvent, value: string, reason: string) => {
    value = value.toLowerCase()

    if (!value || value.length < 3) {
      setOptions([])
      setTextNoOptions('Type at least 3 characters')
    }

    if (reason === 'input' && value.length >= 3) {
      try {
        // try find from cached search first
        const cachedSearch = getCachedSearchAirports(value)

        if (cachedSearch) {
          // if exist in cache, use it as our shown options
          setOptions(cachedSearch)
        } else {
          // if not exist in cache, fetch data from API
          debouncedSearchAirports(value)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleChangeSelectedValue = (evt:SyntheticEvent<Element, Event>, newValue:Airport | null) => {
    // set selected airport
    setSelectedAirport(newValue)
    // remove error
    setErrorInput(latestState => ({ ...latestState, [props.type]: null }))
  }

  return (
    <>
      <Autocomplete
        disablePortal options={options} filterOptions={filterOptions} onInputChange={handleInputChange} fullWidth
        value={selectedAirport} onChange={handleChangeSelectedValue}
        getOptionLabel={(option:Airport) => option.suggestionTitle}
        groupBy={(option:Airport) => option.country}
        noOptionsText={textNoOptions}
        renderInput={(params) => <TextField {...params} required label={capitalize(props.type)} error={!!errorInput[props.type]} />}
      />
    </>
  )
}
