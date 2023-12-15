<template>
  <div>
  <h1>RPL Management Pannel</h1>
  <div class="container">
    <table>
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
</style>