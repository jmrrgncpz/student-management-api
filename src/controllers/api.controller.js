import { successResponse, errorResponse } from "../helpers";
import RegisterStudents from "../services/RegisterStudents";
import GetCommonsStudents from "../services/GetCommonsStudents";

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
    const tutorEmails = Array.isArray(req.query.tutor) ? req.query.tutor : [req.query.tutor];
    const getCommonStudents = new GetCommonsStudents(tutorEmails);
    const commonStudentEmails = await getCommonStudents.call();
    
    return successResponse(req, res, commonStudentEmails, 200);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}