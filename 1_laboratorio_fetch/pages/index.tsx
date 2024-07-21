// pages/index.tsx

import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { getPokemons } from '../lib/getsPokemons';
import Image from 'next/image';

export default function Home() {
  const [pokemons, setPokemons] = useState<{ id: number, sprites: { front_default: string }, name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      console.log('Fetching pokemons...');
      try {
        const pokemonData = await getPokemons();
        console.log('Fetched pokemons:', pokemonData);
        setPokemons(pokemonData);
      } catch (err) {
        console.error('Failed to fetch pokemons:', err);
        setError('Failed to load Pokémon data.');
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.heading}>Pokémons</h1>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.grid}>
          {pokemons.map(pokemon => (
            <div key={pokemon.id} className={styles.card}>
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={96}
                height={96}
              />
              <h3>{pokemon.name}</h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

