const http = require('http');
const url = 'http://nodeprogram.com';

http.get(url, (response) => {
      let rawData = '';
      response.on('data', (chunk) => { 
      rawData += chunk;
    //  console.log(chunk.toString('utf8'));
    });
    response.on('end', () => {
        console.log(rawData);
    });
}).on('error', (error) => {
    console.error(`Got error: ${error.message}`);
  });