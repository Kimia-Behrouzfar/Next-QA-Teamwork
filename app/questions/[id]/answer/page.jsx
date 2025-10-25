'use client'

import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function AnswerPage() {
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm();
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        setAnswers([
            { _id: '1', body: 'Answer 1' },
            { _id: '2', body: 'Answer 2' },
        ]);
    }, []);

    const onSubmit = async (data) => {
        setAnswers(prev => [...prev, { _id: Date.now().toString(), ...data }]);
        reset();
    };

    const handleChange = (index, value) => {
        setAnswers(prev => {
            const newArr = [...prev];
            newArr[index].body = value;
            return newArr;
        });
    };

    const handleDelete = (index) => {
        setAnswers(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '75vh', px: 2 }}>
            <CardContent sx={{ width: '65%' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Question Title</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, borderBottom: '1px solid #dadadaff' }} fontSize="14px">
                    Question description
                </Typography>

                <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Answers:</Typography>

                {/* جواب‌های موجود */}
                {answers.map((a, idx) => (
                    <Box key={a._id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <TextField
                            fullWidth
                            value={a.body}
                            onChange={(e) => handleChange(idx, e.target.value)}
                            variant="outlined"
                            sx={{ bgcolor: 'white', borderRadius: 1 }}
                        />
                        <IconButton
                            onClick={() => handleDelete(idx)}
                            sx={{ ml: 1, bgcolor: '#f5f5f5', '&:hover': { bgcolor: '#f44336', color: '#fff' } }}
                        >
                            <DeleteOutlineIcon />
                        </IconButton>
                    </Box>
                ))}

                {/* فرم ثبت جواب جدید */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Write your answer"
                        variant="filled"
                        multiline
                        rows={4}
                        fullWidth
                        {...register('body', { required: true })}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '1px', backgroundColor: '#e9e9e9ff', border: 'none' }, mb: 2 }}
                    />
                    <TextField
                        label="Your name (optional)"
                        variant="filled"
                        fullWidth
                        {...register('author')}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '1px', backgroundColor: '#e9e9e9ff', border: 'none' }, mb: 2 }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', fontSize: '1rem', py: 1.2, my: 3, borderRadius: 2, '&:hover': { backgroundColor: '#1e40af' } }}
                    >
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Box>
    );
}
