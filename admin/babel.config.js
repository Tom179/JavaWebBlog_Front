module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [//引入ant-design
        [
         "import",
          { libraryName: "ant-design-vue", libraryDirectory: "es", style: "true" }
        ]
      ]
}
