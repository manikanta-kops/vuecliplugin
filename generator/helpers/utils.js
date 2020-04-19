const logSymbols = require("log-symbols");
var request = require("sync-request");
module.exports.getDefaultDevDependencies = () => {
  //NOte can get from npm and add updated versions or can enforce certain versions
  return {
    "@vue/cli-plugin-babel": "^4.2.0",
    "@vue/cli-plugin-e2e-cypress": "^4.2.0",
    "@vue/cli-plugin-eslint": "^4.2.0",
    "@vue/cli-plugin-router": "^4.2.0",
    "@vue/cli-plugin-unit-jest": "^4.2.0",
    "@vue/cli-plugin-vuex": "^4.2.0",
    "@vue/cli-service": "^4.2.0",
    "@vue/eslint-config-airbnb": "^5.0.2",
    "@vue/test-utils": "1.0.0-beta.31",
    "babel-eslint": "^10.0.3",
    eslint: "^6.7.2",
    "eslint-plugin-import": "^2.20.1",
    "eslint-plugin-vue": "^6.1.2",
    "node-sass": "^4.12.0",
    "sass-loader": "^8.0.2",
    "vue-template-compiler": "^2.6.11",
    husky: "3.0.4",
    "pretty-quick": "^2.0.1",
  };
};

module.exports.getDefaultScripts = () => {
  return {
    serve: "vue-cli-service serve",
    build: "vue-cli-service build",
    "test:unit": "vue-cli-service test:unit",
    "test:e2e": "vue-cli-service test:e2e",
    lint: "vue-cli-service lint",
    "test:debug":
      "node --inspect-brk node_modules/.bin/vue-cli-service test:unit --no-cache --watch --runInBand",
    precommit: "pretty-quick --staged",
  };
};
module.exports.getDefaultDependencies = () => {
  return {
    "core-js": "^3.6.4",
    vue: "^2.6.11",
    "vue-router": "^3.1.5",
    vuex: "^3.1.2",
  };
};

module.exports.logIntroMessages = () => {
  try {
    let date = new Date();
    var res = request(
      "GET",
      `http://numbersapi.com/${date.getMonth() + 1}/${date.getDate()}/date`
    );

    let message = res.getBody().toString();
    console.log(" ");
    console.log("****************** 🤗You know today ***********************");
    console.log(message);
    console.log("************************************************************");
    console.log(" ");
  } catch (error) {
    //ignore
  }
};

module.exports.logAfterMessages = () => {
  console.log("--------------------");
  console.log("After installation check the following things:");
  console.log(logSymbols.success, "Some messages can go here");
  console.log("Made with 💖 by manikanta koppala");
  console.log("--------------------");
};

module.exports.extendMainFile = (api) => {
  /**
   * can call api here and get some packages and create config files dynamycally
   */
  const { EOL } = require("os");
  const fs = require("fs");

  // const configFolder = "./src/config";
  // fs.mkdirSync(configFolder);

  //**Manipulating the entry(main.js) file */
  let contentMain = fs.readFileSync(api.resolve(api.entryFile), {
    encoding: "utf-8",
  });
  contentMain = contentMain.replace(
    /\/\/ i18n-import-statement/,
    `import i18n from './i18n';${EOL}
    `
  );
  fs.writeFileSync(api.entryFile, contentMain, { encoding: "utf-8" });
  const lines = contentMain.split(/\r?\n/g);
  const renderIndex = lines.findIndex((line) => line.match(/router,/));
  lines[renderIndex] += `${EOL}  i18n: i18n.i18n,`;
  fs.writeFileSync(api.entryFile, lines.join(EOL), { encoding: "utf-8" });
};
