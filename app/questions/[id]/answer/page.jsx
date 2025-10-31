'use client'

import React, { useEffect, useState } from 'react'
import { Box, Typography, TextField, Button, CardContent, IconButton } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useParams, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

export default function AnswerPage() {
    const { id: questionId } = useParams()
    const searchParams = useSearchParams()


    const { register, handleSubmit, reset } = useForm()
    const [answers, setAnswers] = useState([])

    const name = searchParams.get('name') || 'Untitled Question'

    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const res = await fetch(`/api/answers?questionId=${questionId}`)
                const data = await res.json()
                setAnswers(data)
            } catch (err) {
                console.error('Failed to fetch answers:', err)
            }
        }
        fetchAnswers()
    }, [questionId])

    // 🟦 افزودن جواب جدید
    const onSubmit = async (data) => {
        try {
            const res = await fetch('/api/answers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, questionId }),
            })
            const newAnswer = await res.json()
            setAnswers((prev) => [newAnswer, ...prev])
            reset()
        } catch (err) {
            console.error('Failed to save answer:', err)
        }
    }

    // 🟨 حذف جواب
    const handleDelete = async (id) => {
        try {
            await fetch(`/api/answers?id=${id}`, { method: 'DELETE' })
            setAnswers((prev) => prev.filter((a) => a._id !== id))
        } catch (err) {
            console.error('Error deleting answer:', err)
        }
    }

    // 🟩 ویرایش خودکار جواب در دیتابیس (بدون Submit)
    const handleChange = async (index, newValue) => {
        const updated = [...answers]
        updated[index].content = newValue
        setAnswers(updated)

        try {
            await fetch('/api/answers', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: updated[index]._id,
                    content: newValue,
                }),
            })
        } catch (err) {
            console.error('Error updating answer:', err)
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 2, mt: 3, width: '100%' }}>
            <CardContent sx={{ width: '65%' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Question Title
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: 'text.secondary', mt: 2, borderBottom: '1px solid #dadadaff' }}
                    fontSize="14px"
                >
                    {name}
                </Typography>

                <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                    Answers:
                </Typography>

                {answers.map((a, idx) => (
                    <Box key={a._id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <TextField
                            fullWidth
                            value={a.content}
                            onChange={(e) => handleChange(idx, e.target.value)}
                            variant="outlined"
                            sx={{ bgcolor: 'white', borderRadius: 1 }}
                        />
                        <IconButton
                            onClick={() => handleDelete(a._id)}
                            sx={{
                                ml: 1,
                                bgcolor: '#f5f5f5',
                                '&:hover': { bgcolor: '#f44336', color: '#fff' },
                            }}
                        >
                            <DeleteOutlineIcon />
                        </IconButton>
                    </Box>
                ))}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Write your answer"
                        variant="filled"
                        multiline
                        rows={4}
                        fullWidth
                        {...register('content', { required: true })}
                        sx={{
                            '& .MuiFilledInput-root': {
                                borderRadius: '1px',
                                backgroundColor: '#e9e9e9ff',
                                border: 'none',
                            },
                            mb: 2,
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            backgroundColor: '#2563eb',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            py: 1.2,
                            my: 3,
                            borderRadius: 2,
                            '&:hover': { backgroundColor: '#1e40af' },
                        }}
                    >
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Box>

    )
}
