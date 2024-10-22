export default function (plop) {
  plop.setGenerator('component', {
    description: 'Create a new React component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.jsx',
        templateFile: 'plop-templates/Component.jsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.css',
        templateFile: 'plop-templates/Component.css.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.test.jsx',
        templateFile: 'plop-templates/Component.test.jsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/index.js',
        templateFile: 'plop-templates/index.js.hbs',
      },
    ],
  });

  plop.setGenerator('hook', {
    description: 'Create a new custom hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Hook name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/hooks/use{{name}}.jsx',
        templateFile: 'plop-templates/useCustomHook.jsx.hbs',
      },
    ],
  });
}
