import { atom } from 'jotai'
import FlightType from '../lib/FlightType.type'
import CabinClass from '../lib/CabinClass.type'

export const flightTypeState = atom<FlightType>('oneway')

export const adultCountState = atom<number>(1)
export const childrenCountState = atom<number>(0)
export const infantCountState = atom<number>(0)
export const totalPassengerCountState = atom<number>((get) => get(adultCountState) + get(childrenCountState) + get(infantCountState))
