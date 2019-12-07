
export async function fetchScholarships(filters){
  var url = 'http://localhost:5000/scholarships?major='
  url += filters.major
  if(filters.gpa > 0)
  {
    url += "&gpa="
    url += filters.gpa
  }
  if(filters.amount > 0)
  {
    url += "&min_amount="
    url += filters.amount
  }
  if(filters.max_amount != null)
  {
    url += "&max_amount="
    url += filters.max_amount
  }
  if(filters.sex != null)
  {
    url += "&sex="
    url += filters.sex
  }
  if(filters.citizenship != null)
  {
    url += "&citizenship="
    url += filters.citizenship
  }
  if(filters.essay != null)
  {
    url += "&essay="
    url += filters.essay
  }
  if(filters.keywords != null)
  {
    url += "&keywords="
    url += filters.keywords
  }
  console.log(url)
    const response =
        await fetch(url, {
        method: 'POST',
        headers:
            {
            'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    return response.json()

}

export async function reportScholarship(idScholarship) {
    /* Report a specific scholarship.

    Returns:
        json: response from api
    */
    var url = 'http://localhost:5000/scholarship?idScholarship='
    url += idScholarship

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })


    return response.json()
}
// export const register = newUser => {
//
// }

export async function login(user){
    var url="http://localhost:5000/users/login?username=" + user.username + "&password=" + user.password
    const response =
        await fetch(url, {
            headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            method: 'POST', // or 'PUT'
            // body: data  // a FormData will automatically set the 'Content-Type'
        })

    return response.json()

}

// export const getProfile = user => {
//
// }

//-- Scholarship API call ---
export async function submitScholarship(data){
    var post = "http://localhost:5000/scholarship?"
    post += "name=" + data.name
    post += "&url=" + data.url
    post += "&desc=" + data.description
    post += "&amount=" + data.amount

    if (data.deadline != null)
    {
        post += "&deadline=" + data.deadline
    }
    if (data.sex != null)
    {
        post += "&sex=" + data.sex
    }
    if (data.major != null)
    {
        post += "&major=" + data.major
    }
    if (data.citizenship != null)
    {
        post += "&citizenship=" + data.citizenship
    }
    if (data.essay != null)
    {
        post += "&essay=" + data.essay
    }
    if (data.GPA != null)
    {
        post += "&GPA=" + data.GPA
    }
    if (data.ethnicity != null)
    {
        post += "&ethnicity=" + data.ethnicity
    }

    console.log(post)


    const response = await fetch(post, {
      headers:{'Content-Type': 'application/x-www-form-urlencoded'},
      method: 'POST', // or 'PUT'
      // body: data  // a FormData will automatically set the 'Content-Type'
    })
    return response.json();
}
