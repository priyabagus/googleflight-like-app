import { ArrowDropDown, PersonOutline } from '@mui/icons-material'
import { Button, Input, Paper, Popover, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import css from './PassengerOptions.module.scss'

export default function PassengerOptions () {
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
