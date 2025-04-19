import { Box, Stack } from '@mui/material'
import css from './BoxSearchFlight.module.scss'
import SelectFlightType from './SelectFlightType'
import SelectCabinClass from './SelectCabinClass'
import PassengerOptions from './PassengerOptions'
import SelectAirport from './SelectAirport'
export default function BoxSearchFlight () {
  return (
    <Box className={css.wrapper}>
      <Stack direction='row'>
        <SelectFlightType />
        <PassengerOptions />
        <SelectCabinClass />
      </Stack>

      <Stack direction='row'>
        <SelectAirport type='origin' />
      </Stack>
    </Box>
  )
}
