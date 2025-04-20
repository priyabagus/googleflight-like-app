import { flightTypeState } from '@/common/states'
import { MenuItem, Select } from '@mui/material'
import { useAtom } from 'jotai'
import css from './SelectFlightType.module.scss'
import FlightType from '@/lib/types/FlightType.type'

export default function SelectFlightType () {
  const [flightType, setFlightType] = useAtom(flightTypeState)
  return (
    <Select className={css.selectFlightType} value={flightType} label='Flight Type' onChange={(evt) => setFlightType(evt.target.value as FlightType)} autoWidth size='small'>
      <MenuItem value='oneway'>One way</MenuItem>
      <MenuItem value='roundtrip'>Round trip</MenuItem>
    </Select>
  )
}
