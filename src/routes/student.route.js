import express from "express";
import httpStatus from "http-status";
import sendResponse from "#utils/response";
import {
  addStudentMarksController,
  createStudentController,
  getAllStudentsController,
  getStudentByIdController,
  updateStudentController,
} from "#controllers/student";

const studentRouter = express.Router();

studentRouter.post("/", createStudent);
studentRouter.put("/:id", updateStudent);
studentRouter.get("/:id", getStudentById);
studentRouter.get("/", getAllStudents);
studentRouter.post("/mark/:id", addStudentMark);
async function createStudent(req, res, next) {
  try {
    const studentData = req.body;
    await createStudentController(studentData);
    sendResponse(res, 200, null, "Student created successfully");
  } catch (error) {
    next(error);
  }
}

async function updateStudent(req, res, next) {
  try {
    const { id } = req.params;
    const studentData = req.body;
    studentData.id = id;
    await updateStudentController(studentData);
    sendResponse(res, 200, null, "Student Updated successfully");
  } catch (error) {
    next(error);
  }
}

async function getStudentById(req, res, next) {
  try {
    const { id } = req.params;
    const studentData = await getStudentByIdController(id);
    sendResponse(res, 200, studentData);
  } catch (error) {
    next(error);
  }
}

async function getAllStudents(req, res, next) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const students = await getAllStudentsController({ page, limit });
    sendResponse(res, 200, students);
  } catch (error) {
    next(error);
  }
}

async function addStudentMark(req, res, next) {
  try {
    const {id} = req.params;
    let marksData = req.body;
       marksData.id = id;
    await addStudentMarksController(marksData);
    return sendResponse(res, 200, null, "student Marks added successfulyy");
  } catch (error) {
    next(error);
  }
}

export default studentRouter;
