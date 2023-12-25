var url = "https://cleaner.dadata.ru/api/v1/clean/address";
var token = "7cd46530898b1993c7cdc73d22d9f32ef573a4e8";
var secret = "d62bcd299282bd41c5056eb88cf1908951556469";
var query = "мск сухонска 11/-89";

var options = {
    method: "POST",
    //mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + token,
        "X-Secret": secret
    },
    body: JSON.stringify([query])
}

fetch(url, options)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log("error", error));