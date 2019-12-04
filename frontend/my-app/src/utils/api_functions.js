export async function getDataFetch(){
    const response =
      await fetch("http://localhost:5000/scholarships",
        { headers: {'Content-Type': 'application/json'}}
      )
    return response.json()
    // console.log(await response.json())
}