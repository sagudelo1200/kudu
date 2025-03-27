module.exports = function override(config) {
  config.ignoreWarnings = [
    {
      module: /stylis-plugin-rtl/, // Ignorar warnings relacionados con stylis-plugin-rtl
    },
  ]
  return config
}
