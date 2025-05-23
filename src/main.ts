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
    (!("death_year" in data) || typeof data.death_year === "number") && // death_year è opzionale → controllo se esiste prima di controllare il tipo
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
async function getAllActresses(): Promise<Actress[]> {
  try {
    const response = await fetch("https://boolean-spec-frontend.vercel.app/freetestapi/actresses");
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data: unknown = await response.json();
    if (!(data instanceof Array)) {
      throw new Error("Data is not valid");
    }
    const validActresses: Actress[] = data.filter(isActress);
    return validActresses;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Unknow error", error);
    }
    return [];
  }
};

// 📌 Milestone 5
async function getActresses(ids: number[]): Promise<(Actress | null)[]> {
  try {
    const promises = ids.map(id => getActress(id));
    return await Promise.all(promises);
  }catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Unknow error", error);
    }
    return [];
  }
};

// 🎯 BONUS 1
function createActress(data: Omit<Actress, "id">): Actress {
  return {
    ...data,
    id: Math.floor(Math.random() * 1000)
  }
};

function updateActress(actress: Actress, updates: Partial<Actress>): Actress {
  return {
    ...actress,
    ...updates,
    id: actress.id, 
    name: actress.name,
  }
};