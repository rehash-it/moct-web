import React, { useReducer, useState, useEffect } from 'react'
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
import { LanguageContext, SocketContext, StoreContext } from './context/context'
import { newsReducer, newsState } from './store/Reducers/newReducer'
import Docs from './components/pages/Docs'
import Bids from './components/pages/Bids'
import Dashboard from './components/Admin/Dashboard'
import Login from './components/Admin/Auth/Login';
import SiteDetails from './components/pages/SiteDetails'
import NotFound from './components/pages/NotFound';
import OrganizationChart from './components/pages/OrganizationChart'
import { useTranslation } from 'react-i18next';
import Search from './components/pages/Search'
import { webSocket } from './socket'
import Chat from './components/pages/Chat'
import Forums from './components/pages/Forums'
import ClosedUserForum from './components/Forum/ClosedUserForum'
import UserForum from './components/Forum/UserForum'
import { MainLayout } from './components/layouts/mainLayout'
import { createTheme, ThemeProvider } from '@material-ui/core'
export default function App() {
  const { t, i18n } = useTranslation();
  const [news, dispatchNews] = useReducer(newsReducer, newsState)
  const [socket, setSocket] = useState('')

  const theme = createTheme({
    palette: {
      primary: {main : "#0053af"},
      secondary:{main:  "#f50057"}
    }
  })
  /**set socket */
  useEffect(() => setSocket(webSocket), [])
  return (
    <ThemeProvider theme={theme}>
      <StoreContext.Provider value={{ news, dispatchNews }}>
        <LanguageContext.Provider value={{ t, i18n }}>
          <SocketContext.Provider value={{ socket, setSocket }}>
            <BrowserRouter>
              <Chat />
              <MainLayout>
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
                  <Route path='/search/:index'><Search /> </Route>
                  <Route path='/chart'><OrganizationChart /></Route>
                  <Route path='/forum/:id'><UserForum /></Route>
                  <Route path='/forums'><Forums /> </Route>
                  <Route path='/closedForums'><ClosedUserForum /></Route>
                  <Route><NotFound /></Route>
                </Switch>
              </MainLayout>
            </BrowserRouter>
          </SocketContext.Provider>
        </LanguageContext.Provider>
      </StoreContext.Provider>
    </ThemeProvider>
  )
}
