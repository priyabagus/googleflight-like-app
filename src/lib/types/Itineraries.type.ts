type FlightSegment = {
  id: string,
  origin: {
    flightPlaceId: string
    displayCode: string
    parent: {
      flightPlaceId: string
      displayCode: string
      name: string
      type: string
    }
    name: string
    type: string
  },
  destination: {
    flightPlaceId: string
    displayCode: string
    parent: {
      flightPlaceId: string
      displayCode: string
      name: string
      type: string
    }
    name: string
    type: string
  }
  departure: string
  arrival: string
  durationInMinutes: number
  flightNumber: string
  marketingCarrier: {
    id: number
    name: string
    alternateId: string
    allianceId: number
  },
  operatingCarrier: {
    id: number
    name: string
    alternateId: string
    allianceId: number
  }
}

type FlightLegCarrierMarketing = {
  id: number
  logoUrl: string
  name: string
}

type FlightLegs = {
  id: string,
  origin: {
    id: string
    name: string
    displayCode: string
    city: string
    isHighlighted: boolean
  },
  destination: {
    id: string
    name: string
    displayCode: string
    city: string
    isHighlighted: boolean
  },
  durationInMinutes: number
  stopCount: number
  isSmallestStops: boolean
  departure: string
  arrival: string
  timeDeltaInDays: 0
  carriers: {
    marketing: FlightLegCarrierMarketing[],
    operationType: string
  }
  segments: FlightSegment[]
}

type Itinerary = {
  id: string,
  price: {
    raw: number
    formatted: string
  }
  legs: FlightLegs[],
  isSelfTransfer: boolean
  isProtectedSelfTransfer: boolean
  farePolicy: {
    isChangeAllowed: boolean
    isPartiallyChangeable: boolean
    isCancellationAllowed: boolean
    isPartiallyRefundable: boolean
  }
  eco: {
    ecoContenderDelta: number
  }
  tags: string[]
  isMashUp: boolean
  hasFlexibleOptions: boolean
  score: number
}

export default Itinerary
