export async function getDataFetch(filters){
  let url = 'http://localhost:5000/scholarships?major=' + filters.major
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