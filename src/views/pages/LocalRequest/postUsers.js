export const getData = async (data) => {
    setLoading(true)
    fetch('db.json',{
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    })
    .then(response => {
        return response.json();
    })
    .then(myJson => {
        setUsers(myJson.usersData)
    });
    setLoading(false)
}