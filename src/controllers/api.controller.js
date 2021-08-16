import { successResponse, errorResponse } from "../helpers";
import RegisterStudents from "../services/RegisterStudents";
import GetCommonsStudents from "../services/GetCommonsStudents";
import Suspend from "../services/Suspend";
import FindStudentByEmail from "../services/FindStudentByEmail";
import FindTutorByEmail from "../services/FindTutorByEmail";
import ReceiveNotifications from "../services/ReceiveNotifications";

export const register = async (req, res) => {
  try {
    const registerStudents = new RegisterStudents(req.body);
    await registerStudents.call();
    return successResponse(req, res, {}, 204);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getCommonsStudents = async (req, res) => {
  try {
    // put string to an array if only one tutor is passed
    const tutorEmails = Array.isArray(req.query.tutor)
      ? req.query.tutor
      : [req.query.tutor];
    const getCommonStudents = new GetCommonsStudents(tutorEmails);
    const commonStudentEmails = await getCommonStudents.call();

    return successResponse(req, res, commonStudentEmails, 200);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const suspend = async (req, res) => {
  try {
    const studentEmail = req.body.student;

    const student = await new FindStudentByEmail(studentEmail).call();
    if (student == null) {
      return successResponse(
        req,
        res,
        { message: "Resource not found", details: "Student does not exist" },
        404
      );
    }

    const suspend = new Suspend(student.id);
    await suspend.call();

    return successResponse(req, res, {}, 204);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const receiveNotifications = async (req, res) => {
  try {
    const { tutor, notification } = req.body;
    const existingTutor = await new FindTutorByEmail(tutor).call();
    if (existingTutor == null) {
      return successResponse(
        req,
        res,
        { message: "Resource not found", details: "Tutor does not exist" },
        404
      );
    }

    const receiveNotifications = new ReceiveNotifications({
      existingTutor,
      notification,
    });
    const notifiedStudents = await receiveNotifications.call();

    return successResponse(req, res, notifiedStudents, 200);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
