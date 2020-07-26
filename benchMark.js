const { readFileSync } = require('fs');
const fetch = require('node-fetch');

const requestForProcessing = function (url) {
  return new Promise((resolve, reject) => {
    fetch(url, { method: 'POST' })
      .then(res => res.json())
      .then(({ id }) => {
        resolve(id);
      })
      .catch();
  });
};

const main = function () {
  const urlChunks = readFileSync('./run.sh', 'utf8');
  const urls = urlChunks.split('\n').map(chunk => chunk.split(' ')[3]);
  const jobPromises = urls.map(requestForProcessing);
  const jobIds = [];
  jobPromises.forEach(pro => {
    pro.then(id => {
      console.log(id);
      jobIds.push(id);
    });
  });
  console.log(jobIds);
};

main();
