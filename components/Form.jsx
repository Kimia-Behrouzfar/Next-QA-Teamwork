"use client";
import { postQues } from "@/utils/dataServices";
import { Button, CircularProgress, Container, Dialog, DialogActions, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

function Form() {
  const [openDialog, setOpenDialog] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting},
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      createdTime: "",
      answers: [],
    },
  });

  async function onSubmit(data) {
    await postQues(data);
    reset();
  }
  return (
    <Container>
      <Stack alignItems="center" component="section" mb={20}>
        <Typography variant="h3" component="h2" textAlign="center" mb="3rem">
          Ask your question
        </Typography>

        <Stack component="form" method="post" gap="1.5rem" sx={{ width: "100%" }}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <TextField disabled={isSubmitting} variant="filled" {...field} label={"Title"} />}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => <TextField disabled={isSubmitting} variant="filled" {...field} label={"Description"} multiline rows={3} />}
          />
          <Button sx={{ height: "2.5rem" }} disabled={isSubmitting} type="button" onClick={() => setOpenDialog(true)} variant="contained">
            {isSubmitting ? <CircularProgress color="primary" size={16} /> : "Submit"}
          </Button>
        </Stack>

        <Dialog maxWidth="xs" fullWidth open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogActions>
            <Button variant="outlined" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setOpenDialog(false);
                handleSubmit(onSubmit)();
              }}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  );
}

export default Form;
