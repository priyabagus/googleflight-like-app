import { atom } from 'jotai'
import FlightType from '../lib/FlightType.type'

export const flightTypeState = atom<FlightType>('oneway')
