const async = require('async');
const fs = require('fs');
const csv = require('fast-csv');

const toTest = require('./main');

const readTestCases = async (filePath) => {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath);
    const testCases = [];
    csv.fromStream(stream).on('data', data => {
      testCases.push(data);
    }).on('end', () => {
      resolve(testCases.slice(1, testCases.length));
    });
  })
}

const exportCSV = async (path, data) => {
  var csvStream = csv.createWriteStream({headers: true}),
    writableStream = fs.createWriteStream(path);

  writableStream.on("finish", function(){
    console.log("DONE!");
  });

  csvStream.pipe(writableStream);
  data.forEach(dat => {
    csvStream.write(dat);
  });
  csvStream.end();
}

const main = async () => {
  const allTestData = await readTestCases('./test_data.csv');
  let result = await allTestData.map(data => toTest.parseStreetNumber(data[0]))
  exportCSV('./result.csv', result)
}

main()