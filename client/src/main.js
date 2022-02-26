const flowerTypes = ['rose', 'cherry'];

let chosenFlowers = [0, 0, 0];
let selectedFlower = 1;

const setFlowers = () => {
    document.querySelector('#flower1-img').src = `/${flowerTypes[chosenFlowers[0]]}1.png`;
    document.querySelector('#flower2-img').src = `/${flowerTypes[chosenFlowers[1]]}2.png`;
    document.querySelector('#flower3-img').src = `/${flowerTypes[chosenFlowers[2]]}3.png`;
}

// Selects which flower in the bouquet is editing (does NOT select a type of flower)
const selectFlower = (num) => {
    selectedFlower = num;
    document.querySelector('#selection').innerHTML = num;
}

const handleResponse = async (response) => {
    console.log(response);
    const resObj = await response.json();
    console.log(resObj);
    if(resObj.bouquet) {
        chosenFlowers = resObj.bouquet.split(',').map((num) => { return parseInt(num, 10) });
        setFlowers();
        document.querySelector('#message').innerHTML = 'Bouquet Found';
    }
    if(resObj.message) {
        document.querySelector('#message').innerHTML = resObj.message;
    }
}

const sendPost = async () => {
    const nameBox = document.querySelector('#name');
    const data = `name=${nameBox.value}&bouquet=${chosenFlowers}`;
    console.log(nameBox.value);

    let response = await fetch('/addBouquet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: data,
    });

    handleResponse(response, 'POST');
  };

const sendFetchRequest = (url, requestedMethod) => {
    const options = {
        method: requestedMethod
    }
    let fetchPromise = fetch(url, options);

    fetchPromise.then((response) => { handleResponse(response) });
};

const init = () => {
    
    // set and display default bouquet
    setFlowers();
    document.querySelector('#base-img').src = '/vase-base.png';

    // save new bouquet 
    const saveBtn = document.querySelector('#save');
    saveBtn.onclick = sendPost;

    // search for old bouquet
    const searchBtn = document.querySelector('#search');
    const searchText = document.querySelector('#oldName');
    searchBtn.onclick = () => { sendFetchRequest(`/getBouquet?name=${searchText.value}`, 'GET') };

    const flower1Btn = document.querySelector('#flower1-box');
    const flower2Btn = document.querySelector('#flower2-box');
    const flower3Btn = document.querySelector('#flower3-box');
    flower1Btn.onclick = () => { selectFlower(1) };
    flower2Btn.onclick = () => { selectFlower(2) };
    flower3Btn.onclick = () => { selectFlower(3) };

    const roseBtn = document.querySelector('#rose');
    const cherryBtn = document.querySelector('#cherry');
    roseBtn.onclick = () => { chosenFlowers[selectedFlower-1] = 0; setFlowers(); };
    cherryBtn.onclick = () => { chosenFlowers[selectedFlower-1] = 1; setFlowers(); };
    
}

window.onload = init;