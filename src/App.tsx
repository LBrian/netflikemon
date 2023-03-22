import Header from './components/Header'
import LoginForm from './components/LoginForm'
import PokemonList from './components/PokemonList'
import { FavoriteProvider, useAuth } from './hooks'

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      {!isAuthenticated ? (
        <LoginForm />
      ) : (
        <FavoriteProvider>
          <PokemonList />
        </FavoriteProvider>
      )}
    </div>
  )
}

export default App
