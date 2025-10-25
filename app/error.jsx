'use client'

import { Container, Typography, Button, Box } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function Error({
  error,
  reset,
}) {
  const router = useRouter()

  return (
    <Container>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom color="error">
          Something went wrong!
        </Typography>
        
        <Typography variant="body1" paragraph>
          {error?.message || 'An unexpected error occurred'}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button 
            variant="contained" 
            onClick={() => reset()}
            sx={{ bgcolor: 'primary.main' }}
          >
            Try Again
          </Button>
          
          <Button 
            variant="outlined" 
            onClick={() => router.push('/')}
          >
            Go Home
          </Button>
        </Box>
      </Box>
    </Container>
  )
}










