[![Build Status](https://github.com/CycloneDX/cyclonedx-webpack-plugin/workflows/Node%20CI/badge.svg)](https://github.com/CycloneDX/cyclonedx-webpack-plugin/actions?workflow=Node+CI)
[![License](https://img.shields.io/badge/license-Apache%202.0-brightgreen.svg)][License]
[![Latest](
https://img.shields.io/npm/v/@cyclonedx/webpack-plugin)](https://www.npmjs.com/package/@cyclonedx/webpack-plugin)
[![Website](https://img.shields.io/badge/https://-cyclonedx.org-blue.svg)](https://cyclonedx.org/)
[![Slack Invite](https://img.shields.io/badge/Slack-Join-blue?logo=slack&labelColor=393939)](https://cyclonedx.org/slack/invite)
[![Group Discussion](https://img.shields.io/badge/discussion-groups.io-blue.svg)](https://groups.io/g/CycloneDX)
[![Twitter](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&label=Follow)](https://twitter.com/CycloneDX_Spec)

# CycloneDX Webpack Plugin

The CycloneDX plugin for Webpack creates a valid CycloneDX Software Bill of Materials (SBOM) containing an aggregate of 
all bundled dependencies. This plugin uses the linkages generated by webpack to create a dependency graph which only 
contain the dependencies that are actually used. 

## Requirements
- Node.js `>= 12.0.0`
- Webpack `^4.0.0 || ^5.0.0`

However, there are older versions of this plugin, that support
- Node.js v8.0.0 or higher
- Webpack v4.0.0 or higher

## Installing

```shell
npm i -D @cyclonedx/webpack-plugin
```

## Usage

### Example

In your [webpack config](https://webpack.js.org/configuration/) add the CycloneDX plugin:

```javascript
const { CycloneDxWebpackPlugin } = require('@cyclonedx/webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new CycloneDxWebpackPlugin({
      context: '../',
      outputLocation: './artifacts'
    })
  ]
};
```

### Support for IETF /.well-known/sbom

The CycloneDX Webpack plugin supports placing the CycloneDX SBOM in a pre-defined location, specifically in
`/.well-known/sbom`. This option is enabled by default. The behavior can be changed by overriding the values 
of `includeWellknown` and `wellknownLocation`.

See [draft-lear-opsawg-sbom-access](https://datatracker.ietf.org/doc/html/draft-ietf-opsawg-sbom-access) for more 
information on the specification, currently an IETF draft.

In your [webpack config](https://webpack.js.org/configuration/) add the CycloneDX plugin:

```javascript
const { CycloneDxWebpackPlugin } = require('@cyclonedx/webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new CycloneDxWebpackPlugin({
      context: '../',
      outputLocation: './artifacts',
      includeWellknown: true,
      wellknownLocation: './.well-known'
    })
  ]
};
```

### Use with Angular

Angular uses Webpack under the hood. Therefore, it is possible to integrate this plugin by utilizing
[@angular-builders/custom-webpack](https://www.npmjs.com/package/@angular-builders/custom-webpack).

## License

Permission to modify and redistribute is granted under the terms of the Apache 2.0 license. See the [LICENSE] file for the full license.

[License]: https://github.com/CycloneDX/cyclonedx-webpack-plugin/blob/master/LICENSE
