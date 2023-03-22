import { MainClient } from 'pokenode-ts'
import { createContext, PropsWithChildren, useContext } from 'react'

interface PokemonClientCtx {
  client: InstanceType<typeof MainClient>
}

const PokemonClientContext = createContext<PokemonClientCtx | null>(null)

export const usePokemonClient = () => useContext(PokemonClientContext) as PokemonClientCtx

export const PokemonClientProvider = ({ children }: PropsWithChildren) => {
  return <PokemonClientContext.Provider value={{ client: new MainClient() }}>{children}</PokemonClientContext.Provider>
}
