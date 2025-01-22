import api from "../utils/api";

export const handleEditMember = (member, setEditClick, setCurrentMember, setActiveTab) => {
  setEditClick(true);
  setCurrentMember(member);
  setActiveTab(1);
};

export const handleDeleteMember = async (member) => {
  await api.delete(`/members/${member._id}`);
  window.location.reload();
};

export const handleMovieClick = (e, setValue) => {
  localStorage.setItem("newValue", "1");
  localStorage.setItem("movieName", e.target.text);
  setValue("1");
};

export const toggleSelectVisibility = (memberId, setVisibleSelect) => {
  setVisibleSelect((prevState) => ({
    ...prevState,
    [memberId]: !prevState[memberId], // Toggle visibility for this member
  }));
};

export const handleSubscribeClick = async (member, selectValue, datePicker) => {
  await api.post("subscriptions", {
    memberId: member._id,
    movies: [
      {
        movieId: selectValue._id,
        date: Object.keys(datePicker).length == 0 ? new Date().toISOString() : datePicker,
      },
    ],
  });
  window.location.reload();
};
