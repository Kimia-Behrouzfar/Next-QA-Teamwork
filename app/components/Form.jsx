'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Box, TextField, Button } from '@mui/material'
import PostQuestion from '../actions/questionAction'

export default function Form() {
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
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const result = await PostQuestion(data)
            console.log("Saved:", result)
            reset()
            alert("Question saved successfully!")
        } catch (err) {
            console.error(err)
            alert("Failed to save question")
        }
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                width: '70%',
                mx: 'auto',
                mt: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
            }}
        >
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
                {...register('title', {
                    required: true,
                    minLength: 5,
                    maxLength: 50,
                    pattern: {
                        value: /^[A-Za-z0-9\s]+$/,
                        message: 'Title contains invalid characters',
                    },
                })}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: '#f5f5f5',
                    },
                }}
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
                {...register('description', {
                    required: true,
                    minLength: 10,
                    maxLength: 200,
                    pattern: {
                        value: /^[A-Za-z0-9\s.,!?'"-]+$/,
                        message: 'Description contains invalid characters',
                    },
                })}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: '#f5f5f5',
                    },
                }}
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                    py: 1.5,
                    borderRadius: '10px',
                    fontSize: '1rem',
                    textTransform: 'none',
                    mb: 5,
                }}
            >
                Submit
            </Button>
        </Box>
    )
}
