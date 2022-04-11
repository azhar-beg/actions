const fs = require('fs');
const SOURCE_PATH = './__source/src';

const toFunction = (t) => {
  const content =
    `const ${t.functionName} = function(${t.parameters}) {
  return ${t.returnValue};
};
exports.${t.functionName} = ${t.functionName};
`;
  return { content, fileName: t.fileName };
}

const getNextAssignment = (assignments, srcFiles) => {
  const existingAssignments = srcFiles.filter(f => f.includes('.js'));
  const nextAssignment = assignments.find(assignment => {
    return !existingAssignments.includes(assignment.fileName);
  });
  return nextAssignment;
}

const writeFile = function (f) {
  const fileName = `${SOURCE_PATH}/${f.fileName}`;
  if (!fs.existsSync(fileName)) {
    fs.writeFileSync(fileName, f.content);
    console.log(`Created ${fileName}`);
  }
};
const assign = function (assignments) {
  const srcFiles = fs.readdirSync(`${SOURCE_PATH}/`);
  const assignment = getNextAssignment(assignments, srcFiles);
  if (!assignment) {
    return;
  }
  writeFile(toFunction(assignment));
};

const args = process.argv.slice(2);
const json = args.length ? require(args[0]) : { assignments: [] };

assign(json.assignments);