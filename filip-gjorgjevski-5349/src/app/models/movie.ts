export interface Movie {
  id: number;
  title: string;
  year: number;
  director?: string;
  plot?: string;
  poster?: string;
  genre_id?: number;
  rating?: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Actor {
  id: number;
  name: string;
}