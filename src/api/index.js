export const getCategory = async () => {
  try {
    const res = await fetch('https://v2.jokeapi.dev/categories', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return await res.json()
  } catch (e) {
    throw e
  }
}

export const getJoke = async (amount, category) => {
  try {
    const res = await fetch(`https://v2.jokeapi.dev/joke/${category}?type=single&amount=${amount}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return await res.json()
  } catch (e) {
    throw e
  }
}
