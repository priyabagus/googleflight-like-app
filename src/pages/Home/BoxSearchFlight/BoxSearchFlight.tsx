import { Box, Grid, IconButton, Stack } from '@mui/material'
import css from './BoxSearchFlight.module.scss'
import SelectFlightType from './SelectFlightType'
import SelectCabinClass from './SelectCabinClass'
import PassengerOptions from './PassengerOptions'
import SelectAirport from './SelectAirport'
import { SwapHoriz } from '@mui/icons-material'
import DatePickerDepartureDate from './DatePickerDepartureDate'

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

      <Stack className={css.stackFlightDateWrapper} direction='row'>
        <DatePickerDepartureDate />
      </Stack>
    </Box>
  )
}
