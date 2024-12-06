async function apiCall(root, method, data){
    // const HOST_API = "https://academic-events-api-83ac51d23457.herokuapp.com"
    // Host temporária
    const HOST_API = "http://127.0.0.1:8080"

    const requestInfo = {
        method: `${method}`,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    
    return Promise.resolve(
        fetch(`${HOST_API}${root}`, requestInfo)
        .then(response => response.json())
        .then(data => {
            return data;
        }).catch(error => {
            return error;
        })
    );
}

export { apiCall };