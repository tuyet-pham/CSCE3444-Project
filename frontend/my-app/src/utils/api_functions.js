
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
//     
// }

export async function login(user){
  const response =
      await fetch("http://localhost:5000/", {
        method: 'GET',
        headers: {
             'Authorization': 'username' + user.username + 'password' + user.password
          },
        })
        return response.json();
}

// export const getProfile = user => {
//   
// }


async function obSubmitScholarship(data){
    const post = "http://localhost:5000/scholarships?"
    
    const response = await fetch(post, {
      headers:{'Content-Type': 'application/x-www-form-urlencoded'},
      method: 'POST', // or 'PUT'
      body: data  // a FormData will automatically set the 'Content-Type'
    })
    return response.json();
}