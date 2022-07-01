
export default (axios) => ({

  getHealth() {

    return axios.get('localhost:8080/actuator/health')
  }
})
