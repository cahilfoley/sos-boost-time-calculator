import { useMemo } from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import BoostCountForm from './components/BoostCountForm'
import Section from './components/Section'

import {
  defaultBoostCounts,
  sumBoostCounts,
  specificBoostTypes,
  SpecificBoostType,
  useBoostsDuration,
} from './helpers'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function App(): JSX.Element {
  const [specificBoostType, setSpecificBoostType] = useLocalStorage(
    'specificBoostType',
    SpecificBoostType.Construction,
  )
  const [specificBoosts, setSpecificBoosts] = useLocalStorage(
    `specific${specificBoostType}Boosts`,
    defaultBoostCounts,
  )
  const specificBoostDuration = useBoostsDuration(specificBoosts)

  const [generalBoosts, setGeneralBoosts] = useLocalStorage('generalBoosts', defaultBoostCounts)
  const generalBoostDuration = useBoostsDuration(generalBoosts)

  const allBoosts = useMemo(() => {
    return sumBoostCounts(generalBoosts, specificBoosts)
  }, [generalBoosts, specificBoosts])

  const allBoostDuration = useBoostsDuration(allBoosts)

  return (
    <Container sx={{ py: 4 }} maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 3 }}>
        <Typography variant="h3" component="h1" sx={{ flexGrow: 1 }} gutterBottom>
          SOS Boost Calculator
        </Typography>
        <TextField
          select
          label="Specific Boost Type"
          value={specificBoostType}
          onChange={(event) => setSpecificBoostType(event.target.value as SpecificBoostType)}
          sx={{ minWidth: '25%', flexGrow: 1 }}
        >
          {specificBoostTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Grid container spacing={3}>
        <Grid item md={4} sm={6} xs={12}>
          <Section title={`${specificBoostType} Boosts`}>
            <BoostCountForm values={specificBoosts} onChange={setSpecificBoosts} />
          </Section>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Section title="General Boosts">
            <BoostCountForm values={generalBoosts} onChange={setGeneralBoosts} />
          </Section>
        </Grid>
        <Grid item md={4} sm={12}>
          <Section title="Boost Durations">
            <Typography fontWeight="bold">From specific boosts</Typography>
            <Typography paragraph>{specificBoostDuration.formattedDuration}</Typography>

            <Typography fontWeight="bold">From general boosts</Typography>
            <Typography paragraph>{generalBoostDuration.formattedDuration}</Typography>

            <Typography fontWeight="bold">From all boosts</Typography>
            <Typography paragraph>{allBoostDuration.formattedDuration}</Typography>
          </Section>
        </Grid>
      </Grid>
    </Container>
  )
}
