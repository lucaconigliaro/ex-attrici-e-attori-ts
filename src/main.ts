// 📌 Milestone 1
type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year?: number,
  biography: string,
  image: string
};

// 📌 Milestone 2
type ActressNationality =
  | "American"
  | "British"
  | "Australian"
  | "Israeli-American"
  | "South African"
  | "French"
  | "Indian"
  | "Israeli"
  | "Spanish"
  | "South Korean"
  | "Chinese"

type Actress = Person & {
  most_famous_movies: [string, string, string],
  awards: string,
  nationality: ActressNationality
};

// 📌 Milestone 3
function isActress(data: unknown): data is Actress {
  return (
    typeof data === "object" && data !== null &&
    "id" in data && typeof data.id === "number" &&
    "name" in data && typeof data.name === "string" &&
    "birth_year" in data && typeof data.birth_year === "number" &&
    (!("death_year" in data) || typeof data.death_year === "number") && // death_year è opzionale → controllo solo se esiste prima di controllare il tipo
    "biography" in data && typeof data.biography === "string" &&
    "image" in data && typeof data.image === "string" &&
    "most_famous_movies" in data &&
    data.most_famous_movies instanceof Array &&
    data.most_famous_movies.length === 3 &&
    data.most_famous_movies.every(m => typeof m === "string") &&
    "awards" in data && typeof data.awards === "string" &&
    "nationality" in data && typeof data.nationality === "string"
  ) 
};

async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses/${id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data: unknown = await response.json();
    if (!isActress(data)) {
      throw new Error("Data is not valid");
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Unknow error", error);
    }
    return null;
  }
};

// 📌 Milestone 4
// Crea una funzione getAllActresses che chiama:

// GET https://boolean-spec-frontend.vercel.app/freetestapi/actresses
// La funzione deve restituire un array di oggetti Actress.

// Può essere anche un array vuoto.


// 📌 Milestone 5
// Crea una funzione getActresses che riceve un array di numeri (gli id delle attrici).

// Per ogni id nell’array, usa la funzione getActress che hai creato nella Milestone 3 per recuperare l’attrice corrispondente.

// L'obiettivo è ottenere una lista di risultati in parallelo, quindi dovrai usare Promise.all.

// La funzione deve restituire un array contenente elementi di tipo Actress oppure null (se l’attrice non è stata trovata).


// 🎯 BONUS 1
// Crea le funzioni:

// createActress
// updateActress
// Utilizza gli Utility Types:

// Omit: per creare un'attrice senza passare id, che verrà generato casualmente.
// Partial: per permettere l’aggiornamento di qualsiasi proprietà tranne id e name.

// 🎯 BONUS 2
// Crea un tipo Actor, che estende Person con le seguenti differenze rispetto ad Actress:

// known_for: una tuple di 3 stringhe
// awards: array di una o due stringhe
// nationality: le stesse di Actress più:
// Scottish, New Zealand, Hong Kong, German, Canadian, Irish.
// Implementa anche le versioni getActor, getAllActors, getActors, createActor, updateActor.


// 🎯 BONUS 3
// Crea la funzione createRandomCouple che usa getAllActresses e getAllActors per restituire un’array che ha sempre due elementi: al primo posto una Actress casuale e al secondo posto un Actor casuale.