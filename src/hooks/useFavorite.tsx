import { createContext, PropsWithChildren, useContext, useState } from 'react'

interface FavoriteCtx {
  favorites: string[]
  favorite: (name: string) => void
  unfavorite: (name: string) => void
}

const FAVORITE_KEY = 'netflikemon-favorite'

const FavoriteContext = createContext<FavoriteCtx>({
  favorites: [],
  favorite: () => true,
  unfavorite: () => true
})

export const useFavorite = () => useContext(FavoriteContext)

export const FavoriteProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<string[]>(JSON.parse(localStorage.getItem(FAVORITE_KEY) || '[]'))
  const favorite = (name: string) => {
    if (!favorites.includes(name)) {
      const newFavorites = [...favorites, name]

      setFavorites(newFavorites)
      localStorage.setItem(FAVORITE_KEY, JSON.stringify(newFavorites))
    }
  }
  const unfavorite = (name: string) => {
    const idx = favorites.findIndex((value) => value === name)

    if (idx !== -1) {
      const newFavorites = [...favorites]

      newFavorites.splice(idx, 1)
      setFavorites(newFavorites)
      localStorage.setItem(FAVORITE_KEY, JSON.stringify(newFavorites))
    }
  }

  return <FavoriteContext.Provider value={{ favorite, unfavorite, favorites }}>{children}</FavoriteContext.Provider>
}
