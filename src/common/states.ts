import { atom } from 'jotai'
import FlightType from '../lib/types/FlightType.type'
import CabinClass from '../lib/types/CabinClass.type'
import dayjs from 'dayjs'

export const flightTypeState = atom<FlightType>('oneway')

export const adultCountState = atom<number>(1)
export const childrenCountState = atom<number>(0)
export const infantCountState = atom<number>(0)
export const totalPassengerCountState = atom<number>((get) => get(adultCountState) + get(childrenCountState) + get(infantCountState))

export const cabinClassState = atom<CabinClass>('economy')

/** Departure date. By default it's 7 days from now */
export const departureDateTimestampState = atom<number>(dayjs().add(7, 'days').valueOf())
/** Return date. By default it's 4 days after departure date */
export const returnDateTimestampState = atom<number>(dayjs().add(7 + 4, 'days').valueOf())
