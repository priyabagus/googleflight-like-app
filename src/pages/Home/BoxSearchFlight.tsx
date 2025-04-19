import { Autocomplete, Box, Button, IconButton, Input, Menu, MenuItem, Paper, Popover, Select, Stack, TextField, Typography } from '@mui/material'
import css from './BoxSearchFlight.module.scss'
import clsx from 'clsx'
import { useState } from 'react'
import FlightType from '../../lib/FlightType.type'
import { flightTypeState } from '../../common/states'
import { useAtom } from 'jotai'
import { Add, ArrowDropDown, PersonOutline, Remove, TripOrigin } from '@mui/icons-material'
import CabinClass from '../../lib/CabinClass.type'
export default function BoxSearchFlight () {
  return (
    <Box className={css.wrapper}>
      <Stack direction='row'>
        <SelectFlightType />
        <PassengerOptions />
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
