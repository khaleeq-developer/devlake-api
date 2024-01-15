const axios = require('axios');
  
// target options object
const foundOptions = [];
  
// function to traverse the json recursively
function traverse(obj) {
if (Array.isArray(obj)) {
    // If it's an array, recursively call the function for each item
    obj.forEach((item) => traverse(item));
} else if (typeof obj === 'object') {
        // If it's an object, check if it has "options" with "name" and "repoId" keys
        if (
        obj.hasOwnProperty('options') &&
        obj.options.hasOwnProperty('name') &&
        obj.options.hasOwnProperty('repoId')
        ) {
            // Add the found "options" object to the array
            foundOptions.push(obj.options);
            console.log('foundOptions: ', foundOptions);
            return;
        }

        Object.values(obj).forEach((value) => traverse(value));
    }
}  

axios.get('http://54.236.25.78:4000/api/blueprints/3')
  .then(response => {
    console.log('blueprints data: ', response.data); // Access the response data
    if (response.data && response.data.plan) {
        traverse([...response.data.plan]);
        if (foundOptions && foundOptions.length) {
          
        }
    }
  })
  .catch(error => {
    console.error(error); // Handle any errors
  });
