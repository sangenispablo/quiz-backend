import { request, response } from "express";

export const getQuiz = (req = request, res = response) => {
  res.json({ ok: true, msg: "get quizes" });
};

export const createQuiz = (req = request, res = response) => {
  res.json({ ok: true, msg: "create quiz" });
};

export const updateQuiz = (req = request, res = response) => {
  const { id } = req.params;
  res.json({ ok: true, msg: `update quiz ${id}` });
};

export const deleteQuiz = (req = request, res = response) => {
  const { id } = req.params;
  res.json({ ok: true, msg: `delete quiz ${id}` });
};
