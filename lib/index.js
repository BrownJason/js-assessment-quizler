'use strict';

var _vorpal = require('vorpal');

var _vorpal2 = _interopRequireDefault(_vorpal);

var _inquirer = require('inquirer');

var _lib = require('./lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cli = (0, _vorpal2.default)();

const askForQuestions = [{
  type: 'input',
  name: 'numQuestions',
  message: 'How many questions do you want in your quiz?',
  validate: input => {
    const pass = input.match(/^[1-9]{1}$|^[1-9]{1}[0-9]{1}$|^100$/);
    return pass ? true : 'Please enter a valid number!';
  }
}, {
  type: 'input',
  name: 'numChoices',
  message: 'How many choices should each question have?',
  validate: input => {
    const pass = input.match(/^(?:[2-4]|0[2-4]|4)$/);
    return pass ? true : 'Please enter a valid number!';
  }
}];
/*
  Do you like my pyramids?

  Was going to make the random one a little bit bigger but I couldn't get it
  to read in properly
*/
// TODO implement createQuiz
const createQuiz = title => {
  (0, _inquirer.prompt)(askForQuestions).then(answer => {
    (0, _inquirer.prompt)((0, _lib.createPrompt)(answer)).then(val => {
      (0, _lib.writeFileSync)(title + '.json', (0, _lib.createQuestions)(val)).then(val => console.log(val), err => console.log(err));
    });
  }).catch(err => console.log('Error creating the quiz', err()));
};

const takeQuiz = (title, output // TODO implement takeQuiz
) => {
  (0, _lib.readFileSync)(title).then(val => {
    (0, _inquirer.prompt)(val).then(answers => {
      (0, _lib.writeFileSync)(output + '.json', answers).then(val => console.log(val), err => console.log(err));
    });
  }).catch(err => console.log(err));
};

const takeRandomQuiz = (quizes, output, n // TODO implement takeRandomQuiz
) => {
  // reads in the files but skips over the first files data
  // and goes straight to the second files data

  quizes.fileNames.forEach(fileName => {
    Promise.all([(0, _lib.readFileSync)(fileName)]).then(answer => {
      const woo = answer.reduce((res, next) => {
        return res;
      });
      const questions = (0, _lib.chooseRandom)(woo, n);
      (0, _inquirer.prompt)(questions).then(val => {
        (0, _lib.writeFileSync)(output + '.json', val).then(val => console.log(val), err => console.log(err));
      });
    });
  });
};

cli.command('create <fileName>', 'Creates a new quiz and saves it to the given fileName').action(function (input, callback) {
  // TODO implement functionality for create command
  return createQuiz(input.fileName);
});

cli.command('take <fileName> <outputFile>', 'Loads a quiz and saves the users answers to the given outputFile').action(function (input, callback) {
  // TODO implement functionality for taking a quiz
  return takeQuiz(input.fileName, input.outputFile);
});

cli.command('random <number> <outputFile> <fileNames...>', 'Loads a quiz or' + ' multiple quizes and selects a random number of questions from each quiz.' + ' Then, saves the users answers to the given outputFile').action(function (input, callback) {
  // TODO implement the functionality for taking a random quiz
  return takeRandomQuiz(input, input.outputFile, input.fileNames);
});

cli.delimiter(cli.chalk['yellow']('quizler>')).show();