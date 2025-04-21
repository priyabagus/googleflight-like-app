import Itinerary from '@/lib/types/Itinerary.type'
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from '@mui/material'
import css from './OnewayItemFlight.module.scss'
import clsx from 'clsx'
import dayjs from 'dayjs'
import durationPlugin from 'dayjs/plugin/duration'
import { ExpandMore } from '@mui/icons-material'
dayjs.extend(durationPlugin)

type OnewayItemFlightProps = {
  itinerary: Itinerary
}
export default function OnewayItemFlight (props:OnewayItemFlightProps) {
  return (
    <Accordion>
      <OnewayItemSummary itinerary={props.itinerary} />
      <AccordionDetails>
        <p>Details</p>
      </AccordionDetails>
    </Accordion>
  )
}

function OnewayItemSummary (props:OnewayItemFlightProps) {
  const departureDayjs = dayjs(props.itinerary.legs[0].departure)
  const arrivalDayjs = dayjs(props.itinerary.legs[0].arrival)
  const hoursDuration = arrivalDayjs.diff(departureDayjs, 'hours').valueOf()
  const minutesDuration = arrivalDayjs.diff(departureDayjs, 'minutes').valueOf() % 60
  return (
    <AccordionSummary expandIcon={<ExpandMore />}>
      <Box className={css.summaryWrapper}>
        <Box className={clsx(css.logoAndRouteWrapper, css.summaryColumn)}>
          <img src={props.itinerary.legs[0].carriers.marketing[0].logoUrl} />
          <Typography className={css.route} variant='subtitle2'>{props.itinerary.legs[0].origin.id}-{props.itinerary.legs[0].destination.id}</Typography>
        </Box>

        <Box className={clsx(css.carrierNameWrapper, css.summaryColumn)}>
          <Typography className={css.carrierName}>{props.itinerary.legs[0].carriers.marketing[0].name}</Typography>
        </Box>

        <Box className={clsx(css.departAndArrivalWrapper, css.summaryColumn)}>
          <Typography className={css.departArrivalTime}>{departureDayjs.format('hh:mmA')} - {arrivalDayjs.format('hh:mmA')}</Typography>
          <Typography className={css.departArrivalDate}>{departureDayjs.format('ddd, MMM D')} - {departureDayjs.format('ddd, MMM D')}</Typography>
        </Box>

        <Box className={clsx(css.durationAndStopWrapper, css.summaryColumn)}>
          <Typography>{hoursDuration}hr {minutesDuration}min</Typography>
          <Typography>{props.itinerary.legs[0].segments.length - 1} Stops</Typography>
        </Box>

        <Box className={clsx(css.priceWrapper, css.summaryColumn)}>
          <Typography className={css.price}>{props.itinerary.price.formatted}</Typography>
        </Box>
      </Box>
    </AccordionSummary>
  )
}
