const http = require('http')
const fs = require('fs')

const args = require("minimist")(process.argv.slice(1));

let homeContent = ''
let projectContent = ''
let registrationContent = ''

fs.readFile('home.html', (err, home) => {
  if (err) {
    throw err
  }
  homeContent = home
})

fs.readFile('project.html', (err, project) => {
  if (err) {
    throw err
  }
  projectContent = project
})

fs.readFile('reg.html', (err, reg) => {
  if (err) {
    throw err
  }
  registrationContent = reg
})


http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;
      case "/reg":
          response.write(registrationContent);
          response.end();
          break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(args.port);