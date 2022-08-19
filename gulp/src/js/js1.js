const button = document.getElementById('send_request');

const requestPromise = function (url) {
    return new Promise (function(resolve, reject){
        const Xrequest = new XMLHttpRequest();
        Xrequest.onload = ()=>{
            if (Xrequest.status == 200) {
                resolve(JSON.parse(Xrequest.responseText));
            } else {
                reject(Xrequest.statusText);
            }
        }
        Xrequest.open("get", url, true);
        Xrequest.send();
    })
}

const requestPOST = function (url, params) {
    const {id, postId, body} = params;
    return new Promise (function(resolve, reject){
        const Xrequest = new XMLHttpRequest();
        Xrequest.onload = ()=>{
            if (Xrequest.status == 200) {
                resolve(JSON.parse(Xrequest.responseText));
            } else {
                reject(Xrequest.statusText);
            }
        }
        Xrequest.open("POST", url, true);
        Xrequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        Xrequest.send(`id=${id}&postId=${postId}&body=${body}`);
    })
}

const buttonClick = async function (ev) {
    console.log(`buttonClick: `, );
    
//     requestPromise("http://localhost:3001/contacts")
//    .then((response)=>{
//         console.log(`response: `, response);
//     })
//     .catch((err)=>err);
    
    try {
        const response1 = await requestPromise("http://localhost:3001/contacts");
        console.log(`response1: `, response1);
    } catch (err) {
        console.error(`err: `, err);
    }
    
//     fetch("http://localhost:3001/comments")
//     .then((response)=>{
//         return response.json();
//     })
//     .then((jsonData)=>{
//         console.log(`jsonData: `, jsonData);
//     })
//     .catch((err)=>err);
    
    let response2 
    try {
        response2 = await fetch("http://localhost:3001/comments");
    } catch (err) {
        console.error(`err: `, err);
    }
    
   const jsonData = await response2.json();
   console.log(`jsonData: `, jsonData);
   
   requestPOST("http://localhost:3001/comments", {id:3, postId:1, body:'new comment 111'})
   .then((resp)=>{})
   .catch((err)=>err);
   
}

button.addEventListener('click', buttonClick);
