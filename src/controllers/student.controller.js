import Marks from "#models/marks";
import Student from "#models/student";
import httpStatus from "http-status";

export const createStudentController = async (studentData) => {
  const { email } = studentData;
  const findStudent = await Student.findOne({
    where: {
      email: email,
    },
  });
  if (findStudent) {
    throw {
      status: false,
      message: "Student already exists",
      httpStatus: httpStatus.BAD_REQUEST,
    };
  }
  await Student.create(studentData);
  return true;
};

export const updateStudentController = async (studentData) => {
  const { id, marksId, email } = studentData;
  const findStudent = await Student.findOne({
    where: {
      id: id,
    },
  });
  if (!findStudent) {
    throw {
      status: false,
      message: "Student doesn't exist!",
      httpStatus: httpStatus.BAD_REQUEST,
    };
  }

  if (email) {
    let studentExist = await Student.findOne({ where: { email: email } });
    if (studentExist) {
      throw {
        status: false,
        message: "Updated email already exist!",
        httpStatus: httpStatus.BAD_REQUEST,
      };
    }
  }

  if (marksId) {
    let marksData = await Marks.findOne({
      where: { id: marksId },
    });
    if (!marksData) {
      throw {
        status: false,
        message: "Marks doesn't exist!",
        httpStatus: httpStatus.BAD_REQUEST,
      };
    }
  }

  await Student.update(studentData, { where: { id: id } });
  return true;
};

export const getStudentByIdController = async (id) => {
  const findStudent = await Student.findOne({
    where: {
      id: id,
    },
    include: [{ model: Marks, as: "marks" }],
  });
  if (!findStudent) {
    throw {
      status: false,
      message: "Student doesn't exist!",
      httpStatus: httpStatus.BAD_REQUEST,
    };
  }
  return findStudent;
};
export const getAllStudentsController = async ({ page, limit }) => {
  const offset = (page - 1) * limit;
  const parsedLimit = parseInt(limit);
  const parsedOffset = parseInt(offset);

  const { count, rows } = await Student.findAndCountAll({
    where: {
      isActive: true,
    },
    offset: parsedOffset,
    limit: parsedLimit,
    include: [{ model: Marks, as: "marks" }],
    order: [["createdAt", "DESC"]], // Optional: sort by latest
  });

  return {
    totalItems: count,
    totalPages: Math.ceil(count / parsedLimit),
    currentPage: parseInt(page),
    students: rows,
  };
};

export const addStudentMarksController = async (marksData) => {
  const { studentId } = marksData;
  const findStudent = await Student.findOne({
    where: {
      id: studentId,
    },
  });
  if (!findStudent) {
    throw {
      status: false,
      message: "Student doesn't exist!",
      httpStatus: httpStatus.BAD_REQUEST,
    };
  }
  await Marks.create(marksData);
  return true;
};
