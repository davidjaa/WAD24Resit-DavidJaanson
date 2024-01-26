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
            <td>{{ request.utcoursename }}</td>
            <td>{{ request.utcoursecode }}</td>
            <td>{{ request.utcourseects }}</td>
            <td>
              <span v-if="!request.decision"><strong>Under Processing</strong></span>
              <span v-else>{{ request.decision }}</span>
            </td>            
          </tr>
        </tbody>

    </table>
    
  </div>
  </div>
</template>



<script>
export default {
  name: "Students",
  data() {
    return {
      rplrequests: [],
    };
  },
  methods: {
    fetchRecords() {
      fetch(`http://localhost:3000/api/rplrequests`)
        .then((response) => response.json())
        .then((data) => (this.rplrequests = data))
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
</style>
