// import axios from 'axios'


export async function fetchScholarships(filters){
  var url = 'http://localhost:5000/scholarships?major='
  url += filters.major
    const response =
      await fetch(url, {
        method: 'POST',
        headers:
          {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
    return response.json()

}

// export const register = newUser => {
//     return axios
//     .post('user/register', {
//         username: newUser.username,
//         // key: newUser.key,
//         // email: newUser.email,
//         password: newUser.password
//     })
//     .then( res => {
//         console.log(res)
//     })
// }

export async function login(user){
  const response =
      await fetch("http://localhost:3000/adminlogin?", {
        method: 'POST',
        headers: {
             'Authorization': 'username' + user.username + 'password' + user.password
          },
        })
        return response.json();
  }

// export const getProfile = user => {
//   return axios
//     .get('users/profile', {
//       //headers: { Authorization: ` ${this.getToken()}` }
//     })
//     .then(response => {
//       console.log(response)
//       return response.data
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }