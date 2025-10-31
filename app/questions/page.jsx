"use client";

import { useEffect, useState, useMemo } from "react";
import QuestionCard from "@/components/QuestionCard";
import { Box, Typography, TextField, Stack } from "@mui/material";
import Filter from "@/components/Filter";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/api/questions");
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.json();
        const items = Array.isArray(data) ? data : data?.questions ?? [];
        setQuestions(items);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load questions");
      }
    };
    fetchQuestions();
  }, []);

  const filteredQuestions = useMemo(() => {
    return (questions ?? [])
      .filter((q) =>
        ((q?.name ?? "") + " " + (q?.description ?? ""))
          .toLowerCase()
          .includes((searchTerm ?? "").toLowerCase())
      )
      .sort((a, b) =>
        sortOrder === "newest"
          ? new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0)
          : new Date(a?.createdAt || 0) - new Date(b?.createdAt || 0)
      );
  }, [questions, searchTerm, sortOrder]);

  if (error) {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 6, color: "red" }}>
        Error: {error}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 4,
        mb: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "100%",
      }}
    >
      <Typography variant="h4" gutterBottom>
        All Questions
      </Typography>

      {/* 🔹 Search */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <TextField
          label="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            width: { xs: "90%", sm: 400 },
          }}
        />
      </Box>

      {/* 🔹 Filter buttons */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Filter value={sortOrder} onChange={setSortOrder} />
      </Box>

      {/* 🔹 Questions List */}
      <Stack
        spacing={2}
        sx={{
          width: "900px",
          padding: " 30px 50px",
          maxWidth: 900,
          backgroundColor: "blue",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#7e7e7e59",
        }}
      >
        {filteredQuestions.map((q) => (
          <QuestionCard
            key={q._id ?? q.id}
            question={q}
            onDelete={(id) =>
              setQuestions((prev) => prev.filter((p) => (p._id ?? p.id) !== id))
            }
          />
        ))}
        {filteredQuestions.length === 0 && (
          <Typography variant="body1" color="text.secondary">
            No questions found.
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
