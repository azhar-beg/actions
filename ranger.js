const fs = require('fs');
const json = require('./assignments.json');

const SOURCE_PATH = './__source/src';


const toFunction = (name) => {
  return `const ${name} = function () {
  return true;
};

exports.${name} = ${name};
  `;
}

const writeFile = function (name, code) {
  const fileName = `${SOURCE_PATH}/${name}.js`;
  if (!fs.existsSync(fileName)) {
    fs.writeFileSync(fileName, code);
    console.log(`Created ${fileName}`);
  }
};

const getNextAssignment = function (assignments) {
  const existingAssignments = fs.readdirSync(`${SOURCE_PATH}/`)
    .filter(file => file.includes('.js'))
    .map(file => file.replace('.js', ''));
  const nextAssignment = assignments.find(assignment => {
    return !existingAssignments.includes(assignment);
  });
  return nextAssignment;
};

const assign = function (assignments) {
  const assignment = getNextAssignment(assignments);
  if (!assignment) {
    return;
  }
  const code = toFunction(assignment);
  writeFile(assignment, code);
};

assign(json.assignments);
