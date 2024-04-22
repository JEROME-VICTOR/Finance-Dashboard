const { faker } = require('@faker-js/faker');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());

function generateUniqueCompanies(count) {
    const companies = new Set(); // Set to store unique company names
    while (companies.size < count) {
      companies.add(faker.company.name()); // Add unique company names
    }
    return Array.from(companies); // Convert Set back to an array
}

function generateCompanyStockData(count) {
    const data = [];
    const openingPrice = faker.finance.amount({min:100, max:1000, dec:2}); // Opening price for the company
    for (let i = 0; i < count; i++) {
      data.push({
        open: openingPrice,
        high: faker.finance.amount({min:0, max:1000, dec:2}), // Random high within range (considering open)
        low: faker.finance.amount({min:0, max:1000, dec:2}), // Random low within range (considering open)
        close: faker.finance.amount({min:0, max:1000, dec:2}), // Closing price
        volume: faker.finance.amount({min:10000, max:1000000}), // Trading volume
        date: faker.date.recent({days:10, refDate: '2020-01-01T00:00:00.000Z'}), // Yesterday's date in YYYY-MM-DD format
      });
    }
    return data;
}

function generateRandomPercentage(min = 0, max = 100, decimals = 2) {
  const randomValue = Math.random() * (max - min) + min; // Generate random value within range
  return (Math.round(randomValue * Math.pow(10, decimals)) / Math.pow(10, decimals)).toFixed(decimals) + '%'; 
}

function generateAssetData(count){
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      cash: generateRandomPercentage(5, 15, 1),
      bonds: generateRandomPercentage(5, 15, 1), 
      International: generateRandomPercentage(5, 15, 1),
      domestic: generateRandomPercentage(5, 15, 1),
    });
  }
  return data;
}

function generateMockData(companyCount, stockDataPerCompany) {
  const companyNames = generateUniqueCompanies(companyCount);
  const data = [];
  for (let i = 0; i < companyCount; i++) {
    const company = {
      name: companyNames[i],
      stockData: generateCompanyStockData(stockDataPerCompany),
      assetsData : generateAssetData(companyCount)
    };
    data.push(company);
  }
  return data;
}

function generateMockData(companyCount, stockDataPerCompany) {
    const companyNames = generateUniqueCompanies(companyCount);
    const assetCount = 1;
    const data = [];
    for (let i = 0; i < companyCount; i++) {
      const company = {
        name: companyNames[i],
        stockData: generateCompanyStockData(stockDataPerCompany),
        assetsData : generateAssetData(assetCount)
      };
      data.push(company);
    }
    return data;
}

// API endpoint to serve mock data
app.get('/api/data/:count', (req, res) => {
  const { count } = req.params;
  const companyCount = 5;
  const dataCount = parseInt(count, 10) || 10; // Default to 10 data points if no count provided
  const mockData = generateMockData(companyCount, dataCount);
  res.json(mockData);
});

app.listen(port, () => console.log(`Server listening on port ${port}`));