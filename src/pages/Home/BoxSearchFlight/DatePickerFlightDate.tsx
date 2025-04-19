import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import capitalize from 'lodash/capitalize'
import css from './DatePickerFlightDate.module.scss'
type DatePickerFlightDateProps = {
  type: 'departure' | 'return'
}
export default function DatePickerFlightDate (props: DatePickerFlightDateProps) {
  return (
    <DatePicker className={css.datePickerFlightDate} label={`${capitalize(props.type)} Date`} />
  )
}
