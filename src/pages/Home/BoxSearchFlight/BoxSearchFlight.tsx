import { Box, Button, IconButton, Stack } from '@mui/material'
import css from './BoxSearchFlight.module.scss'
import SelectFlightType from './SelectFlightType'
import SelectCabinClass from './SelectCabinClass'
import PassengerOptions from './PassengerOptions'
import SelectAirport from './SelectAirport'
import { SwapHoriz } from '@mui/icons-material'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { departureDateTimestampState, destinationAirportState, errorInputState, flightTypeState, originAirportState, returnDateTimestampState } from '@/common/states'
import DatePickerFlightDate from './DatePickerFlightDate'
import { useEffect } from 'react'

export default function BoxSearchFlight () {
  const originAirport = useAtomValue(originAirportState)
  const destinationAirport = useAtomValue(destinationAirportState)
  const departureDateTimestamp = useAtomValue(departureDateTimestampState)
  const returnDateTimestamp = useAtomValue(returnDateTimestampState)
  const flightType = useAtomValue(flightTypeState)
  const setErrorInput = useSetAtom(errorInputState)

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
    }
  }

  return (
    <Box className={css.boxSearchFlightWrapper}>
      <form onSubmit={handleSubmit}>
        <StackFlightOptions />

        <StackFlightRoute />

        <StackFlightDate />

        <Box className={css.searchButtonWrapper}>
          <Button variant='contained' type='submit'>Search</Button>
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
