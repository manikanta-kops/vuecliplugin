const {
  getDefaultDependencies,
  getDefaultDevDependencies,
  getDefaultScripts,
  extendMainFile,
  logAfterMessages,
  logIntroMessages,
} = require("./helpers/utils");

module.exports = (api) => {
  logIntroMessages();

  const { i18n } = api.options;
  api.render("./templates/basic");
  if (i18n) {
    api.render("./templates/withi18n/");
  }
  const allDependencies = getDefaultDependencies();
  const allDevDependencies = getDefaultDevDependencies();
  const allScripts = getDefaultScripts();

  api.extendPackage({
    dependencies: allDependencies,
    devDependencies: allDevDependencies,
    scripts: allScripts,
    husky: {
      hooks: {
        "pre-commit": "npm run precommit",
      },
    },
  });
};

module.exports.hooks = (api) => {
  const { i18n } = api.options;
  api.afterInvoke(() => {
    if (i18n) {
      extendMainFile(api);
    } else {
    }
    logAfterMessages();
  });
};
