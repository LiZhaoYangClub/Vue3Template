const modules: any = require.context('./', true, /\.vue$/)

const modulesAll = modules.keys().reduce((all: any, modulePath: string) => {
  const path = modulePath.split('/')[1]
  all[path] = modules(modulePath).default
  return all
}, {})

export const MyComponent = {
  install: (App: any) => {
    Object.keys(modulesAll).forEach(module => {
      App.component(module, modulesAll[module])
    })
  }
}
