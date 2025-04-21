import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import css from './BoxFlightResults.module.scss'
import OnewayItemFlight from './OnewayItemFlight'
import { useAtomValue } from 'jotai'
import { itinerariesState } from '@/common/states'

export default function BoxFlightResults () {
  const itineraries = useAtomValue(itinerariesState)

  return (
    <Box className={css.wrapper}>
      <Typography variant='h2'>Flights</Typography>
      <Box className={css.boxFlightResultsWrapper}>
        {itineraries.map((itinerary, i) => (
          <OnewayItemFlight key={i} itinerary={itinerary} />
        ))}

      </Box>
    </Box>
  )
}
