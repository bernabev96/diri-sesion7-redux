import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import logger from './utils/logger';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import Root from './Root.tsx';

logger.setLevel("debug");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </StrictMode>,
)
