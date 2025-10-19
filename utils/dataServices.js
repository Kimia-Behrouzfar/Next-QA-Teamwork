"use server";

import { revalidateTag } from "next/cache";

const url = "http://localhost:3000/api/v1/q&a";

export async function getAllData() {
  const res = await fetch(url, { next: { tags: ["ques"] } });
  const data = await res.json();
  return data;
}

export async function postQues(ques) {
  await fetch(url, { method: "POST", body: JSON.stringify(ques) });
  revalidateTag("ques");
}

export async function deleteQues(id) {
  await fetch(`${url}/${id}`, { method: "DELETE" });
  revalidateTag("ques");
}

export async function getQues(id) {
  const res = await fetch(`${url}/${id}`, { next: { tags: ["ans", "ques"] } });
  const data = await res.json();
  return data;
}

export async function postAns(ques, id) {
  await fetch(`${url}/${id}`, { method: "PATCH", body: JSON.stringify(ques) });

  revalidateTag("ans");
}

export async function delAns(id, ansId) {
  await fetch(`${url}/${id}?delA=${ansId}`, { method: "DELETE" });
  revalidateTag("ans");
}
export async function editAns(body, id, ansId) {
  await fetch(`${url}/${id}?editA=${ansId}`, { method: "PATCH", body: JSON.stringify({ text: body }) });
  revalidateTag("ans");
}
