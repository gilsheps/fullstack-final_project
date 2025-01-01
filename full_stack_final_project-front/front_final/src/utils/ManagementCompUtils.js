import api from "../utils/api.js";

const BASE_URL = "http://localhost:3005/api/";

const getAllUsers = async () => {  
    return await api.get('users');
}

const getPermissions = async () => {
    return await api.get('permissions');
}

export { getAllUsers,getPermissions };