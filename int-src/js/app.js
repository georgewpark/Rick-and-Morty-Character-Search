import { createRoot } from 'react-dom/client'
import RickAndMorty from './components/RickAndMorty'

const container = document.querySelector('#rick-and-morty')
const root = container && createRoot(container)

root && root.render(<RickAndMorty />)