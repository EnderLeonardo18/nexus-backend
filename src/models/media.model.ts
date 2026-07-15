export interface PlatformDTO {
  name: string;
  logoLetters: string;
  directLink: string;
  requiresSubscription: boolean;
}

export interface MediaContentDTO {
  id: number;
  title: string;
  type: string;
  year: number;
  duration: string;
  genres: string[]; // Lo transformaremos a array antes de enviarlo a Angular
  synopsis: string;
  imageUrl: string | null;
  availablePlatforms: PlatformDTO[];
  alternatives: number[]; // Lista de IDs numéricos sugeridos
}