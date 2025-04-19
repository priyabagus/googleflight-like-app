import Airport from '@/lib/types/Airport.type'
import getCachedSearchAirports from '@/lib/utils/cache/getCachedSearchAirports'
import setCachedSearchLocation from '@/lib/utils/cache/setCachedSearchAirports'
import { Autocomplete, TextField } from '@mui/material'
import { useState } from 'react'
import capitalize from 'lodash/capitalize'

type SelectAirportProps = {
  type: 'origin' | 'destination'
}
export default function SelectAirport (props:SelectAirportProps) {
  const [options, setOptions] = useState<any>([])
  const [textNoOptions, setTextNoOptions] = useState<string>('Type at least 3 characters')

  const filterOptions = (options: Airport[], state: any) => {
    return options
  }

  const handleInputChange = (evt: React.SyntheticEvent, value: string, reason: string) => {
    value = value.toLowerCase()

    if (!value || value.length < 3) {
      setOptions([])
      setTextNoOptions('Type at least 3 characters')
    }

    if (reason === 'input' && value.length >= 3) {
      try {
        // find from cached search first
        const cachedSearch = getCachedSearchAirports(value)

        if (cachedSearch) {
          setOptions(cachedSearch)
        } else {
          // fetch data from api if not exist in search
          (async () => {
            setTextNoOptions('Loading...')
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
              setOptions(airports)
              setTextNoOptions('No options')
            }
          })()
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <Autocomplete
      disablePortal options={options} filterOptions={filterOptions} fullWidth onInputChange={handleInputChange}
      getOptionLabel={(option:Airport) => option.suggestionTitle}
      groupBy={(option:Airport) => option.country}
      noOptionsText={textNoOptions}
      renderInput={(params) => <TextField {...params} label={capitalize(props.type)} />}
    />
  )
}
