module.exports = function override(config) {
  if (config.devServer) {
    delete config.devServer.onAfterSetupMiddleware;
    delete config.devServer.onBeforeSetupMiddleware;
  }

  return config;
};
