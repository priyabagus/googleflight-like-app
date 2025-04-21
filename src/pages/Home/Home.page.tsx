import { Container, Typography } from '@mui/material'
import css from './Home.page.module.scss'
import BoxSearchFlight from './BoxSearchFlight/BoxSearchFlight'
import BoxFlightResults from './BoxFlightResults/BoxFlightResults'
import { useAtomValue } from 'jotai'
import { isShownFlightResultsState } from '@/common/states'

export default function MainPage () {
  const isShownFlightResults = useAtomValue(isShownFlightResultsState)
  return (
    <Container maxWidth='md' disableGutters>
      <header>
        <img className={css.logo} src='/logo.svg' />
        <Typography className={css.title} variant='h1'>Bagus Flight</Typography>
      </header>

      <BoxSearchFlight />

      {isShownFlightResults && <BoxFlightResults />}

    </Container>
  )
}
