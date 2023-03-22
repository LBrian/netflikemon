import type { NamedAPIResource } from 'pokenode-ts'
import { ChangeEvent, startTransition, useEffect, useState } from 'react'
import { useFavorite, usePokemonClient } from '../../hooks'
import PokemonCard from '../PokemonCard'

const PokemonList = () => {
  const { client } = usePokemonClient()
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<string>('')
  const [page, setPage] = useState(0)
  const [next, setNext] = useState(false)
  const [prev, setPrev] = useState(false)
  const [pokemon, setPokemon] = useState('')
  const [pokemons, setPokemons] = useState<NamedAPIResource[]>()
  const { favorites } = useFavorite()

  const handleNext = () => {
    setPage(page + 1)
  }

  const handlePrev = () => {
    setPage(page - 1)
  }

  const handleChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value.toLowerCase())
  }

  // Non-blocking UI side effects
  const resetFilter = () => {
    startTransition(() => {
      setFilter('')
    })
  }

  const togglePokemonCard = (name: string) => () => {
    setPokemon(name)
  }

  useEffect(() => {
    setLoading(true)

    resetFilter()

    client.pokemon
      .listPokemons(page * 40, 40)
      .then((data) => {
        setPokemons(data.results)
        setNext(!!data.next)
        setPrev(!!data.previous)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [page])

  return (
    <div className='p-10 md:p-20'>
      <div className='text-center'>
        <input
          type='text'
          placeholder='Filter'
          value={filter}
          data-testid='pokemon-filter'
          onChange={handleChangeFilter}
          className='input input-bordered w-full max-w-xs'
        />
      </div>
      <div className='btn-group grid grid-cols-2 max-w-xs mx-auto my-8'>
        <button
          disabled={!prev || loading}
          onClick={handlePrev}
          data-testid='previous-page'
          aria-label='Previous Page'
          className='btn btn-outline'
        >
          Previous
        </button>
        <button
          disabled={!next || loading}
          onClick={handleNext}
          data-testid='next-page'
          aria-label='Next Page'
          className='btn btn-outline'
        >
          Next
        </button>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
        {pokemons?.map(({ name }) => (
          <button
            key={name}
            onClick={togglePokemonCard(name)}
            data-testid={name.includes(filter) && `pokemon-item-${name}`}
            aria-label={`Pokemon ${name}`}
            className={`card shadow-xl items-center text-center ${loading && 'animate-pulse'} ${
              favorites.includes(name) ? 'btn-accent' : 'glass'
            } ${!name.includes(filter) && 'hidden'}`}
          >
            <div className='card-body'>
              <div className='avatar placeholder'>
                <div className='bg-neutral-focus text-neutral-content rounded-full w-20'>
                  <span className='text-lg capitalize'>{name.charAt(0)}</span>
                </div>
              </div>
              <div className='text-sm font-semibold'>{name}</div>
            </div>
          </button>
        ))}
      </div>
      <PokemonCard name={pokemon} isOpen={!!pokemon} onClose={togglePokemonCard('')} />
    </div>
  )
}

export default PokemonList
