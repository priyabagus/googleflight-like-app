import Airport from '@/lib/types/Airport.type'
import getCachedSearchAirports from '@/lib/utils/cache/getCachedSearchAirports'
import setCachedSearchLocation from '@/lib/utils/cache/setCachedSearchAirports'
import { Autocomplete, TextField } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import capitalize from 'lodash/capitalize'
import { destinationAirportState, errorInputState, originAirportState } from '@/common/states'
import { useAtom } from 'jotai'

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
          (async () => {
            // shown "Loading..." text to let user know there is a process happening
            setTextNoOptions('Loading...')

            // do fetch
            const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${value}`
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
                'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
              }
            })
            const result = await response.json()

            if (result.status === true) {
              // map result into our Airport type
              const airports: Airport[] = []
              const skyAirports:any[] = result.data
              skyAirports.forEach(skyAirport => {
                airports.push({
                  skyId: skyAirport.navigation.relevantFlightParams.skyId,
                  entityId: skyAirport.entityId,
                  title: skyAirport.presentation.title,
                  suggestionTitle: skyAirport.presentation.suggestionTitle,
                  entityType: skyAirport.navigation.entityType,
                  country: skyAirport.presentation.subtitle
                })
              })

              // save to cache
              setCachedSearchLocation(value, airports)
              // make it as our shown options
              setOptions(airports)
              // change no options text from "Loading..." to "No options" (if there is no options to be shown)
              setTextNoOptions('No options')
            }
          })()
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
