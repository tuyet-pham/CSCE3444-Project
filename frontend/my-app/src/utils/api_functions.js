export async function approveScholarships(id_list) {
    var url = "http://localhost:5000/admin-table";
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({idList: id_list})
    });

    return response.json()
}


export async function fetchScholarships(filters){
    /**
     * Fetch scholarships based on filters
     */
    var url = 'http://localhost:5000/scholarships?major='
    url += filters.major
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

export async function fetchAdminTable() {
    var url = 'http://localhost:5000/admin-table'
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response.json()
}

