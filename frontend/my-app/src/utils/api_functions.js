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
  console.log(url)
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