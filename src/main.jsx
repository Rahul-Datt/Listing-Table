import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import {Provider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import UserReducer from './UserReducer.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

const store= configureStore({
  reducer: {
    users: UserReducer
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
