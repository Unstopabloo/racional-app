import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { InvestmentDataPoint } from './investment-evolution.domain'

interface FirestoreTimestamp {
  seconds: number
  nanoseconds: number
}

interface RawDataPoint {
  date: FirestoreTimestamp
  portfolioValue: number
  portfolioIndex: number
  dailyReturn: number
  contributions: number
}

function transformDataPoint(raw: RawDataPoint): InvestmentDataPoint {
  return {
    date: new Date(raw.date.seconds * 1000),
    portfolioValue: raw.portfolioValue,
    portfolioIndex: raw.portfolioIndex,
    dailyReturn: raw.dailyReturn,
    contributions: raw.contributions,
  }
}

export function subscribeToInvestmentEvolution(
  callback: (data: InvestmentDataPoint[]) => void,
  onError: (error: Error) => void,
) {
  const docRef = doc(db, 'investmentEvolutions', 'user1')

  return onSnapshot(
    docRef,
    (snapshot) => {
      if (!snapshot.exists()) {
        onError(new Error('Document not found'))
        return
      }

      const rawData = snapshot.data()
      const points: InvestmentDataPoint[] = (rawData.array as RawDataPoint[])
        .map(transformDataPoint)
        .sort((a, b) => a.date.getTime() - b.date.getTime())

      callback(points)
    },
    (error) => onError(error as Error),
  )
}
