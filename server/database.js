const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "postgres", // Enter your password here
    database: "testWad", //Try to use the same name for your database
    host: "localhost",
    port: "5432"
});


const execute = async(query1, query2, query3) => {
    try {
        await pool.connect(); // gets connection
        await pool.query(query1); // sends queries
        await pool.query(query2); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const createTblQuery1 = `
    CREATE TABLE IF NOT EXISTS "rplrequest" (
	    "id" SERIAL PRIMARY KEY,         
	    "studentcode" VARCHAR(200) NOT NULL,
	    "coursename" VARCHAR(200) NOT NULL,
        "coursecode" VARCHAR(200),
        "courseects" integer NOT NULL,
        "utcoursename" VARCHAR(200) NOT NULL,
        "utcoursecode" VARCHAR(200),
        "utcourseects" integer NOT NULL,
        "decision" VARCHAR(200)
    );`;


const insertDataQuery = `WITH data (studentcode, coursename, coursecode, courseects, utcoursename, utcoursecode, utcourseects, decision) AS 
    (
    VALUES
        ('C1002', 'ESI', 'MTAT.03.229', 6, 'WAD', 'LTAT.05.004', 6, '')
    )
    
    INSERT INTO rplrequest(studentcode, coursename, coursecode, courseects, utcoursename, utcoursecode, utcourseects, decision) 
    SELECT  d.studentcode, d.coursename, d.coursecode, d.courseects, d.utcoursename, d.utcoursecode, d.utcourseects, d.decision
    FROM data d
    WHERE NOT EXISTS (SELECT * FROM rplrequest WHERE id = 1);`


// A function to execute the previous query   
execute(createTblQuery1, insertDataQuery).then(result => {
    if (result) {
        console.log('If do not exists, table "rplrequest" and  table "utcourses" are created');
    }
});

module.exports = pool;