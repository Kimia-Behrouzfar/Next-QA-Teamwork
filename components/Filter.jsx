'use client'
import { Box, Button } from '@mui/material'

export default function Filter({ value, onChange }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
      <Button
        variant={value === 'newest' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => onChange('newest')}
      >
        New to Old
      </Button>
      <Button
        variant={value === 'oldest' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => onChange('oldest')}
      >
        Old to New
      </Button>
    </Box>
  )
}
