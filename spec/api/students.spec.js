const supertest = require("supertest");
const app = require("../../app");
const request = supertest(app);
const {connectToDB}  = require('../../database');


describe("Students tests", () => {

    beforeAll(async ()=>{
        await connectToDB();
    })


    //Should validate inputs and Ids--------------------------------------------------------------
    it("should validate student name", async () => {
        const response = await request.post("/student").send({});
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe(`"studentName" is required`);
    });

    it("Should validate the ID", async () => {
        const response = await request.post("/student").send({
            studentName:"Jonny"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.studentId).toBeDefined();

        const studentId = response.body.studentId;

        const response2 = await request.get(`/student/${studentId+1}`);
        expect(response2.statusCode).toBe(400);
        expect(response2.body.message).toBeDefined;
        expect(response2.body.message).toBe("Student not found. Please enter valid ID");
    });
    
    //POST /student-----------------------------------------------------------------------------------
    it("should create a student", async () => {
        const response = await request.post("/student").send({
            studentName:"Jonny"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.studentId).toBeDefined();
        expect(response.body.studentName).toBe("Jonny");
    });

    //GET /student/:id---------------------------------------------------------------------------------
    it("Should return the student by id", async () => {
        const response = await request.post("/student").send({
            studentName:"Jonny"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.studentId).toBeDefined();

        const studentId = response.body.studentId;

        const response2 = await request.get(`/student/${studentId}`);
        expect(response2.statusCode).toBe(200);
        expect(response2.body.studentId).toBe(studentId);
        expect(response2.body.studentName).toBe("Jonny");
        });

    //POST /student/:id---------------------------------------------------------------------------------
    it("Should update the student by the id", async ()=>{
        const response = await request.post("/student").send({
            studentName:"Jonny"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.studentId).toBeDefined();

        const studentId = response.body.studentId;

        const response2 = await request.post(`/student/${studentId}`).send({
            studentName:"John"
        });
        expect(response2.statusCode).toBe(200);
        
        const response3 = await request.get(`/student/${studentId}`);
        expect(response3.statusCode).toBe(200);
        expect(response3.body.studentId).toBe(studentId);
        expect(response3.body.studentName).toBe("John");
    });

    //DELETE /student/:id--------------------------------------------------------------------------------
    it("Should delete the student by the id", async ()=>{
        const response = await request.post("/student").send({
            studentName: "Jonny"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.studentId).toBeDefined();

        const studentId = response.body.studentId;

        const response2 = await request.delete(`/student/${studentId}`);
        expect(response2.statusCode).toBe(200);
        expect(response2.text).toBe("Student is deleted successfully");

        const response3 = await request.get(`/student/${studentId}`);
        expect(response3.statusCode).toBe(400);
    });

    //GET /student---------------------------------------------------------------------------------------
    it("Should get all the students", async ()=>{
        const response = await request.post("/student").send({
            studentName: "Jonny"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.studentId).toBeDefined();

        const studentId1 = response.body.studentId;

        
        const response2 = await request.post("/student").send({
            studentName: "John"
        });
        expect(response2.statusCode).toBe(200);
        expect(response2.body.studentId).toBeDefined();

        const studentId2 = response2.body.studentId;

        const response3 = await request.get("/student");
        expect(response3.statusCode).toBe(200);
        let g = response3.body.length
        expect(response3.body[g-2].studentName).toBe("Jonny");
        expect(response3.body[g-2].studentId).toBe(studentId1);
        expect(response3.body[g-1].studentName).toBe("John");
        expect(response3.body[g-1].studentId).toBe(studentId2);
    })
})