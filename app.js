const axios = require('axios');
  
// target options object
const foundOptions = [];

const owner = 'khaleeq-developer';
const repo = 'devlake-api';
const token = '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';

  
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
            return;
        }

        Object.values(obj).forEach((value) => traverse(value));
    }
}  


const createIssue = async (issueData) => {
  try {
    const response = await axios.post(`https://api.github.com/repos/${owner}/${repo}/issues`, issueData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      console.log('Issue created successfully.');
    } else {
      console.error('Failed to create issue.');
    }
  } catch (error) {
    console.error('Error creating issue:', error);
  }
};

axios.get('http://54.236.25.78:4000/api/blueprints/3')
  .then(response => {
    if (response.data && response.data.plan) {
        traverse([...response.data.plan]);
        if (foundOptions && foundOptions.length) {
          foundOptions.forEach(item => {
            const issueData = {
              title: `${item.name} (${item.repoId})`,
              body: item.url,
              labels: ['Feature'], // Add more labels if needed
            };
            createIssue(issueData);
          })
        }
    }
  })
  .catch(error => {
    console.error(error); // Handle any errors
  });
