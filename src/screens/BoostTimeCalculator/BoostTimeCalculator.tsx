import { useMemo } from 'react'

import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import BoostCountForm from './BoostCountForm'
import DetailsList from '../../components/DetailsList'
import Section from '../../components/Section'
import Screen from '../../components/Screen'

import { useLocalStorageValue } from '@react-hookz/web'
import {
  defaultBoostCounts,
  sumBoostCounts,
  specificBoostTypes,
  SpecificBoostType,
  useBoostsDuration,
} from './helpers'

export function BoostTimeCalcuator() {
  const [specificBoostType, setSpecificBoostType] = useLocalStorageValue(
    'specificBoostType',
    SpecificBoostType.Construction,
  )
  const [specificBoosts, setSpecificBoosts] = useLocalStorageValue(
    `specific${specificBoostType}Boosts`,
    defaultBoostCounts,
  )
  const specificBoostDuration = useBoostsDuration(specificBoosts)

  const [generalBoosts, setGeneralBoosts] = useLocalStorageValue(
    'generalBoosts',
    defaultBoostCounts,
  )
  const generalBoostDuration = useBoostsDuration(generalBoosts)

  const allBoosts = useMemo(() => {
    return sumBoostCounts(generalBoosts, specificBoosts)
  }, [generalBoosts, specificBoosts])

  const allBoostDuration = useBoostsDuration(allBoosts)

  return (
    <Screen
      title="Boost Calculator"
      actions={
        <TextField
          select
          label="Boost Type"
          value={specificBoostType}
          onChange={(event) =>
            setSpecificBoostType(event.target.value as SpecificBoostType)
          }
          sx={{ minWidth: '25vw', flexGrow: 1 }}
        >
          {specificBoostTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      }
    >
      <Grid container spacing={3}>
        <Grid item md={4} sm={6} xs={12}>
          <Section title={`${specificBoostType} Boosts`}>
            <BoostCountForm
              values={specificBoosts}
              onChange={setSpecificBoosts}
            />
          </Section>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Section title="General Boosts">
            <BoostCountForm
              values={generalBoosts}
              onChange={setGeneralBoosts}
            />
          </Section>
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <Section title="Boost Durations" noCardContent>
            <DetailsList
              items={[
                {
                  label: `${specificBoostType} boosts`,
                  value: specificBoostDuration.formattedDurationWithMinutes,
                },
                {
                  label: 'General boosts',
                  value: generalBoostDuration.formattedDurationWithMinutes,
                },
                {
                  label: 'Total boosts',
                  value: allBoostDuration.formattedDurationWithMinutes,
                },
              ]}
            />
          </Section>
        </Grid>
      </Grid>
    </Screen>
  )
}

export default BoostTimeCalcuator
