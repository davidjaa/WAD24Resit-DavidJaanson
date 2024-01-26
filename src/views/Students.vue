<template>
<div>
<h3>RPL request</h3>

<div class="container">
    <table>
      <thead>
          <tr>
            <th>St. Code</th>
            <th>Course name</th>
            <th>UT Course code</th>
            <th>Course ECTS</th>
            <th>UT Course code</th>
            <th>UT Course name</th>
            <th>UT Course ECTS</th>
            <th>Decision</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="request in rplrequests" :key="request.id">
            <td>{{ request.studentcode }}</td>
            <td>{{ request.coursename }}</td>
            <td>{{ request.coursecode }}</td>
            <td>{{ request.courseects }}</td>
            <td>{{ request.utcoursecode }}</td>
            <td>{{ request.utcoursename }}</td>
            <td>{{ request.utcourseects }}</td>
            <td>
              <span v-if="!request.decision"><strong>Under Processing</strong></span>
              <span v-else>{{ request.decision }}</span>
            </td>            
          </tr>
        </tbody>

    </table>
    
  </div>

  <h3>Submit an RPL request</h3>

  <div class="form-container">
      <form @submit.prevent="submitRPLRequest" class="rpl-form">

        <div class="form-group">
        <label for="studentcode">Student Code:</label>
        <input type="text" v-model="newRequest.studentcode" required>
        </div>

        <div class="form-group">
        <label for="coursename">Course Name:</label>
        <input type="text" v-model="newRequest.coursename" required>
        </div>

        <div class="form-group">
        <label for="coursecode">Course Code:</label>
        <input type="text" v-model="newRequest.coursecode" required>
        </div>

        
        <div class="form-group">
        <label for="courseects">Course ECTS:</label>
        <input type="number" v-model="newRequest.courseects" required>
        </div>

        
        <div class="form-group">
        <label for="utcoursecode">UT Course Code:</label>
        <input type="text" v-model="newRequest.utcoursecode" required>
        </div>

        <div class="form-group">
        <label for="utcoursename">UT Course Name:</label>
        <input type="text" v-model="newRequest.utcoursename" required>
        </div>

        <div class="form-group">
        <label for="utcourseects">UT Course ECTS:</label>
        <input type="number" v-model="newRequest.utcourseects" required>
        </div>

        <button type="submit" class="submit-button">Submit RPL Request</button>
      </form>
    </div>
  </div>
</template>



<script>
export default {
  name: "Students",
  data() {
    return {
      rplrequests: [],
      newRequest: {
        studentcode: "",
        coursename: "",
        coursecode: "",
        courseects: "", 
        utcoursecode: "",
        utcoursename: "",
        utcourseects: "",
      }
    };
  },
  methods: {
    fetchRecords() {
      fetch(`http://localhost:3000/api/rplrequests`)
        .then((response) => response.json())
        .then((data) => (this.rplrequests = data))
        .catch((err) => console.log(err.message));
  },
  submitRPLRequest() {
      fetch("http://localhost:3000/api/rplrequests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.newRequest),
      })
        .then((response) => response.json())
        .then((data) => {
          this.fetchRecords();
          this.newRequest = {
            studentcode: "",
            coursename: "",
            coursecode: "",
            courseects: null, 
            utcoursecode: "",
            utcoursename: "",
            utcourseects: null,
            decision: "",
          };
        })
        .catch((err) => console.log(err.message));
    },
  },
  mounted() {
    this.fetchRecords();
    console.log("mounted");
  } 
};
</script>

<style scoped>
h3 {
  text-align: center;
  color: rgb(8, 110, 110);
}

.container {
  background: #d5d7d8;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  padding: 10px 20px;
  margin: auto;
  width: 90%;
  display: flex;
  justify-content: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

th, td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

td {
  background-color: bisque;
}

th {
  background-color: #4CAF50;
  color: white;
}

.form-container {
  margin-bottom: 20px;
  background-color: #dddddd;
}

.rpl-form {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  padding: 8px;
  background-color: #4caf50;
  color: white;
}

input {
  padding: 8px;
}

.submit-button {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  cursor: pointer;
}
</style>
