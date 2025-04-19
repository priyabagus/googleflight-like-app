import { Box, Button, Container, Typography } from '@mui/material'
import css from './Home.page.module.scss'
import BoxSearchFlight from './BoxSearchFlight'

export default function MainPage () {
  return (
    <Container maxWidth='md'>
      <header>
        <img className={css.logo} src='/logo.svg' />
        <Typography className={css.title} variant='h1'>Bagus Flight</Typography>
      </header>

      <BoxSearchFlight />

    </Container>
  )
}
