const createTemplate = require('./templates/createTemplate');

const layer = process.argv[2];
const sliceName = process.argv[3];

// после ввода команды "node ./scripts/createSlice/index.js firstArg secondArg thirdArg someArg"
// строка process.argv.forEach((val, i) => console.log(val, i)); если её раскоментировать могла бы вывести следующие логи
// /home/stanislav/.nvm/versions/node/v20.18.0/bin/node 0
// /home/stanislav/Рабочий стол/Обучение Frontend/projects/bigProjectReact/scripts/createSlice/index.js 1
// firstArg 2
// secondArg 3
// thirdArg 4
// someArg 5

// process.argv.forEach((val, i) => console.log(val, i));

const layers = ['features', 'entities', 'pages'];

if (!layer || !layers.includes(layer)) {
    throw new Error(`Укажите слой ${layers.join(' или ')}`);
}

if (!sliceName) {
    throw new Error('Укажите название слайса');
}

createTemplate(layer, sliceName);
