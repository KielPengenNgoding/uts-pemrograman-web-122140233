import axios from 'axios'

const API_URL = 'https://fakestoreapi.com'

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`)
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error)
    throw error
  }
}