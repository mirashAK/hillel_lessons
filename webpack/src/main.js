import "./styles/style.css";
import "./styles/style.less";

const buttonView = require('./views/button.js');
const contactsView = require('./views/contactsList.js');

const list = document.getElementById('list');

const contactsList = [
    {name: 'AAA'},
    {name: 'BBB'}
];

const addNewContact = function() {
    contactsList.push( {name: 'CCC'})
    list.innerHTML = contactsView({contacts: contactsList});
}

const renderContactsList = function(contacts) {
    list.innerHTML = contactsView({contacts: contacts});
}

function sendReq1 () {
    const request1 = new Promise (function(resolve, reject){
        const Xrequest = new XMLHttpRequest();
        Xrequest.onload = ()=>{
            if (Xrequest.status == 200) {
                resolve(JSON.parse(Xrequest.responseText));
            } else {
                reject(Xrequest.statusText);
            }
        };
        Xrequest.open("get", "http://localhost:3001/contacts", true);
        Xrequest.send();
    });
    return request1;
}

async function sendReq2 () {
    try {
        const response = await fetch('http://localhost:3001/profile')
        const request2 = await response.json();
        return request2;
        // or:  return response.json();
    } catch(e) {
       return e; 
    }
}

const init = async function() {
    document.getElementById('buttons').innerHTML = buttonView({id: "addContact", text: "newButton"});
    
    const addButton = document.getElementById('addContact');
    addButton.addEventListener('click', addNewContact);
    
    try {
    
        const contacts = await sendReq1();
        
        const profile = await sendReq2();
        
        contacts.forEach((contact)=>{
            contact.profile = profile.name;
        });
        
        renderContactsList(contacts);
    
    } catch(e) {
        console.error(`e: `, e);
    }

    
//     sendReq1().then((contacts)=>{
//         sendReq2().then((profile)=>{
//             contacts.forEach((contact)=>{
//                 contact.profile = profile.name;
//             })
//             renderContactsList(contacts);
//         })
//         .catch(e=>e);//=>{return e;}
//     })
//     .catch(e=>e);//=>{return e;}
    
}

document.addEventListener('DOMContentLoaded', init);
