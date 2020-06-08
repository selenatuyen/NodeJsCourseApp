// functions, objects, properties, & methods
const name = 'Selena';
let age = 24;
const hasHobbie = true;

age = 30; 

const summarizeUser = (userName, userAge, userHasHobby) =>{
    return (
        'Name is' + userName +
        ', age is ' + userAge + 
        ', and user has hobbies: ' + userHasHobby
    );
}

function summarizeUser(userName, userAge, userHasHobby){
    return (
        'Name is ' + userName + 
        ', age is ' + userAge + 
        ', and user has hobbies: ' + userHasHobby
    );
}

console.log(summarizeUser(name, age, hasHobbie));