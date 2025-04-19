import { cabinClassState } from '@/common/states'
import CabinClass from '@/lib/types/CabinClass.type'
import { MenuItem, Select } from '@mui/material'
import { useAtom } from 'jotai'
import css from './SelectCabinClass.module.scss'

export default function SelectCabinClass () {
  const [cabinClass, setCabinClass] = useAtom(cabinClassState)
  return (
    <Select className={css.selectCabinClass} value={cabinClass} label='Cabin' onChange={(evt) => setCabinClass(evt.target.value as CabinClass)} autoWidth>
      <MenuItem value='economy'>Economy</MenuItem>
      <MenuItem value='premium_economy'>Premium Economy</MenuItem>
      <MenuItem value='business'>Business</MenuItem>
      <MenuItem value='first'>First Class</MenuItem>
    </Select>
  )
}
