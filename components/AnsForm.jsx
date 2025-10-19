"use client";
import { postAns } from "@/utils/dataServices";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

function AnsForm({ id }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      ansText: "",
    },
  });

  async function handleSubmitForm(data) {
    await postAns(data, id);
    reset();
  }
  return (
    <Stack onSubmit={handleSubmit(handleSubmitForm)} mb={10} component="form" method="post" gap="1.5rem" sx={{ width: "100%" }}>
      <Controller
        name="ansText"
        control={control}
        render={({ field }) => <TextField disabled={isSubmitting} variant="filled" {...field} placeholder="Write your answer..." multiline rows={3} />}
      />
      <Button type="submit" sx={{ height: "2.5rem" }} disabled={isSubmitting} variant="contained">
        {isSubmitting ? <CircularProgress color="primary" size={16} /> : "Submit"}
      </Button>
    </Stack>
  );
}

export default AnsForm;
