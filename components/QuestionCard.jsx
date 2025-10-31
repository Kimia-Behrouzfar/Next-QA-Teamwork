'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Card, CardContent, Typography, IconButton, Modal, Button } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

export default function QuestionCard({ question, onDelete }) {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/questions/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete question')
      onDelete?.(id)
      setShow(true)
    } catch (err) {
      console.error(err)
    }
  }

  const handleClick = () => {
    const query = new URLSearchParams({ name: question.name }).toString()
    router.push(`/questions/${question._id}/answer?${query}`)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: 5,
          justifyContent: 'center',
          alignItems: "center",
          maxWidth: 800,
          mx: 'auto',
          mb: 2,
        }}
      >
        <Card
          onClick={handleClick}
          sx={{
            cursor: 'pointer',
            flex: 1,
            minHeight: 100,
            '&:hover': { boxShadow: 6 },
          }}
        >
          <CardContent
            sx={{
              width: '100%',
              zIndex: '9999',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box sx={{ textAlign: 'left', flex: 1 }}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>
                {question.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {question.description}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {new Date(question.createdAt).toLocaleString()}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* دکمه حذف */}
        <Box
          sx={{
            flexShrink: 0,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 1,
            boxShadow: 1,
            borderColor: 'grey.300',
            '&:hover': { boxShadow: 3, color: 'white' },
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={(e) => {
            e.stopPropagation()
            setOpenModal(true) // فقط مدال باز میشه
          }}
        >
          <IconButton size="small" sx={{ color: 'error.main' }}>
            <DeleteOutlineIcon />
          </IconButton>
        </Box>

        {/* پیام موفقیت حذف */}
        {show && (
          <Box
            sx={{
              width: 170,
              height: 70,
              textAlign: 'center',
              bgcolor: '#4caf50',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'fixed',
              left: '10px',
              bottom: '10px',
              fontSize: '14px',
              borderRadius: 2,
              zIndex: 9999,
              cursor: 'pointer',
            }}
            onClick={() => setShow(false)}
          >
            سوال با موفقیت حذف شد!
          </Box>
        )}
      </Box>

      {/* مدال تأیید حذف */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{

            bgcolor: 'background.paper',
            p: 6,
            paddingTop: "30px",       // فاصله داخلی بیشتر
            borderRadius: 3,
            boxShadow: 6,
            // width: 600,      // عرض بزرگتر
            // minHeight: 200,  // ارتفاع حداقل
            textAlign: 'center',

          }}
        >
          <Typography variant="p" sx={{ mb: 2 }}>
            {`Are you sure you want to delete the question about ${question.name}`}
          </Typography>
          <Box sx={{ display: 'flex', gap: "15px", mt: 2, paddingTop: "10px" }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setOpenModal(false)}
            // sx={{
            //   bgcolor: 'white',
            //   color: 'blue',
            //   '&:hover': { bgcolor: '#f0f0f0' },
            //   size: 'large',
            // }}
            >
              cancle
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleDelete(question._id)
                setOpenModal(false)
              }}
              sx={{
                bgcolor: '#356083ff',
                color: 'white',
                '&:hover': { bgcolor: '#2b70b6ff' },
                size: 'large',
              }}
            >
              delete
            </Button>
          </Box>
        </Box>
      </Modal >
    </>
  )
}


