import api from "./api.js";


const getAllUsers = async () => {  
    return await api.get('users');
}

const getPermissions = async () => {
    return await api.get('permissions');
}

export { getAllUsers,getPermissions };