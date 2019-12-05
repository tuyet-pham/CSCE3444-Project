export async function getDataFetch(filters){
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