import { ArrowDropDown, PersonOutline } from '@mui/icons-material'
import { Button, Input, Paper, Popover, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import css from './PassengerOptions.module.scss'
import { useAtom, useAtomValue } from 'jotai'
import { adultCountState, childrenCountState, infantCountState } from '@/common/states'

export default function PassengerOptions () {
  const totalPassengerCount = useAtomValue(adultCountState) + useAtomValue(childrenCountState) + useAtomValue(infantCountState)

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
        <Typography>{totalPassengerCount}</Typography>
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
  const [passengerCount, setPassengerCount] = useAtom(props.type === 'childrens' ? childrenCountState : props.type === 'infants' ? infantCountState : adultCountState)

  useEffect(function minimumOneAdult () {
    if (props.type === 'adults' && passengerCount < 1) {
      setPassengerCount(1)
    }
  }, [passengerCount])

  return (
    <Stack className={css.passengerWrapper} direction='row'>
      <Typography>{props.label}</Typography>
      <Input className={css.passengerInput} type='number' size='small' value={passengerCount} onChange={(evt) => setPassengerCount(parseInt(evt.target.value))} inputProps={{ min: 0, max: 9 }} />
    </Stack>
  )
}
