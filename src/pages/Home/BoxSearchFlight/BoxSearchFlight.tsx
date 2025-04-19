import { Box, Grid, IconButton, Stack } from '@mui/material'
import css from './BoxSearchFlight.module.scss'
import SelectFlightType from './SelectFlightType'
import SelectCabinClass from './SelectCabinClass'
import PassengerOptions from './PassengerOptions'
import SelectAirport from './SelectAirport'
import { SwapHoriz } from '@mui/icons-material'
export default function BoxSearchFlight () {
  return (
    <Box className={css.wrapper}>
      <Stack className={css.stackOptions} direction='row'>
        <SelectFlightType />
        <PassengerOptions />
        <SelectCabinClass />
      </Stack>

      <Stack direction='row'>
        <SelectAirport type='origin' />
        <IconButton><SwapHoriz /></IconButton>
        <SelectAirport type='destination' />
      </Stack>

    </Box>
  )
}
