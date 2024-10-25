const url = 'http://localhost:3333/'

export const authService = async (data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  }

  try {
    const response = await fetch(`${url}users/signin`, options)
    if (!response.ok) {
      throw new Error('Error en la solicitud')
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const registerService = async (data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  }

  try {
    const response = await fetch(`${url}registro`, options)
    if (!response.ok) {
      throw new Error('Error en la solicitud')
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const logout = async () => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }

  try {
    const response = await fetch(`${url}users/logout`, options)
    if (!response.ok) {
      throw new Error('Error en la solicitud')
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
