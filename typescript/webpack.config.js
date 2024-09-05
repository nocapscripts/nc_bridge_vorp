const path = require('path');
const webpack = require('webpack');
const RemovePlugin = require('remove-files-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');
const ESLintPlugin = require('eslint-webpack-plugin');
const buildPath = path.resolve(__dirname, 'build');

const serverConfig = {
  target: 'node',
  entry: {
    sv_server: './server/server.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(buildPath, 'server'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ 'global.GENTLY': false }),
    new RemovePlugin({
      before: { include: [path.resolve(buildPath, 'server')] },
      watch: { include: [path.resolve(buildPath, 'server')] },
    }),
    new WebpackObfuscator({
      rotateStringArray: true,
      stringArray: true,
      transformObjectKeys: true,
      compact: true,
      controlFlowFlattening: false,  // Simplified obfuscation
      deadCodeInjection: false,      // Simplified obfuscation
      selfDefending: false,          // Simplified obfuscation
      debugProtection: false,        // Simplified obfuscation
      disableConsoleOutput: false,   // Simplified obfuscation
      splitStrings: false,           // Simplified obfuscation
    }),
    new ESLintPlugin({
      extensions: ['ts', 'tsx', 'js'],
      emitWarning: false,
      emitError: false,
      failOnError: false
    }),
  ],
  optimization: { minimize: false },
  stats: {
    errorDetails: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@server': path.resolve(__dirname, 'dist/server'),
    },
  },
};

const clientConfig = {
  target: 'node',
  entry: {
    cl_client: './client/client.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(buildPath, 'client'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new RemovePlugin({
      before: { include: [path.resolve(buildPath, 'client')] },
      watch: { include: [path.resolve(buildPath, 'client')] },
    }),
    new WebpackObfuscator({
      rotateStringArray: true,
      stringArray: true,
      transformObjectKeys: true,
      compact: true,
      controlFlowFlattening: false,  // Simplified obfuscation
      deadCodeInjection: false,      // Simplified obfuscation
      selfDefending: false,          // Simplified obfuscation
      debugProtection: false,        // Simplified obfuscation
      disableConsoleOutput: false,   // Simplified obfuscation
      splitStrings: false,           // Simplified obfuscation
    }), 
    new ESLintPlugin({
      extensions: ['ts', 'tsx', 'js'],
      emitWarning: false,
      emitError: false,
      failOnError: false
    }),
  ],
  optimization: { minimize: false },
  stats: {
    errorDetails: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@client': path.resolve(__dirname, 'dist/client'),
    },
  },
};

module.exports = [serverConfig, clientConfig];
