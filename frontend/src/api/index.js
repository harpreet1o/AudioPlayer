import axios from "axios";

const base_URL = "http://localhost:4000/";

export const validateUser = async (token) => {
  //bearer token is an opaque string which does not intend to have any meaning
  try {
    const res = await axios.get(`${base_URL}api/users/login`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
//getting all users
export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${base_URL}api/users/getAll`);

    return res.data.user;
  } catch (err) {
    return err;
  }
};
//getting all artists
export const getAllArtists = async () => {
  try {
    const res = await axios.get(`${base_URL}api/artist/getAll`);

    return res.data.artist;
  } catch (err) {
    return err;
  }
};
//getting all albums
export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${base_URL}api/album/getAll`);

    return res.data.album;
  } catch (err) {
    return err;
  }
};
//getting all songs
export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${base_URL}api/songs/getAll`);

    return res.data.song;
  } catch (err) {
    return err;
  }
};
// updating the users
export const changingUserRole = async (userId, role) => {
  try {
    const res = await axios.put(`${base_URL}api/users/updateRole/${userId}`, {
      data: { role: role },
    });
    return res;
  } catch (error) {
    return null;
  }
};
// deleting the user
export const removeUser = async (userId) => {
  try {
    const res = await axios.get(`${base_URL}api/users/delete/${userId}`);
    return res;
  } catch (error) {
    return null;
  }
};
export const saveNewSong = async (data) => {
  console.log(data);
  try {
    const res = await axios.post(`${base_URL}api/songs/save`, { ...data });
    return res.data.savedSong;
  } catch (error) {
    return null;
  }
};
export const saveNewArtist = async (data) => {
  try {
    console.log(data);
    const res = axios.post(`${base_URL}api/artist/save`, { ...data });
    return (await res).data.artist;
  } catch (error) {
    return null;
  }
};

export const saveNewAlbum = async (data) => {
  try {
    const res = axios.post(`${base_URL}api/album/save`, { ...data });
    return (await res).data.album;
  } catch (error) {
    return null;
  }
};

export const deleteSong = async (id) => {
  console.log(id);
  try {
    const res = axios.get(`${base_URL}api/songs/delete/${id}`);
    return res;
  } catch (err) {
    return null;
  }
};
export const deleteArtist = async (id) => {
  try {
    const res = axios.get(`${base_URL}api/artist/delete/${id}`);
    return res;
  } catch (err) {
    return null;
  }
};
export const deleteAlbum = async (id) => {
  console.log(id);
  try {
    const res = axios.get(`${base_URL}api/album/delete/${id}`);
    return res;
  } catch (err) {
    return null;
  }
};
//
