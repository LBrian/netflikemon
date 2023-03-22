import Header from './components/Header'
import LoginForm from './components/LoginForm'
import PokemonList from './components/PokemonList'
import { useAuth } from './hooks'

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      {!isAuthenticated ? <LoginForm /> : <PokemonList />}
    </div>
  )
}

export default App
