import type { Pokemon } from 'pokenode-ts'
import { ComponentProps, startTransition, useCallback, useEffect, useState } from 'react'
import { useFavorite, usePokemonClient } from '../../hooks'
import Modal from '../Modal'

type Props = {
  name: string
} & Omit<ComponentProps<typeof Modal>, 'name' | 'dismissible' | 'children'>

const PokemonCard = ({ name, ...props }: Props) => {
  const { client } = usePokemonClient()
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [loading, setLoading] = useState(false)
  const { favorite, unfavorite, favorites } = useFavorite()

  const handleFavorite = useCallback(() => {
    if (favorites.includes(name)) {
      unfavorite(name)
    } else {
      favorite(name)
    }
  }, [name, favorites])

  useEffect(() => {
    if (name) {
      setLoading(true)

      client.pokemon
        .getPokemonByName(name)
        .then((data) => {
          setPokemon(data)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    return () => {
      startTransition(() => {
        setPokemon(undefined)
      })
    }
  }, [name])

  return (
    <Modal name='pokemon-card' {...props} dismissible>
      <div className='min-w-[320px]'>
        <figure className={`h-24 w-24 mx-auto rounded-xl ${loading && 'bg-neutral-600 animate-pulse'}`}>
          {pokemon?.sprites.front_default && <img src={pokemon.sprites.front_default} alt={name} />}
        </figure>
        <div className='card-body items-center text-center'>
          <h2 className='card-title mb'>{name}</h2>
          <button
            data-testid='favorite'
            aria-label='Favorite'
            className={`btn btn-xs gap-2 mb-3 ${favorites.includes(name) ? 'btn-accent' : 'glass'}`}
            onClick={handleFavorite}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              />
            </svg>
            Favorite
          </button>
          <div className='text-xs text-neutral-400'>
            <div>Height: {pokemon?.height || '-'}</div>
            <div>Weight: {pokemon?.weight || '-'}</div>
            <div>Base Experience: {pokemon?.base_experience || '-'}</div>
            <div className='flex gap-1 mt-3 justify-center'>
              {pokemon?.abilities.map(({ ability }) => (
                <div key={ability.name} className='badge badge-primary badge-outline'>
                  {ability.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default PokemonCard
