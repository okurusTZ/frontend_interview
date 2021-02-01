// const person = {
//   name: 'xinyi',
//   gender: 'female'
// }

// const personb = {...person};
// const personc = Object.assign({}, person);
// const persond = JSON.parse(JSON.stringify(person));

// person.name = 'anyone';

// console.log(person, personb, personc, persond);


const person = {
  info: {
    name: 'xinyi',
    gender: 'female'
  }
}

const personb = {...person};
const personc = Object.assign({}, person);
const persond = JSON.parse(JSON.stringify(person));

person.info.name = 'anyone';

console.log(person, personb, personc, persond);
