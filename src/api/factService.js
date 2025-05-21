// Gets a random number fact from Numbers API
async function fetchNumberTrivia() {
  const res = await fetch('https://numbersapi.com/random/trivia?json');
  if (!res.ok) throw new Error('Numbers API failed');
  const { text } = await res.json();
  return { source: 'Trivia', text };
}

// A few backup jokes in case the joke API doesn't work
const fallbackJokes = [
  "What kind of car does a Jedi drive? A Toy-Yoda.",
  "Why did the car blush? Because it saw the gas tank!",
  "Why don’t cars ever get tired? Because they come with their own set of Michelin stars!",
  "Why was the car always getting into trouble? Because it couldn’t stay on the right track!",
  "Why did the mechanic sleep under the car? He wanted to get up oily in the morning!",
  "Why did the bicycle fall over? Because it was two-tired.",
  "I used to play piano by ear, but now I use my hands… just like I steer my car."
];

// Gets a random joke from the Joke API
async function fetchJokeApi() {
  const url = 'https://v2.jokeapi.dev/joke/Any?type=single&safe-mode';
  const res = await fetch(url);
  if (!res.ok) throw new Error('Joke API failed');

  const data = await res.json();
  if (data?.joke) {
    return { source: 'JokeAPI', text: data.joke };
  }

  throw new Error('No joke received from JokeAPI');
}

// This tries the joke API, and if it fails, picks a backup joke instead
async function fetchRandomJoke() {
  try {
    return await fetchJokeApi();
  } catch (err) {
    const text = fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)];
    return { source: 'Fallback Joke', text };
  }
}

// Picks either a number fact or a joke randomly
export async function getRandomFact() {
  const picker = Math.random() < 0.5 ? fetchNumberTrivia : fetchRandomJoke;
  return picker();
}

// Gets a list of car brands (makes) from the car API
export async function getAllCarMakes() {
  try {
    const res = await fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json");
    if (!res.ok) throw new Error("VPIC API failed");
    const data = await res.json();
    return data.Results;
  } catch (error) {
    console.error("Failed to load makes:", error);
    return [];
  }
}
