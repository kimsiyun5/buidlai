const webpack = require('webpack');

module.exports = function override(config) {
  // 폴리필 설정 추가
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    buffer: require.resolve('buffer/'),
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert/'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify/browser'),
    url: require.resolve('url/'),
    process: require.resolve('process/browser'),
    vm: require.resolve('vm-browserify'),
    fs: require.resolve('browserify-fs'),
    path: require.resolve('path-browserify'),
  });
  config.resolve.fallback = fallback;

  // 플러그인 추가
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);

  // 필요한 로더 설정
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  });

  // near-api-js 에서 필요한 aliases 추가
  config.resolve.alias = {
    ...config.resolve.alias,
    'near-api-js': require.resolve('near-api-js'),
  };

  return config;
};
