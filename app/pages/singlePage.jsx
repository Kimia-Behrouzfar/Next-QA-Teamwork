"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  Box,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Home() {
  const [answers, setAnswers] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim() === "") return;
    setAnswers([...answers, input]);
    setInput("");
  };

  const handleDelete = (index) => {
    setAnswers(answers.filter((_, i) => i !== index));
  };

  const handleEdit = (index, newValue) => {
    const updated = [...answers];
    updated[index] = newValue;
    setAnswers(updated);
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 8,
        textAlign: "center",
        p: 2,
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Next.js
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        What is Next.js?
      </Typography>

      <Typography variant="h6" sx={{ textAlign: "left", mt: 3 }}>
        Answers:
      </Typography>

      <TextField
        fullWidth
        label="Write your answer..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        variant="outlined"
        sx={{ mt: 1, mb: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Submit
      </Button>

      <Stack spacing={2} sx={{ mt: 3 }}>
        {answers.map((answer, index) => (
          <Card key={index}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextField
                variant="standard"
                value={answer}
                onChange={(e) => handleEdit(index, e.target.value)}
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "1rem" },
                }}
              />

              <IconButton color="error" onClick={() => handleDelete(index)}>
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
