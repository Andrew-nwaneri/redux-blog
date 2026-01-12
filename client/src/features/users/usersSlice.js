import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const users_url = "https://jsonplaceholder.typicode.com/users" 

export const fetchUsers = createAsyncThunk("user/fetchUsers", async (_, {rejectWithValue}) => {
    try{
        const response = await axios.get(users_url);
        return response.data;
    }catch(err){
        console.log("Users fetch failed", err.message);
        return rejectWithValue(err.message);    
    }
});

const initialState = { users: [] }

export const usersSlice = createSlice({
    name: "usersManager",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            fetchUsers.fulfilled, (state, action) => {
                const updatedUsers = action.payload.map( user => {return {...user, id: Number(user.id)}})
                state.users = updatedUsers;
            }
        )

    }
})

export const allUsers = (state) => state.usersManager.users;
export const userById = (state, userId) => state.usersManager.users.find(user => user.id === userId);

export default usersSlice.reducer;

