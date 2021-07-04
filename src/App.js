import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import News from './components/pages/News'
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/news'>
          <News />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
