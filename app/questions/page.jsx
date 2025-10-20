"use client";

import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import Search from "@/components/Search";
import Filter from "@/components/Filter";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch("/api/questions");
      const data = await res.json();
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  const filteredQuestions = questions
    .filter((q) => q.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">All Questions</h1>
      <Search value={searchTerm} onChange={setSearchTerm} />
      <Filter value={sortOrder} onChange={setSortOrder} />
      <div className="space-y-4 mt-6">
        {filteredQuestions.map((q) => (
          <QuestionCard
            key={q._id}
            question={q}
            onDelete={(id) => {
              setQuestions((prev) => prev.filter((q) => q._id !== id));
            }}
          />
        ))}
      </div>
    </div>
  );
}
