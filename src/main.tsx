import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

function initializeApp() {
  const rootElement = document.getElementById('root')
  
  if (process.env.NODE_ENV === 'development' && !rootElement) {
    throw new Error(
      "Root element not found. Did you forget to add <div id='root'> to your index.html?"
    )
  }

  const root = createRoot(rootElement!)
  root.render(<App />)
}

initializeApp()