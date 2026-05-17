import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = (product) => {
    setFavorites((prevFavs) => {
      const isExist = prevFavs.find((item) => item.id === product.id);
      if (isExist) {
        return prevFavs.filter((item) => item.id !== product.id);
      } else {
        return [...prevFavs, product];
      }
    });
  };
  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);