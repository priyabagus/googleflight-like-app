import { Autocomplete, Box, Button, IconButton, Input, Menu, MenuItem, Paper, Popover, Select, Stack, TextField, Typography } from '@mui/material'
import css from './BoxSearchFlight.module.scss'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import FlightType from '../../lib/types/FlightType.type'
import { cabinClassState, flightTypeState } from '../../common/states'
import { useAtom } from 'jotai'
import { Add, ArrowDropDown, PersonOutline, Remove, TripOrigin } from '@mui/icons-material'
import CabinClass from '../../lib/types/CabinClass.type'
import debounce from 'lodash/debounce'
import getCachedSearchAirports from '@/lib/utils/cache/getCachedSearchAirports'
import Airport from '@/lib/types/Airport.type'
import setCachedSearchLocation from '@/lib/utils/cache/setCachedSearchAirports'
import { chain } from 'lodash'
export default function BoxSearchFlight () {
  return (
    <Box className={css.wrapper}>
      <Stack direction='row'>
        <SelectFlightType />
        <PassengerOptions />
        <SelectCabinClass />
      </Stack>

      <Stack direction='row'>
        <SelectOrigin />
      </Stack>
    </Box>
  )
}

function SelectFlightType () {
  const [flightType, setFlightType] = useAtom(flightTypeState)
  return (
    <Select className={css.selectFlightType} value={flightType} label='Flight Type' onChange={(evt) => setFlightType(evt.target.value as FlightType)} autoWidth size='small'>
      <MenuItem value='oneway'>One way</MenuItem>
      <MenuItem value='roundtrip'>Round trip</MenuItem>
      <MenuItem value='multicity'>Multi-city</MenuItem>
    </Select>
  )
}

function PassengerOptions () {
  // anchor for popover
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  // handle button click
  const handleButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(evt.currentTarget)
  }

  // handle popover close
  const handlePopoverClose = () => setAnchorEl(null)

  return (
    <>
      <Button variant='text' endIcon={<ArrowDropDown />} onClick={handleButtonClick}>
        <PersonOutline />
        <Typography>7</Typography>
      </Button>

      <Popover open={!!anchorEl} onClose={handlePopoverClose} anchorEl={anchorEl} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}>
        <Paper className={css.popoverBox}>
          <PassengerItemOption label='Adults' type='adults' />
          <PassengerItemOption label='Children' type='childrens' />
          <PassengerItemOption label='Infants' type='infants' />
        </Paper>
      </Popover>
    </>
  )
}

type PassengerItemOptionProps = {
  label: string
  type: 'adults' | 'childrens' | 'infants'
}
function PassengerItemOption (props:PassengerItemOptionProps) {
  return (
    <Stack className={css.passengerWrapper} direction='row'>
      <Typography>{props.label}</Typography>
      <Input className={css.passengerInput} type='number' size='small' inputProps={{ min: 0, max: 9 }} />
    </Stack>
  )
}

function SelectCabinClass () {
  const [cabinClass, setCabinClass] = useAtom(cabinClassState)
  return (
    <Select className={css.selectCabinClass} value={cabinClass} label='Cabin' onChange={(evt) => setCabinClass(evt.target.value as CabinClass)} autoWidth>
      <MenuItem value='economy'>Economy</MenuItem>
      <MenuItem value='premium_economy'>Premium Economy</MenuItem>
      <MenuItem value='business'>Business</MenuItem>
      <MenuItem value='first'>First Class</MenuItem>
    </Select>
  )
}

function SelectOrigin () {
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
      disablePortal options={options} filterOptions={filterOptions} sx={{ width: 300 }} onInputChange={handleInputChange}
      getOptionLabel={(option:Airport) => option.suggestionTitle}
      groupBy={(option:Airport) => option.country}
      noOptionsText={textNoOptions}
      renderInput={(params) => <TextField {...params} label='Origin' />}
    />
  )
}
