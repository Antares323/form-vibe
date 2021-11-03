export const getData = async () => {
    const response = await fetch('db.json',{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    return response.json()
}