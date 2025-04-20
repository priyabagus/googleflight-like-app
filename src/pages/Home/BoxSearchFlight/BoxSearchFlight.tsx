import { Box, Button, IconButton, Stack } from '@mui/material'
import css from './BoxSearchFlight.module.scss'
import SelectFlightType from './SelectFlightType'
import SelectCabinClass from './SelectCabinClass'
import PassengerOptions from './PassengerOptions'
import SelectAirport from './SelectAirport'
import { SwapHoriz } from '@mui/icons-material'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { adultCountState, cabinClassState, childrenCountState, departureDateTimestampState, destinationAirportState, errorInputState, flightTypeState, infantCountState, originAirportState, returnDateTimestampState } from '@/common/states'
import DatePickerFlightDate from './DatePickerFlightDate'
import { useEffect, useState } from 'react'
import querystring from 'query-string'
import dayjs from 'dayjs'
import Itinerary from '@/lib/types/Itineraries.type'
import ResponseSearchFlight from '@/lib/types/ResponseSearchFlight.type'

export default function BoxSearchFlight () {
  const originAirport = useAtomValue(originAirportState)
  const destinationAirport = useAtomValue(destinationAirportState)
  const departureDateTimestamp = useAtomValue(departureDateTimestampState)
  const returnDateTimestamp = useAtomValue(returnDateTimestampState)
  const flightType = useAtomValue(flightTypeState)
  const cabinClass = useAtomValue(cabinClassState)
  const adultCount = useAtomValue(adultCountState)
  const childrenCount = useAtomValue(childrenCountState)
  const infantCount = useAtomValue(infantCountState)
  const setErrorInput = useSetAtom(errorInputState)

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    console.log('handle submit')

    // validate
    if (!originAirport) { setErrorInput(latestState => ({ ...latestState, origin: 'Please select valid origin airport' })) }
    if (!destinationAirport) { setErrorInput(latestState => ({ ...latestState, destination: 'Please select valid destination airport' })) }
    if (!departureDateTimestamp) { setErrorInput(latestState => ({ ...latestState, departure: 'Please select valid departure date' })) }
    if (flightType === 'roundtrip' && !returnDateTimestamp) { setErrorInput(latestState => ({ ...latestState, return: 'Please select valid return date' })) }

    // process if all inputs are okay
    if (originAirport && destinationAirport && departureDateTimestamp && (flightType !== 'roundtrip' || returnDateTimestamp)) {
      console.log('all inputs are okay')

      // prepare query parameters for fetch API /searchFlight (v1)
      const queryParam = {
        originSkyId: originAirport.skyId,
        destinationSkyId: destinationAirport.skyId,
        originEntityId: originAirport.entityId,
        destinationEntityId: destinationAirport.entityId,
        date: dayjs(departureDateTimestamp).format('YYYY-MM-DD'),
        cabinClass,
        adults: adultCount,
        childrens: childrenCount,
        infants: infantCount,
        limit: 30
      }
      // add return date if roundtrip
      if (flightType === 'roundtrip') {
        type RoundTripQueryParam = typeof queryParam & { returnDate?: string }
        (queryParam as RoundTripQueryParam).returnDate = dayjs(returnDateTimestamp).format('YYYY-MM-DD')
      }

      setIsLoading(true)

      try {
        // fetch
        (async () => {
          const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights?${querystring.stringify(queryParam)}`
          console.log('url:', url)
          console.log('rapidapikey:', import.meta.env.VITE_RAPID_API_KEY)
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
              'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
            }
          })
          const result = await response.json() as ResponseSearchFlight
          console.log(result)
          setIsLoading(false)
        })()
      } catch (err) {
        console.error(err)
        setIsLoading(false)
      }
    }
  }

  return (
    <Box className={css.boxSearchFlightWrapper}>
      <form onSubmit={handleSubmit}>
        <StackFlightOptions />

        <StackFlightRoute />

        <StackFlightDate />

        <Box className={css.searchButtonWrapper}>
          <Button variant='contained' type='submit' loading={isLoading}>Search</Button>
        </Box>
      </form>
    </Box>
  )
}

function StackFlightOptions () {
  return (
    <Stack className={css.stackFlightOptionsWrapper} direction='row'>
      <SelectFlightType />
      <PassengerOptions />
      <SelectCabinClass />
    </Stack>
  )
}

function StackFlightRoute () {
  return (
    <Stack className={css.stackFlightRouteWrapper} direction='row'>
      <SelectAirport type='origin' />
      <IconButton><SwapHoriz /></IconButton>
      <SelectAirport type='destination' />
    </Stack>
  )
}

function StackFlightDate () {
  const flightType = useAtomValue(flightTypeState)
  const departureDateTimestamp = useAtomValue(departureDateTimestampState)
  const [returnDateTimestamp, setReturnDateTimestamp] = useAtom(returnDateTimestampState)

  useEffect(function returnDateNotBeforeDepartureDate () {
    if (flightType === 'roundtrip' && departureDateTimestamp > returnDateTimestamp) {
      setReturnDateTimestamp(departureDateTimestamp)
    }
  }, [flightType, departureDateTimestamp])

  return (
    <Stack className={css.stackFlightDateWrapper} direction='row'>
      <DatePickerFlightDate type='departure' />
      {flightType === 'roundtrip' && <DatePickerFlightDate type='return' />}
    </Stack>
  )
}
