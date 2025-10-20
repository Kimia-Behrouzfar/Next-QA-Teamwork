import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteData, getData, postData } from "@/utils/fetcherAPI";

const API_URL = process.env.NEXT_PUBLIC_FETCH_URL;

export const fetchQuestions = createAsyncThunk("questions/fetchQuestions", async () => {
    try {
        const data = await getData(`${API_URL}/questions`)
        return data;
    } catch (error) {
        throw new Error("Failed to fetch questions");
    }
});

export const postQuestion = createAsyncThunk("questions/postQuestion", async (question) => {
    try {
        const response = await postData(`${API_URL}/questions`, question);
        return response;
    } catch (error) {
        throw new Error("Failed to post question");
    }
});

export const deleteQuestion = createAsyncThunk("questions/deleteQuestion", async (id) => {
    try {
        const response = await deleteData(`${API_URL}/questions`, id);
        return response;
    } catch (error) {
        console.error("Error deleting data:", error);
    }
});

const questionSlice = createSlice({
    name: "questions",
    initialState: {
        questions: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(postQuestion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postQuestion.fulfilled, (state, action) => {
                state.loading = false;
                state.questions.push(action.payload);
            })
            .addCase(postQuestion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteQuestion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = state.questions.filter(
                    (question) => question._id !== action.payload.id
                );
            })
            .addCase(deleteQuestion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default questionSlice.reducer;