import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import capitalize from 'lodash/capitalize'
import css from './DatePickerFlightDate.module.scss'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import { departureDateTimestampState, errorInputState, returnDateTimestampState } from '@/common/states'
import { Box } from '@mui/material'
import { PickerValue } from '@mui/x-date-pickers/internals'
type DatePickerFlightDateProps = {
  type: 'departure' | 'return'
}
export default function DatePickerFlightDate (props: DatePickerFlightDateProps) {
  const [flightDate, setFlightDate] = useAtom<number>(props.type === 'departure' ? departureDateTimestampState : returnDateTimestampState)
  const [errorInput, setErrorInput] = useAtom(errorInputState)

  const handleChange = (date:PickerValue) => {
    // set selected date
    setFlightDate(date?.valueOf() as number)
    // remove error
    setErrorInput(latestState => ({ ...latestState, [props.type]: null }))
  }

  return (
    <Box className={css.datePickerFlightDateWrapper}>
      <DatePicker
        className={css.datePickerFlightDate} label={`${capitalize(props.type)} Date`} enableAccessibleFieldDOMStructure={false}
        value={dayjs(flightDate)} onChange={handleChange}
        slotProps={{ textField: { error: !!errorInput[props.type], required: true } }}
      />
    </Box>
  )
}
