import { memo } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { BoostCounts, defaultBoostCounts } from './helpers'

interface FieldConfig {
  key: keyof BoostCounts
  label: string
}

const fields: FieldConfig[] = [
  { key: 'oneMinute', label: 'One Minute' },
  { key: 'fiveMinutes', label: 'Five Minutes' },
  { key: 'oneHour', label: 'One Hour' },
  { key: 'threeHours', label: 'Three Hours' },
  { key: 'eightHours', label: 'Eight Hours' },
]

export interface BoostCountFormProps {
  values: BoostCounts
  onChange: (values: BoostCounts) => void
}

export const BoostCountForm = memo(function BoostCountForm(
  props: BoostCountFormProps,
) {
  const { values, onChange } = props

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...values,
      [event.currentTarget.id]: +event.currentTarget.value,
    })
  }

  return (
    <Box display="flex" flexDirection="column">
      {fields.map((field) => {
        return (
          <TextField
            id={field.key}
            key={field.key}
            label={field.label}
            fullWidth
            defaultValue={values[field.key]}
            InputLabelProps={{ shrink: true }}
            type="number"
            onChange={handleChange}
            margin="normal"
            size="small"
            onFocus={(event) => event.target.select()}
          />
        )
      })}
      <Button onClick={() => onChange({ ...defaultBoostCounts })}>Reset</Button>
    </Box>
  )
})

export default BoostCountForm
