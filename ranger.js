const fs = require('fs');
const SOURCE_PATH = './__source/src';


const getDescription = (assignment) => {
  if (assignment.description) {
    return assignment.description;
  }
  return assignment.functionName;
}

const toFunction = (t) => {
  const content =
    `// ${getDescription(t)} 
const ${t.functionName} = function(${t.parameters}) {
  return ${t.returnValue};
};
exports.${t.functionName} = ${t.functionName};
`;
  return { content, fileName: t.fileName };
}

const shuffle = function (list) {
  let index = list.length;
  let randomIndex = 0;
  while (index !== 0) {
    randomIndex = Math.floor(Math.random() * list.length);
    index--;
    [list[index], list[randomIndex]] = [list[randomIndex], list[index]];
  }
  return list;
};

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

assign(shuffle(json.assignments));