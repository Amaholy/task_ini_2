const fs = require('fs')

function readConfigFile() {
  try {
    const configFileData = fs.readFileSync('config.ini', 'utf-8')
    return configFileData
  } catch (error) {
    console.error('Error reading config.ini:', error)
    return null
  }
}

function updateConfig(config, section, parameter, value) {
  if (!(section in config)) {
    config[section] = {}
  }

  config[section][parameter] = value
}

function saveConfigFile(config) {
  try {
    let configFileContent = ''

    for (const section in config) {
      configFileContent += `[${section}]\n`

      for (const parameter in config[section]) {
        const value = config[section][parameter]
        configFileContent += `${parameter} = ${value}\n`
      }

      configFileContent += '\n'
    }

    fs.writeFileSync('config.ini', configFileContent, 'utf-8')
    console.log('Config file saved successfully.')
  } catch (error) {
    console.error('Error saving config.ini:', error)
  }
}

const configData = readConfigFile()
if (configData) {
  const config = {}
  let currentSection

  const lines = configData.split('\n')
  for (const line of lines) {
    const trimmedLine = line.trim()

    // Ignore comments and empty lines
    if (trimmedLine.startsWith('#') || trimmedLine === '') {
      continue
    }

    if (trimmedLine.startsWith('[') && trimmedLine.endsWith(']')) {
      // Section
      currentSection = trimmedLine.slice(1, -1)
      config[currentSection] = {}
    } else if (currentSection) {
      // Key-value pair
      const [parameter, value] = trimmedLine.split('=')
      config[currentSection][parameter.trim()] = value.trim()
    }
  }

  console.log('Current config values:', config)

  updateConfig(config, 'Section1', 'parameter1', 'Value1')

  saveConfigFile(config)
}
