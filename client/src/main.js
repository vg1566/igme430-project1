const flowerTypes = ['rose', 'cherry', 'calla'];

let chosenFlowers = [0, 0, 0];
let selectedFlower = 1;

const imgHeight = 512;
const imgWidth = 512;

// Updates visible bouquet with currently selected flowers
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

// Downloads current bouquet
const exportImg = () => {
    // make new canvas
    const canvas = document.createElement('canvas');
    canvas.height = imgHeight;
    canvas.width = imgWidth;
    const ctx = canvas.getContext('2d');

    // draw images to canvas
    const img = document.createElement('img');
    img.src = '/vase-base.png';
    ctx.drawImage(img, 0, 0);
    img.src = `/${flowerTypes[chosenFlowers[0]]}1.png`;
    ctx.drawImage(img, 0, 0);
    img.src = `/${flowerTypes[chosenFlowers[1]]}2.png`;
    ctx.drawImage(img, 0, 0);
    img.src = `/${flowerTypes[chosenFlowers[2]]}3.png`;
    ctx.drawImage(img, 0, 0);
    
    // download image
    const newExport = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = newExport;
    link.download = 'bouquet';
    link.click();
}

const handleResponse = async (response) => {
    console.log(response);
    if(response.status === 204) {
        document.querySelector('#message').innerHTML = 'Updated Successfully.';
    }
    else {
        const resObj = await response.json();
        console.log(resObj);
        if(resObj.bouquet) {
            chosenFlowers = resObj.bouquet.split(',').map((num) => { return parseInt(num, 10) });
            setFlowers();
            document.querySelector('#message').innerHTML = 'Bouquet Found!';
        }
        if(resObj.message) {
            document.querySelector('#message').innerHTML = resObj.message;
        }
    }
}

const sendPost = async () => {
    const nameBox = document.querySelector('#name');
    const data = `name=${nameBox.value.toLowerCase()}&bouquet=${chosenFlowers}`;

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
        method: requestedMethod,
        'Accept': 'application/json',
    }
    let fetchPromise = fetch(url, options);

    fetchPromise.then((response) => { handleResponse(response) });
};

// If enter key was pressed, use the callback function
const checkKey = (e, callback, callbackVar) => {
    if(e.keyCode === 13) {
        callback(callbackVar);
    }
}

const sendGetBouquetRequest = (data) => {
    sendFetchRequest(`/getBouquet?name=${data}`, 'GET');
}

const init = () => {
    // set and display default bouquet
    setFlowers();
    document.querySelector('#base-img').src = '/vase-base.png';

    // link export button
    const exportBtn = document.querySelector('#export');
    exportBtn.onclick = exportImg;

    // save new bouquet 
    const saveBtn = document.querySelector('#save');
    const nameBox = document.querySelector('#name');
    saveBtn.onclick = sendPost;
    nameBox.onkeyup = (e) => { checkKey(e, sendPost) };

    // search for old bouquet
    const searchBtn = document.querySelector('#search');
    const searchText = document.querySelector('#oldName');
    searchBtn.onclick = () => { sendGetBouquetRequest(searchText.value.toLowerCase()) };
    searchText.onkeyup = (e) => { checkKey(e, sendGetBouquetRequest, searchText.value.toLowerCase()) };

    // link flower selectors
    const flower1Btn = document.querySelector('#flower1-box');
    const flower2Btn = document.querySelector('#flower2-box');
    const flower3Btn = document.querySelector('#flower3-box');
    flower1Btn.onclick = () => { selectFlower(1) };
    flower2Btn.onclick = () => { selectFlower(2) };
    flower3Btn.onclick = () => { selectFlower(3) };

    // link flower type selectors
    const roseBtn = document.querySelector('#rose');
    const cherryBtn = document.querySelector('#cherry');
    const callaBtn = document.querySelector('#calla');
    roseBtn.onclick = () => { chosenFlowers[selectedFlower-1] = 0; setFlowers(); };
    cherryBtn.onclick = () => { chosenFlowers[selectedFlower-1] = 1; setFlowers(); };
    callaBtn.onclick = () => { chosenFlowers[selectedFlower-1] = 2; setFlowers(); };
}

window.onload = init;