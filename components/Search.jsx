import { TextField, Box } from "@mui/material";

export default function Search({ value, onChange }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search questions..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          width: { xs: "90%", sm: 300 },
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            bgcolor: "#f3f4f6",
          },
        }}
      />
    </Box>
  );
}
