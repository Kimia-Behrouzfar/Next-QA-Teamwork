'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Box, TextField, Button, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'

export default function EditQuestionPage() {
    const { id } = useParams()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm()

    const helperTexts = {
        title: {
            required: 'Title is required',
            minLength: 'Title must be at least 5 characters',
            maxLength: 'Title must be at most 50 characters',
            default: 'Enter a short, descriptive title (3–50 characters)',
        },
        description: {
            required: 'Description is required',
            minLength: 'Description must be at least 10 characters',
            maxLength: 'Description must be at most 200 characters',
            default: 'Describe your question clearly (10–200 characters)',
        },
    }

    useEffect(() => {
        const fetchQuestion = async () => {
            const res = await fetch(`/api/questions/${id}`)
            const data = await res.json()
            setValue('title', data.title)
            setValue('description', data.description)
        }
        fetchQuestion()
    }, [id, setValue])

    const onSubmit = async (formData) => {
        const res = await fetch(`/api/questions/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })

        if (res.ok) router.push('/questions')
        else alert('Failed to update question')
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                width: '70%',
                mx: 'auto',
                mt: 6,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
            }}
        >
            <Typography variant="h4" textAlign="center">
                Edit Question
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
                {...register('title', {
                    required: true,
                    minLength: 5,
                    maxLength: 50,
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
                }}
            >
                Save Changes
            </Button>
        </Box>
    )
}
