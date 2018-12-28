const https = require('https');
const url = 'https://jsonplaceholder.typicode.com/posts';

https.get(url, (response) => {
      let rawData = '';
      response.on('data', (chunk) => { 
        rawData += chunk;
      });
    response.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
        } catch (e) {
            console.error(e.message);
        }
    });
})
.on('error', (error) => {
    console.error(`Got error: ${error.message}`);
});