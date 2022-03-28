import Content from './containers/Content'
import Header from './containers/Header'
import BoostTimeCalculator from './screens/BoostTimeCalculator'

export default function App() {
  return (
    <>
      <Header />
      <Content>
        <BoostTimeCalculator />
      </Content>
    </>
  )
}
