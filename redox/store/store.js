import { configureStore } from "@reduxjs/toolkit";
import questionSlice from "../reducers/question.slicer";
import answerSlice from "../reducers/answer.slicer";

const store = configureStore({
    reducer: {
        question: questionSlice,
        answer: answerSlice,
    },
});

export default store;