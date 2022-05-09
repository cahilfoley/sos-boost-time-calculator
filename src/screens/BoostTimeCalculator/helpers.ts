import { useMemo } from 'react'
import { addMinutes, intervalToDuration, formatDuration } from 'date-fns'

export enum SpecificBoostType {
  Construction = 'Construction',
  Research = 'Research',
  Training = 'Training',
  Hospital = 'Hospital',
}

export const specificBoostTypes = [
  SpecificBoostType.Construction,
  SpecificBoostType.Research,
  SpecificBoostType.Training,
  SpecificBoostType.Hospital,
]

export const defaultBoostCounts: BoostCounts = {
  oneMinute: 0,
  fiveMinutes: 0,
  oneHour: 0,
  threeHours: 0,
  eightHours: 0,
}

export interface BoostCounts {
  oneMinute: number
  fiveMinutes: number
  oneHour: number
  threeHours: number
  eightHours: number
}

export const minuteDurations: { [K in keyof BoostCounts]: number } = {
  oneMinute: 1,
  fiveMinutes: 5,
  oneHour: 60,
  threeHours: 60 * 3,
  eightHours: 60 * 8,
}

export interface GetTotalDurationResult {
  totalMinutes: number
  formattedDuration: string
  formattedDurationWithMinutes: string
}

export function getTotalDuration(boosts: BoostCounts): GetTotalDurationResult {
  let totalMinutes = 0

  const entries = Object.entries(boosts) as [keyof BoostCounts, number][]

  for (const [key, value] of entries) {
    if (value) totalMinutes += value * minuteDurations[key]
  }

  const start = new Date()
  const end = addMinutes(start, totalMinutes)

  const duration = intervalToDuration({ start, end })
  const formattedDuration = formatDuration(duration) || 'None'
  const formattedDurationWithMinutes = [
    formattedDuration,
    `(${totalMinutes} mins)`,
  ].join(' ')

  return { totalMinutes, formattedDuration, formattedDurationWithMinutes }
}

export function sumBoostCounts(...boostCounts: BoostCounts[]): BoostCounts {
  const output: BoostCounts = { ...defaultBoostCounts }

  for (const input of boostCounts) {
    const entries = Object.entries(input) as [keyof BoostCounts, number][]

    for (const [key, value] of entries) {
      output[key] += value
    }
  }

  return output
}

export function useBoostsDuration(boosts: BoostCounts) {
  return useMemo(() => getTotalDuration(boosts), [boosts])
}
