import { Box, Button, IconButton, Stack } from '@mui/material'
import css from './BoxSearchFlight.module.scss'
import SelectFlightType from './SelectFlightType'
import SelectCabinClass from './SelectCabinClass'
import PassengerOptions from './PassengerOptions'
import SelectAirport from './SelectAirport'
import { SwapHoriz } from '@mui/icons-material'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { adultCountState, cabinClassState, childrenCountState, departureDateTimestampState, destinationAirportState, errorInputState, flightTypeState, infantCountState, isShownFlightResultsState, itinerariesState, originAirportState, returnDateTimestampState } from '@/common/states'
import DatePickerFlightDate from './DatePickerFlightDate'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import searchFlights, { SearchFlightParam } from '@/lib/services/fetchRapidAPI/searchFlights'

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
  const setIsShownFlightResults = useSetAtom(isShownFlightResultsState)
  const setItineraries = useSetAtom(itinerariesState)

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
      // prepare query parameters for fetch API /searchFlight (v1)
      const searchFlightParam:SearchFlightParam = {
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
        searchFlightParam.returnDate = dayjs(returnDateTimestamp).format('YYYY-MM-DD')
      }

      setIsLoading(true)

      try {
        // fetch
        (async () => {
          const result = await searchFlights(searchFlightParam)
          setItineraries(result.data.itineraries)
          console.log(result)
          setIsLoading(false)
          setIsShownFlightResults(true)
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
  const [originAirport, setOriginAirport] = useAtom(originAirportState)
  const [destinationAirport, setDestinationAirport] = useAtom(destinationAirportState)
  const clonedOriginAirport = cloneDeep(originAirport)
  const handleSwapOriginDestination = () => {
    console.log('handleswap')
    setOriginAirport(destinationAirport)
    setDestinationAirport(clonedOriginAirport)
  }
  return (
    <Stack className={css.stackFlightRouteWrapper} direction='row'>
      <SelectAirport type='origin' />
      <IconButton onClick={handleSwapOriginDestination}><SwapHoriz /></IconButton>
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
