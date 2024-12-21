const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Đọc tất cả các file trong thư mục models, trừ file index.js
const loadModels = () => {
  fs.readdirSync(__dirname)
    .filter((file) => file.endsWith('.js') && file !== 'index.js')
    .forEach((file) => {
      const model = require(path.join(__dirname, file)); // Import model
    });
};

module.exports = { loadModels };
