import apiCinema from "./apiCinema.js";

const BASE_URL = "http://localhost:3005/api/";

const getAllUsers = async () => {  
    return await apiCinema.get('users');
}

const getPermissions = async () => {
    return await apiCinema.get('permissions');
}

export { getAllUsers,getPermissions };