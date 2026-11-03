import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom'
import Login from './component/Login'
import Board from './component/Board'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/board" component={Board} />
         <Redirect exact from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  )
}

export default App