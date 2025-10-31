"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function Form() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(null);
  const router = useRouter();

  const helperTexts = {
    title: {
      required: "Title is required",
      minLength: "Title must be at least 5 characters",
      maxLength: "Title must be at most 50 characters",
      pattern: "Title contains invalid characters",
      default: "Enter a short, descriptive title (3–50 characters)",
    },
    description: {
      required: "Description is required",
      minLength: "Description must be at least 10 characters",
      maxLength: "Description must be at most 200 characters",
      pattern: "Description contains invalid characters",
      default: "Describe your question clearly (10–200 characters)",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setFormData(data);
    setOpen(true);
  };

  const handleConfirm = async () => {
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.title,
          description: formData.description,
        }),
      });

      if (!res.ok) throw new Error("Failed to save question");

      reset();
      setShow(true);
      setTimeout(() => {
        setShow(false);
        router.push("/questions");
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Failed to save question");
    } finally {
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: "70%",
        mx: "auto",
        mt: 6,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h4" textAlign="center" pb="5px">
        Ask your question
      </Typography>

      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        error={!!errors.title}
        helperText={
          errors.title
            ? helperTexts.title[errors.title.type]
            : helperTexts.title.default
        }
        {...register("title", {
          required: true,
          minLength: 5,
          maxLength: 50,
          pattern: /^[\u0600-\u06FFa-zA-Z0-9\s.,!?'"()-]+$/,
        })}
      />

      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        error={!!errors.description}
        helperText={
          errors.description
            ? helperTexts.description[errors.description.type]
            : helperTexts.description.default
        }
        {...register("description", {
          required: true,
          minLength: 10,
          maxLength: 200,
          pattern: /^[A-Za-z0-9\s.,!?'"-]+$/,
        })}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          py: 1.5,
          borderRadius: "10px",
          fontSize: "1rem",
          textTransform: "none",
          mb: 5,
        }}
      >
        Submit
      </Button>

      <Dialog
        open={open}
        onClose={handleCancel}
        PaperProps={{
          sx: {
            width: "400px",
            maxWidth: "90vw",
            height: "150px",
            borderRadius: "10px",
            p: 2,
          },
        }}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button onClick={handleCancel} color="error">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {show && (
        <Box
          sx={{
            width: 170,
            height: 70,
            textAlign: "center",
            bgcolor: "#4caf50",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            left: "10px",
            bottom: "10px",
            fontSize: "14px",
            borderRadius: 2,
            zIndex: 9999,
            cursor: "pointer",
          }}
          onClick={() => setShow(false)}
        >
          Question saved successfully!
        </Box>
      )}
    </Box>
  );
}
