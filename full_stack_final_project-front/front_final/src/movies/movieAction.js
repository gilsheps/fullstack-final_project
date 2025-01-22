import api from "../utils/api"

export const handleDeleteMovie = async movie => {
  await api.delete(`/movies/${movie._id}`)
  window.location.reload()
}


// , setLoading, setMovies, setTotalPages
