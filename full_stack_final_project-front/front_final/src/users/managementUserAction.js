import api from "../utils/api";

export const handleEditUser = (e, user, setUser, setEditClick, setActiveTab) => {
  e.preventDefault();
  setEditClick(true);
  setUser(user);
  setActiveTab(1);
};

export const handleDelteUser = async (user) => {
  console.log(user);
  await api.delete(`/users/${user.id}`);
  window.location.reload();
};
