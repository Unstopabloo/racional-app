import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import * as TanStackQuery from './integrations/tanstack-query/root-provider'
import { getRouter } from './router'

import './styles.css'

const queryContext = TanStackQuery.getContext()

const router = getRouter({
  queryClient: queryContext.queryClient,
})

function App() {
  return (
    <TanStackQuery.Provider>
      <RouterProvider router={router} />
    </TanStackQuery.Provider>
  )
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
