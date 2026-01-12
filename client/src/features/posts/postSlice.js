import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from "date-fns"
import axios from 'axios'

const posts_url = "https://jsonplaceholder.typicode.com/posts" 

const postsAdapter = createEntityAdapter({
    sortCompare: (a, b) => b.date.localCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
    errors: null,
    status: "idle", // succeeded, loading, failed
    count: 0,
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, {rejectWithValue}) => {
    try{
       const response = await axios.get(posts_url) 
        return response.data;
    }catch(err){
        console.log('Request Failed...', err.message);
        return rejectWithValue(err.message);
    }
});

export const addPost = createAsyncThunk('posts/addPost', async (initialPost, {rejectWithValue}) => {
    try{
       const response = await axios.post(posts_url, initialPost);
       return response.data
    }catch(err){
        console.log("Failed to upload post", err.message)
        return rejectWithValue(err.message);
    }
});

export const editPost = createAsyncThunk('posts/editPost', async (initialPost, {rejectWithValue}) => {
    try{
        const { id } = initialPost
       const response = await axios.put(`${posts_url}/${id}`, initialPost);
       return response.data
    }catch(err){
        console.log("Failed to edit post", err.message)
        return rejectWithValue(err.message);
    }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId, {rejectWithValue}) => {
    try{

       const response = await axios.delete(`${posts_url}/${postId}`);
       if(response?.status !== 200){
        console.log(response.status, ":", response.statusText)
        return;
       }
       return postId;
    }catch(err){
        console.log("Failed to delete post", err.message)
        return rejectWithValue(err.message);
    }
});

const postSlice = createSlice({
    name: "postManager",
    initialState,
    reducers: {
        addReaction(state, action){
                const { postId, reaction } = action.payload;
                // const post = state.postsManager.posts.find(post => post.id == postId);
                const post = state.entities[postId]; 
                post? post.reactions[reaction] +=1 : console.log("couldn't find post")
            },
    },
    extraReducers: (builder) => {
            builder
            .addCase(
                fetchPosts.pending, (state) => {
                    state.status = "loading"
                }

            )
            .addCase(
                fetchPosts.fulfilled, (state, action) => {
                    state.status = "succeeded"
                    let min = 1;
                    const updatedPosts = action.payload.map(post => {return {
                                                                                ...post,
                                                                                reactions: {
                                                                                like: 0,
                                                                                love: 0,
                                                                                wow: 0,
                                                                                haha: 0,
                                                                                insightful: 0,
                                                                                angry: 0,
                                                                            }, 
                                                                            date: sub(new Date(), { minutes: min++ }).toISOString()};
                                                                            });
                    // state.posts = state.posts.concat(updatedPosts);  
                    postsAdapter.upsertMany(state, updatedPosts)
                }

            )
            .addCase(
                fetchPosts.rejected, (state, action) => {
                    state.status = "failed"
                    state.errors = action.payload || action.error.message;
                }

            )
            .addCase(
                addPost.fulfilled, (state, action) => {
                    action.payload.userId = Number(action.payload.userId);
                    action.payload.reactions = {
                                                                                like: 0,
                                                                                love: 0,
                                                                                wow: 0,
                                                                                haha: 0,
                                                                                insightful: 0,
                                                                                angry: 0,
                                                                            };
                    action.payload.date = new Date().toISOString();
                    // state.posts.push(action.payload);     
                    postsAdapter.addOne(state, action.payload);                                                   
                }
            )
            .addCase(
                editPost.fulfilled, (state, action) => {
                    if (action.payload?.id){
                        const existing = state.entities[Number(action.payload.id)]
                        const editedPost = {
                            ...action.payload,
                            reactions: existing?.reactions?? {
                                                                                like: 0,
                                                                                love: 0,
                                                                                wow: 0,
                                                                                haha: 0,
                                                                                insightful: 0,
                                                                                angry: 0,
                            },
                            date: new Date().toISOString(),
                        }
                        // state.posts = state.posts.filter(post => post.id !== Number(action.payload.id));
                        // state.posts.push(action.payload);
                        postsAdapter.upsertOne(state, editedPost);
                        console.log('update successful');
                    }else{
                        console.log('could not edit post', action.payload)
                    }
                }
            )
            .addCase(
                deletePost.fulfilled, (state, action) => {
                    // state.posts = state.posts.filter(post => post.id !== Number(action.payload))
                    postsAdapter.removeOne(state, action.payload)
                    console.log("Post Delete was successfull", action.payload);
                }
            )
        }

});

export const postErrors = (state) => state.postManager.errors;
export const postStatus = (state) => state.postManager.status;
export const { selectById: findPost,
        selectAll: allPosts,
        selectIds: allPostsIDs
} = postsAdapter.getSelectors(state => state.postManager);

export const {addReaction} = postSlice.actions;

// export const findPost = (state, postId) => state.postManager.posts.find((post) =>  postId === post.id);
// export const allPosts = (state) => state.postManager.posts;

export const findByUserId = createSelector(
    [allPosts, (state, userId) => userId], (posts, userId) => posts.filter( post => userId === post.userId)
)

export default postSlice.reducer;





