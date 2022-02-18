const handleResponse = async (response) => {
    console.log(response);
    const resObj = await response.json();
    console.log(resObj);
}

const sendFetchRequest = (url, requestedMethod) => {
    const options = {
        method: requestedMethod
    }
    let fetchPromise = fetch(url, options);

    fetchPromise.then((response) => { handleResponse(response) });
};

const init = () => {
    console.log(':D');
}

window.onload = init;