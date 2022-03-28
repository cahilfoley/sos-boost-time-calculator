import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

export interface SectionProps {
  title: string
  children: JSX.Element | JSX.Element[]
}

export function Section(props: SectionProps) {
  return (
    <Card>
      <CardHeader title={props.title} />
      <CardContent>{props.children}</CardContent>
    </Card>
  )
}

export default Section
