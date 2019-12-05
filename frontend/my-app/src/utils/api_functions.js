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
