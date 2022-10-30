import axios from 'axios'




// Login user
const login = async (userData) => {
  console.log("here at authservice")    
  const response = await axios.post('http://localhost:5000/api/v1/manager/login', userData)
  

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  logout,
  login,
}

export default authService
