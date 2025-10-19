"use client";
import { Box, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import AnsForm from "./AnsForm";
import { Delete, Done, Edit } from "@mui/icons-material";
import { delAns, editAns } from "@/utils/dataServices";
import { useState } from "react";

function Answers({ data }) {

  return (
    <>
      <Typography variant="h3" component="h1" mb={3} mt="7rem">
        {data.title}
      </Typography>
      <Typography gutterBottom>{data.description}</Typography>
      <Divider />
      <Typography variant="h5" my={5}>
        Answers:
      </Typography>
      <Stack gap={"2rem"} mt={5}>
        {data?.answers?.map((el) => (
          <Box key={el.id}>
            <Stack
              mb={5}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              gap="3rem"
              padding="2rem 1rem"
              sx={{ border: "0.5px solid rgba(128, 128, 128, 0.302)", borderRadius: "8px" }}
            >

                <TextField
                  defaultValue={el.ansText}
                  multiline
                  rows={5}
                  fullWidth
                  onChange={(e) => {
                    editAns(e.target.value, data.id, el.id);
                  }}
                />
              <Stack direction="row" gap={1}>
                <IconButton
                  onClick={async () => {
                    await delAns(data.id, el.id);
                  }}
                  sx={{
                    cursor: "pointer",
                    ":hover": {
                      color: "red",
                    },
                  }}
                >
                  <Delete />
                </IconButton>
              </Stack>
            </Stack>
            <Divider />
          </Box>
        ))}
      </Stack>
      <AnsForm id={data.id} />
    </>
  );
}

export default Answers;
