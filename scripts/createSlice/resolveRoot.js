const path = require('path');

// выходим на верхний уровень нашего проекта (в корень проекта)
module.exports = (...segments) => path.resolve(__dirname, '..', '..', ...segments);
