import { Autocomplete, Box, Button, IconButton, Input, Menu, MenuItem, Paper, Popover, Select, Stack, TextField, Typography } from '@mui/material'
import css from './BoxSearchFlight.module.scss'
import FlightType from '../../lib/FlightType.type'
import { flightTypeState } from '../../common/states'
import { useAtom } from 'jotai'
export default function BoxSearchFlight () {
  return (
    <Box className={css.wrapper}>
      <Stack direction='row'>
        <SelectFlightType />
      </Stack>

    </Box>
  )
}

function SelectFlightType () {
  const [flightType, setFlightType] = useAtom(flightTypeState)
  return (
    <Select className={css.selectFlightType} value={flightType} label='Flight type' onChange={(evt) => setFlightType(evt.target.value as FlightType)} autoWidth size='small'>
      <MenuItem value='oneway'>One way</MenuItem>
      <MenuItem value='roundtrip'>Round trip</MenuItem>
      <MenuItem value='multicity'>Multi-city</MenuItem>
    </Select>
  )
}
