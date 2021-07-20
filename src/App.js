import React, { useReducer } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import About from './components/pages/About'
import Home from './components/pages/Home'
import News from './components/pages/News'
import History from './components/pages/History'
import MessageMoct from './components/pages/MessageMoct'
import Sites from './components/pages/Sites'
import Vacancy from './components/pages/Vacancy'
import NewDetail from './components/pages/NewDetail'
import ResearchDetails from './components/pages/ResearchDetails'
import { StoreContext } from './context/context'
import { newsReducer, newsState } from './store/Reducers/newReducer'
import Docs from './components/pages/Docs'
import Bids from './components/pages/Bids'
import Dashboard from './components/Admin/Dashboard'
import Login from './components/Admin/Auth/Login';
import SiteDetails from './components/pages/SiteDetails'
export default function App() {
  const [news, dispatchNews] = useReducer(newsReducer, newsState)
  return (
    <StoreContext.Provider value={{ news, dispatchNews }}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'><Home /></Route>
          <Route path='/news/:id'><NewDetail /></Route>
          <Route path='/news'><News /></Route>
          <Route path='/about'><About /></Route>
          <Route path='/history'><History /></Route>
          <Route path='/docs/:id'><ResearchDetails /></Route>
          <Route path='/sites'><Sites /></Route>
          <Route path='/docs'><Docs /></Route>
          <Route path='/messageOfMoct'><MessageMoct /></Route>
          <Route path='/vacancy'><Vacancy /></Route>
          <Route path='/admin'><Dashboard /></Route>
          <Route path='/bids'><Bids /></Route>
          <Route path='/login'><Login /></Route>
          <Route path='/site/:id'><SiteDetails /></Route>
        </Switch>
      </BrowserRouter>
    </StoreContext.Provider>
  )
}
