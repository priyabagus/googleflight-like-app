import { Box, Grid, IconButton, Stack } from '@mui/material'
import css from './BoxSearchFlight.module.scss'
import SelectFlightType from './SelectFlightType'
import SelectCabinClass from './SelectCabinClass'
import PassengerOptions from './PassengerOptions'
import SelectAirport from './SelectAirport'
import { SwapHoriz } from '@mui/icons-material'
import { useAtom, useAtomValue } from 'jotai'
import { departureDateTimestampState, flightTypeState, returnDateTimestampState } from '@/common/states'
import DatePickerFlightDate from './DatePickerFlightDate'
import { useEffect } from 'react'

export default function BoxSearchFlight () {
  return (
    <Box className={css.boxSearchFlightWrapper}>
      <Stack className={css.stackFlightOptionsWrapper} direction='row'>
        <SelectFlightType />
        <PassengerOptions />
        <SelectCabinClass />
      </Stack>

      <Stack className={css.stackFlightRouteWrapper} direction='row'>
        <SelectAirport type='origin' />
        <IconButton><SwapHoriz /></IconButton>
        <SelectAirport type='destination' />
      </Stack>

      <StackFlightDate />
    </Box>
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
