const request = require("supertest");
const app = require("../testEntry");
const faker = require("faker");

const { truncate } = require("../testHelper");

const { fake } = require("faker");

describe("Api Controller", () => {
  describe("Register API", () => {
    describe("Invalid body", () => {
      it("should fail without tutor ", async (done) => {
        const { statusCode, body } = await request(app)
          .post("/api/register")
          .send();
        const { message, details } = body;

        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([{ tutor: '"tutor" is required' }]);
        expect(statusCode).toEqual(400);
        done();
      });

      it("should fail without students ", async (done) => {
        const { statusCode, body } = await request(app)
          .post("/api/register")
          .send({ tutor: "tutorken@gmail.com" });
        const { message, details } = body;

        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([{ students: '"students" is required' }]);
        expect(statusCode).toEqual(400);
        done();
      });

      it("should fail with students being empty", async (done) => {
        const { statusCode, body } = await request(app)
          .post("/api/register")
          .send({ tutor: "tutorken@gmail.com", students: [] });
        const { message, details } = body;

        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([
          { students: '"students" must contain at least 1 items' },
        ]);
        expect(statusCode).toEqual(400);
        done();
      });

      it("should fail if tutor is not an email", async (done) => {
        const { statusCode, body } = await request(app)
          .post("/api/register")
          .send({ tutor: "tutorken", students: ["studentA@gmail.com"] });
        const { message, details } = body;

        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([{ tutor: '"tutor" must be a valid email' }]);
        expect(statusCode).toEqual(400);
        done();
      });

      it("should fail if students are not in email format", async (done) => {
        const { statusCode, body } = await request(app)
          .post("/api/register")
          .send({ tutor: "tutorken@gmail.com", students: ["studentA"] });
        const { message, details } = body;

        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([{ 0: '"students[0]" must be a valid email' }]);
        expect(statusCode).toEqual(400);
        done();
      });
    });

    describe("Valid body", () => {
      it("should pass for new tutor and students", async (done) => {
        const { statusCode } = await request(app)
          .post("/api/register")
          .send({
            tutor: "tutorken@gmail.com",
            students: ["studentA@gmail.com", "studentB@gmail.com"],
          });
        expect(statusCode).toEqual(204);
        done();
      });

      it("should pass for existing tutor and new students", async (done) => {
        const { statusCode } = await request(app)
          .post("/api/register")
          .send({
            tutor: "tutorken@gmail.com",
            students: ["studentC@gmail.com", "studentD@gmail.com"],
          });
        expect(statusCode).toEqual(204);
        done();
      });

      it("should pass for new tutor and old students", async (done) => {
        const { statusCode } = await request(app)
          .post("/api/register")
          .send({
            tutor: "tutorben@gmail.com",
            students: ["studentC@gmail.com", "studentD@gmail.com"],
          });
        expect(statusCode).toEqual(204);
        done();
      });
    });
  });

  describe("GetCommonStudents API", () => {
    describe("Invalid query", () => {
      it("should fail without tutor ", async (done) => {
        const { statusCode, body } = await request(app).get(
          "/api/getcommonsstudents"
        );
        const { message, details } = body;

        expect(statusCode).toEqual(400);
        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([{ tutor: '"tutor" is required' }]);
        done();
      });

      it("should fail if tutor is not an email ", async (done) => {
        const { statusCode, body } = await request(app).get(
          "/api/getcommonsstudents?tutor=tutorben"
        );
        const { message, details } = body;

        expect(statusCode).toEqual(400);
        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([{ tutor: '"tutor" must be a valid email' }]);
        done();
      });
    });

    describe("Valid query", () => {
      it("should pass controller validation and retreive all students of one tutor", async (done) => {
        const { statusCode, body } = await request(app).get(
          "/api/getcommonsstudents?tutor=tutorken%40gmail.com"
        );
        expect(statusCode).toEqual(200);
        expect(Object.values(body).sort()).toEqual(
          [
            "studentA@gmail.com",
            "studentB@gmail.com",
            "studentC@gmail.com",
            "studentD@gmail.com",
          ].sort()
        );
        done();
      });

      it("should pass controller validation and retrieve common students of multiple tutors", async (done) => {
        const { statusCode, body } = await request(app).get(
          "/api/getcommonsstudents?tutor=tutorben%40gmail.com&tutor=tutorken%40gmail.com"
        );

        expect(statusCode).toEqual(200);
        expect(Object.values(body).sort()).toEqual(
          ["studentC@gmail.com", "studentD@gmail.com"].sort()
        );
        done();
      });
    });
  });

  describe("SuspendStudent API", () => {
    describe("Invalid body", () => {
      it("should fail for nonexistent student", async (done) => {
        const { statusCode, body } = await request(app)
          .post("/api/suspend")
          .send({ student: "studentZ@gmail.com" });
        const { message, details } = body;

        expect(statusCode).toEqual(404);
        expect(message).toBe("Resource not found");
        expect(details).toBe("Student does not exist");
        done();
      });
    });

    describe("Valid body", () => {
      it("should pass for existing student", async (done) => {
        const { statusCode } = await request(app)
          .post("/api/suspend")
          .send({ student: "studentA@gmail.com" });

        expect(statusCode).toEqual(204);
        done();
      });
    });
  });

  describe("ReceiveNotifications API", () => {
    describe("Invalid body", () => {
      it("should fail if tutor is empty", async (done) => {
        const { statusCode, body } = await request(app)
          .post("/api/receivenotifications")
          .send({ tutor: "", notification: "" });
        const { message, details } = body;

        expect(statusCode).toBe(400);
        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([
          { tutor: '"tutor" is not allowed to be empty' },
        ]);
        done();
      });

      it("should fail if notification is empty", async (done) => {
        const { statusCode, body } = await request(app)
          .post("/api/receivenotifications")
          .send({ tutor: "tutorken@gmail.com", notification: "" });
        const { message, details } = body;

        expect(statusCode).toBe(400);
        expect(message).toEqual("Validation Failed");
        expect(details).toEqual([
          { notification: '"notification" is not allowed to be empty' },
        ]);
        done();
      });
    });

    describe("Valid body", () => {
      it("should fail if tutor doesnt exist", async (done) => {
        const { statusCode, body } = await request(app)
          .post("/api/receivenotifications")
          .send({ tutor: "tutorzen@gmail.com", notification: "Hello!" });
        const { details, message } = body;

        expect(statusCode).toBe(404);
        expect(message).toBe("Resource not found");
        expect(details).toBe("Tutor does not exist");
        done();
      });

      it("should pass and retrieve students that belongs to the tutor", async (done) => {
        const { statusCode, body } = await request(app)
          .post("/api/receivenotifications")
          .send({ tutor: "tutorben@gmail.com", notification: "Hello!" });

        expect(statusCode).toBe(200);
        expect(Object.values(body).sort()).toEqual(
          ["studentC@gmail.com", "studentD@gmail.com"].sort()
        );
        done();
      });

      it("should pass and retrieve students that belongs to the tutor and mentioned students", async (done) => {
        const { statusCode, body } = await request(app)
          .post("/api/receivenotifications")
          .send({
            tutor: "tutorben@gmail.com",
            notification: "Hello! @studentB@gmail.com",
          });

        expect(statusCode).toBe(200);
        expect(Object.values(body).sort()).toEqual(
          [
            "studentB@gmail.com",
            "studentC@gmail.com",
            "studentD@gmail.com",
          ].sort()
        );
        done();
      });

      it("should pass and retrieve students that are not suspended only", async (done) => {
        const { statusCode, body } = await request(app)
          .post("/api/receivenotifications")
          .send({
            tutor: "tutorken@gmail.com",
            notification: "Hello!",
          });

        expect(statusCode).toBe(200);
        expect(Object.values(body).sort()).toEqual(
          [
            "studentB@gmail.com",
            "studentC@gmail.com",
            "studentD@gmail.com",
          ].sort()
        );
        done();
      });
    });
  });
});
