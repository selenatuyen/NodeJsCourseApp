// Arrays, Objects, Reference Types, Spread & Rest operators, Destructuring
const person = {
    name: 'Selena',
    age: 24,
    greet() {
        console.log('Hi, I am ' + this.name)
    }
};

//spread operator to copy person
const copiedPersion = {...person};

//destructure syntax
const printName = ({ name, age }) =>{
    console.log(name);
}

printName(person);

// object destructuring
const { name, age} = person;
console.log(name, age);

const hobbies = ['bouldering', 'painting', 'video games'];

// array destructuring
const [hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2);
// for (let hobby of hobbies){
//     console.log(hobby);
// }

// console.log(hobbies.map(hobby => {
//     return 'Hobby: ' + hobby;
// }));

//copy array
const copiedArray = hobbies.splice();

//spread operator to copy array
const copyArray = [...hobies];

//rest oerator to merge elements
const toArray = (...args) =>{
    return args;
}

console.log(toArray(1, 2, 3, 4));