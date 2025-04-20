import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import capitalize from 'lodash/capitalize'
import css from './DatePickerFlightDate.module.scss'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import { departureDateTimestampState, returnDateTimestampState } from '@/common/states'
import { Box } from '@mui/material'
type DatePickerFlightDateProps = {
  type: 'departure' | 'return'
}
export default function DatePickerFlightDate (props: DatePickerFlightDateProps) {
  const [flightDate, setFlightDate] = useAtom<number>(props.type === 'departure' ? departureDateTimestampState : returnDateTimestampState)

  return (
    <Box className={css.datePickerFlightDateWrapper}>
      <DatePicker className={css.datePickerFlightDate} value={dayjs(flightDate)} onChange={date => setFlightDate(date?.valueOf() as number)} label={`${capitalize(props.type)} Date`} enableAccessibleFieldDOMStructure={false} />
    </Box>
  )
}
