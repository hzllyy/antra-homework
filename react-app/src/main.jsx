import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Lists from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Lists />
  </Provider>
)
