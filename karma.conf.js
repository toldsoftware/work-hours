module.exports = function (config) {
  config.set({

    frameworks: ["jasmine", "karma-typescript"],

    files: [{
      pattern: "src/**/*.ts"
    }],

    preprocessors: {
      "**/*.ts": ["karma-typescript"]
    },

    reporters: ["progress", "karma-typescript"],

    karmaTypescriptConfig: {
      tsconfig : "tsconfig.json",
      reports: {
        "html": "coverage",
        "lcovonly": "lcov",
        "text-summary": ""
      }
    },

    browsers: ["Firefox"],
  });
};