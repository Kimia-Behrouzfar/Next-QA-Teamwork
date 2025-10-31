"use client";
import Form from "@/components/Form";
import FAQSection from "@/components/FAQSection";
import {
  deleteAnswer,
  editAnswer,
  fetchAnswers,
  postAnswer,
} from "@/redux/reducers/answer.slicer";
import {
  deleteQuestion,
  fetchQuestions,
  postQuestion,
} from "@/redux/reducers/question.slicer";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  function test() {
    //! Answer fetching destructuring
    // dispatch(fetchAnswers("React"))
    // dispatch(postAnswer({ content: 'Answer', skill: 'Question' }));
    // dispatch(editAnswer({ id: '68f381f305f59fe031c2be9a', content: 'Answerrrrr', skill: 'React' }));
    // dispatch(deleteAnswer({ id: '68f385731e227ca56b08a0f3', skill: 'React' }));
    //! Question fetching destructuring
    // dispatch(fetchQuestions())
    // const question = {name: 'React', description: 'what is React?'}
    // dispatch(postQuestion(question));
    // dispatch(deleteQuestion({ id: '68f37d7605f59fe031c2bd07' }))
  }
  test();

  return (
    <>
      <FAQSection />

      <Form />
    </>
  );
}
