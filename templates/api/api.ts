import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as inquirer from 'inquirer';
import * as pluralize from 'pluralize';
import * as capitalize from 'capitalize';
(async () => {
  const cwd = process.cwd();
  const answers = await inquirer.prompt<any>([
    {
      type: 'input',
      name: 'model',
      default: 'sample',
      message: 'Model',
    },
    {
      type: 'input',
      name: 'endpoint',
      default: (answers: any) => `/${pluralize(answers.model)}`,
      message: 'Endpoint',
    },
    {
      type: 'input',
      name: 'path',
      default: (answers: any) => `${cwd}/src/api/${answers.model}`,
      message: 'Path',
      validate: input => {
        if (fs.existsSync(input)) {
          return console.log(`API Path ${input} already exits`);
        }
        return true;
      },
    },
  ]);

  const model = answers.model;
  const modelCapitalized = capitalize(model);
  const endpoint = answers.endpoint;
  const path = answers.path;

  try {
    // mkdir
    await fse.mkdirp(path);

    // readfiles

    const ctrlsFiles = [
      ['ctrls/index.ts'],
      ['ctrls/create.ts', [[/Student/g, modelCapitalized], [/student/g, model]]],
      ['ctrls/find.ts', [[/Student/g, modelCapitalized], [/student/g, model]]],
      ['ctrls/delete.ts', [[/Student/g, modelCapitalized], [/student/g, model]]],
      ['ctrls/update.ts', [[/Student/g, modelCapitalized], [/student/g, model]]],
      ['ctrls/patch.ts', [[/Student/g, modelCapitalized], [/student/g, model]]],
    ];
    const errorFiles = [
      ['errors/index.ts', [[/Student/g, modelCapitalized], [/student/g, model]]],
      ['errors/student.error.ts', [[/Student/g, modelCapitalized], [/student/g, model]], `errors/${model}.error.ts`],
    ];
    const modelFiles = [
      ['models/index.ts'],
      ['models/interface.ts', [[/Student/g, modelCapitalized], [/student/g, model]]],
      ['models/model.ts', [[/Student/g, modelCapitalized], [/student/g, model]]],
      ['models/schema.ts', [[/Student/g, modelCapitalized], [/student/g, model]]],
    ];

    const validatorsFiles = [
      ['validators/index.ts'],
      ['validators/definition.ts', [[/Student/g, modelCapitalized], [/student/g, model]]],
      ['validators/validate.ts', [[/Student/g, modelCapitalized], [/student/g, model]]],
    ];


    const indexFile = ['index.ts'];
    const routerFile = ['router.ts', [[/\/students/g, endpoint]]];

    // prepare options


    // render template and output files
    const files: any[][] = [
      ...ctrlsFiles,
      ...errorFiles,
      ...modelFiles,
      ...validatorsFiles,
      routerFile,
      indexFile,
    ];

    for (const file of files) {
      const f = await fse.readFile(__dirname + '/template/' + file[0]);
      const regs = file[1] ? file[1] : []
      const o = regs.reduce((a: string, b) => a.replace(b[0], b[1]), f.toString());
      const outFile = file[2] ? file[2] : file[0]
      const output = `${path}/${outFile}`;
      await fse.outputFile(output, o);
      console.log(output, console.log('OK'));
    }

    // success
    console.log('Api', console.log(model), 'has been created');
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
})();
