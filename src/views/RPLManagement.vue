<template>
  <div>
  <h1>RPL Management Pannel</h1>
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
            <td>
              <button @click="makeDecision(request.id)">Decision</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
export default {
  name: "RPLManagement",
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
    async makeDecision(requestId) {
      try {        const response = await fetch(`http://localhost:3000/api/rplrequests/${requestId}/makedecision`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            decision: 'Approved',
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to make a decision for request with ID ${requestId}`);
        }

        const updatedRequest = await response.json();

        const index = this.rplrequests.findIndex(request => request.id === requestId);
        if (index !== -1) {
          this.$set(this.rplrequests, index, updatedRequest);
        }

        console.log(`Decision made for request with ID: ${requestId}`);
      } catch (error) {
        console.error(error.message);
      }
    },
  },
  mounted() {
    this.fetchRecords();
    console.log("mounted");
  } 
};
</script>


<style scoped>
h1 {
  font-size: 20px;
}

.container {
  background: #d5d7d8;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  margin-top: 30px;
  padding: 10px 20px;
  margin: auto;
  width: 80%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

th,
td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

td {
  background-color: bisque;
}

th {
  background-color: #4caf50;
  color: white;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 8px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}
</style>