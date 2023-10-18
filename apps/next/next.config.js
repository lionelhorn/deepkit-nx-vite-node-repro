const path = require("path");
const typeCompiler = require("@deepkit/type-compiler");

const tsConfigPath = path.resolve(__dirname, "./tsconfig.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  webpack: (
    config,
    {buildId, dev, isServer, defaultLoaders, nextRuntime, webpack}
  ) => {
    // Important: return the modified config
    //
    // config.devtool = 'source-map';
    // config.module.rules.push(
    //   {
    //     test: /\.(ts|tsx)$/,
    //     loader: 'ts-loader',
    //
    //     options: {
    //       configFile: tsConfigPath,
    //       getCustomTransformers: (program, getProgram) => ({
    //         before: [
    //           typeCompiler.transformer
    //         ],
    //         afterDeclarations: [
    //           typeCompiler.declarationTransformer
    //         ],
    //       }),
    //     },
    //     exclude: /node_modules/,
    //   });

    return config
  },
}

module.exports = nextConfig
