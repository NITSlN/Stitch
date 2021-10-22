import React from 'react'
import './App.css'
import { Router, Route, Switch } from 'react-router-dom'
import StreamCreate from './streams/StreamCreate'
import StreamDelete from './streams/StreamDelete'
import StreamEdit from './streams/StreamEdit'
import StreamList from './streams/StreamList'
import StreamShow from './streams/StreamShow'
import Header from './Header'
import history from '../history'

const App = () => {
  return (
    <div>
      <Router history={history}>
        {' '}
        {/* We can only use Link tag inside BrowserRouter */}
        <div>
          {/* We cant use switch in BrowserRouter */}
          <Header />
          <Switch> 
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/delete/:id" exact component={StreamDelete} />
            <Route path="/streams/edit/:id" exact component={StreamEdit} />
            <Route path="/streams/:id" exact component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

// Switch ensure that multiple Routes are not shown at the same time only one Route is shown

export default App
