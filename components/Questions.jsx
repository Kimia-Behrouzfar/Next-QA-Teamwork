"use client";
import { Box, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteQues } from "@/utils/dataServices";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function Questions({ data }) {
  const [inputValue, setInputValue] = useState("");
  const [qData, setQData] = useState(data);

  function handleChange(e) {
    setInputValue(e.target.value);
  }
  async function handleRemove(id) {
    await deleteQues(id);
  }
  return (
    <Stack>
      <Stack justifyContent="center" alignItems="center" gap={4} mb={"4rem"}>
        <TextField
          value={inputValue}
          onChange={handleChange}
          placeholder="Search"
          sx={{ width: "600px" }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          size="small"
        />
        <Stack direction="row" gap="2rem">
          Filter By :
          <Box
            onClick={() => {
              setQData([...qData.sort((a, b) => Date.parse(b.createdTime) - Date.parse(a.createdTime))]);
            }}
          >
            <Typography sx={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
              <ArrowDownwardIcon fontSize="small" /> Newer
            </Typography>
          </Box>
          <Box
            onClick={() => {
              setQData([...qData.sort((a, b) => Date.parse(a.createdTime) - Date.parse(b.createdTime))]);
            }}
          >
            <Typography sx={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
              <ArrowDownwardIcon fontSize="small" /> Older
            </Typography>
          </Box>
        </Stack>
      </Stack>
      <Stack gap="2rem" mb={15}>
        {qData
          ?.filter((item) => item.title.toLowerCase().includes(inputValue.toLowerCase()))
          ?.map((el) => {
            return (
              <Stack key={el.id} direction="row" alignItems="stretch" gap="2rem">
                <Link href={`/questions/${el.id}`} style={{ width: "90%" }}>
                  <Stack
                    sx={{
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                      padding: "1rem 2rem",
                      cursor: "pointer",
                      transition: "all ease-in 0.1s",
                      ":hover": { transform: "scale(1.05)" },
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6" color="text.primary" gutterBottom>
                        {el.title}
                      </Typography>
                      <Typography variant="subtitle2" color="text.primary">
                        {el.createdTime}
                      </Typography>
                    </Stack>
                    <Typography variant="subtitle2" color="text.primary">
                      {el.description.length > 30 ? el.description.slice(0, 30) + "..." : el.description}
                    </Typography>
                  </Stack>
                </Link>
                <Stack
                  justifyContent="center"
                  direction="row"
                  alignItems="center"
                  onClick={() => handleRemove(el.id)}
                  sx={{
                    width: "10%",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    cursor: "pointer",
                    ":hover": {
                      color: "red",
                    },
                  }}
                >
                  <DeleteIcon fontSize="large" />
                </Stack>
              </Stack>
            );
          })}
      </Stack>
    </Stack>
  );
}

export default Questions;
