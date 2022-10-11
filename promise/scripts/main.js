'use strict'

function sendRequest(url) {
    return new Promise(function(resolve, reject){
        const xhr  = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType='json';
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    const resp = xhr.response;
                    resolve(resp);
                } else {
                    reject(xhr.status);
                }
            }
        }
        xhr.send();
    })
}

function sendRequestCommet(id) {
    return new Promise(function(resolve, reject){
        const xhr  = new XMLHttpRequest();
        xhr.open('get', 'https://jsonplaceholder.typicode.com/posts/'+id+'/comments', true);
        xhr.responseType='json';
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    const resp = xhr.response;
                    resolve(resp);
                } else {
                    reject(xhr.status);
                }
            }
        }
        xhr.send();
    })
}

function sendFetchPromiseCommet(id) {
    return fetch('https://jsonplaceholder.typicode.com/posts/'+id+'/comments')
    .then((response)=>{
        return response.json()
        .then(respJson=>{
            console.log(`respJson: Done`);
            return respJson[0];
        });
    })
    .catch(err=>err);
}

async function sendFetchAsyncCommet(id) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/'+id+'/comments');
    const resp = await response.json();
    return resp[0];
}

async function callback(resp) {
    console.log(`resp: `, resp);
}

const init = async function(){

    console.log(`A: `, );

    setTimeout(function(){
        console.log(`B: `, );
    }, 0);
    
    try {
        const resp = await sendRequest('https://jsonplaceholder.typicode.com/posts');
        console.log(`resp: `, resp[6]);
        const comments6 = await sendRequestCommet(resp[6].id);
        console.log(`resp[6] comments: `, comments6);
        const comments3 = await sendFetchPromiseCommet(resp[3].id);
        console.log(`resp[3] comments: `, comments3);
        sendFetchAsyncCommet(resp[7].id)
        .then(comments7 =>{
            console.log(`resp[7] comments: `, comments7);
        })
        
    } catch(err) {
        console.log(`resp err: `, err);
    }

    console.log(`C: `, );








}

if (document.readyState === 'loading') {  // Загрузка ещё не закончилась
  document.addEventListener('DOMContentLoaded', init);
} else {  // `DOMContentLoaded` Уже сработал
  init();
}
