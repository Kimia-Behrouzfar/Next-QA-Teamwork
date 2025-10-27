import { getData, postData, deleteData, putData } from "@/utils/fetcherAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.NEXT_PUBLIC_FETCH_URL;

export const fetchAnswers = createAsyncThunk(
  "answers/fetchAnswers",
  async (skill) => {
    try {
      const data = await getData(`${API_URL}/answers/${skill}`);
      return data;
    } catch (error) {
      console.error("❌ Error fetching answers:", error);
    }
  }
);

export const postAnswer = createAsyncThunk(
  "answers/postAnswer",
  async ({ content, skill }, thunkAPI) => {
    try {
      const response = await postData(`${API_URL}/answers/${skill}`, {
        content: content,
      });
      return response;
    } catch (error) {
      console.error("❌ Error posting answer:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editAnswer = createAsyncThunk(
  "answers/editAnswer",
  async ({ id, content, skill }, thunkAPI) => {
    try {
      const response = await putData(`${API_URL}/answers/${skill}`, {
        id,
        content,
      });
      return response;
    } catch (error) {
      console.error("❌ Error editing answer:", error);
    }
  }
);

export const deleteAnswer = createAsyncThunk(
  "answers/deleteAnswer",
  async ({ id, skill }, thunkAPI) => {
    try {
      const response = await deleteData(`${API_URL}/answers/${skill}`, { id });
      console.log(response);
      return response;
    } catch (error) {
      console.error("❌ Error deleting answer:", error);
    }
  }
);

const answerSlice = createSlice({
  name: "answers",
  initialState: {
    answers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnswers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnswers.fulfilled, (state, action) => {
        state.loading = false;
        state.answers = action.payload;
      })
      .addCase(fetchAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.answers.push(action.payload);
      })
      .addCase(postAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editAnswer.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.answers.findIndex(
          (answer) => answer._id === action.payload._id
        );
        if (index !== -1) {
          state.answers[index] = action.payload;
        }
      })
      .addCase(editAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.answers = state.answers.filter(
          (answer) => answer._id !== action.payload._id
        );
      })
      .addCase(deleteAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default answerSlice.reducer;
