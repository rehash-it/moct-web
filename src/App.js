import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import About from './components/pages/About'
import Home from './components/pages/Home'
import News from './components/pages/News'
import History from './components/pages/History'
import MessageMoct from './components/pages/MessageMoct'
import Sites from './components/pages/Sites'
import VacancyBids from './components/pages/VacancyBids'
import NewDetail from './components/pages/NewDetail'
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'><Home /></Route>
        <Route path='/news/:id'><NewDetail /></Route>
        <Route path='/news'><News /></Route>
        <Route path='/about'><About /></Route>
        <Route path='/history'><History /></Route>
        <Route path='/studies'><Sites /></Route>
        <Route path='/messageOfMoct'><MessageMoct /></Route>
        <Route path='/vacancy'><VacancyBids /></Route>
      </Switch>
    </BrowserRouter>
  )
}
