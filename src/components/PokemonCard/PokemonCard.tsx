import type { Pokemon } from 'pokenode-ts'
import { ComponentProps, startTransition, useEffect, useState } from 'react'
import { usePokemonClient } from '../../hooks'
import Modal from '../Modal'

type Props = {
  name: string
} & Omit<ComponentProps<typeof Modal>, 'name' | 'dismissible' | 'children'>

const PokemonCard = ({ name, ...props }: Props) => {
  const { client } = usePokemonClient()
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [loading, setLoading] = useState(false)

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
