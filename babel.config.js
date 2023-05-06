
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
       'react-native-reanimated/plugin',
       "inline-dotenv",
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@dtos": "./src/dtos",
            "@assets": "./src/assets",
            '@libs': './src/libs',
            "@styles": "./src/styles",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@storage": "./src/storage",
            "@utils": "./src/utils",
            "@services": "./src/services",
            "@hooks": "./src/hooks",
            "@context": "./src/context",
            "@routes": "./src/routes",
          },
        },
      ],
    ],
  };
};