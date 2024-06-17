[![shield_npm-version]][link_npm]
[![shield_gh-workflow-test]][link_gh-workflow-test]
[![shield_coverage]][link_codacy]
[![shield_ossf-best-practices]][link_ossf-best-practices]
[![shield_license]][license_file]  
[![shield_website]][link_website]
[![shield_slack]][link_slack]
[![shield_groups]][link_discussion]
[![shield_twitter-follow]][link_twitter]

----

# CycloneDX Webpack Plugin

This plugin for _[webpack]_ creates a _[CycloneDX]_ Software Bill of Materials (SBoM) 
containing an aggregate of all bundled dependencies.  
This plugin uses the linkages generated by _webpack_ to create a dependency graph which only contain the dependencies
that are actually used (after [tree-shaking](https://webpack.js.org/guides/tree-shaking/)).

## Requirements

* _Node.js_ `>= 14`
* _webpack_ `^5`

However, there are older versions of this plugin, that support
* _Node.js_ v8.0.0 or higher
* _webpack_ v4.0.0 or higher

## Installing


```shell
npm i -D @cyclonedx/webpack-plugin
yarn add -D @cyclonedx/webpack-plugin
```

## Usage

```javascript
new CycloneDxWebpackPlugin(options?: object)
```

### Options & Configuration

<!-- the following table is based on `src/plugin.ts`::`CycloneDxWebpackPluginOptions` -->

| Name | Type | Default | Description |
|:-----|:----:|:-------:|:------------|
| **`specVersion`** | `{string}`<br/>one of: `"1.2"`, `"1.3"`, `"1.4"`, `"1.5"`, `"1.6"` | `"1.4"` |  Which version of [CycloneDX-spec] to use.<br/> Supported values depend on the installed dependency [CycloneDX-javascript-library]. |
| **`reproducibleResults`** | `{boolean}` | `false` | Whether to go the extra mile and make the output reproducible.<br/> Reproducibility might result in loss of time- and random-based-values. |
| **`validateResults`** | `{boolean}` | `true` | Whether to validate the BOM result.<br/>Validation is skipped, if requirements not met. Requires [transitive optional dependencies](https://github.com/CycloneDX/cyclonedx-javascript-library#optional-dependencies). |
| **`outputLocation`** | `{string}` | `"./cyclonedx"` | Path to write the output to. The path is relative to _webpack_'s overall output path. |
| **`includeWellknown`** | `{boolean}` | `true` | Whether to write the Wellknowns. |
| **`wellknownLocation`** | `{string}` | `"./.well-known"` | Path to write the Wellknowns to. The path is relative to _webpack_'s overall output path. | 
| **`rootComponentAutodetect`** | `{boolean}` | `true` | Whether to try auto-detection of the RootComponent.<br/> Tries to find the nearest `package.json` and build a CycloneDX component from it, so it can be assigned to `bom.metadata.component`. |
| **`rootComponentType`** | `{string}` | `"application"` | Set the RootComponent's type.<br/>See [the list of valid values](https://cyclonedx.org/docs/1.4/json/#metadata_component_type). Supported values depend on [CycloneDX-javascript-library]'s enum `ComponentType`. |
| **`rootComponentName`** | optional `{string}` | `undefined` | If `rootComponentAutodetect` is disabled, then this value is assumed as the "name" of the `package.json`. |
| **`rootComponentVersion`** | optional `{string}` | `undefined` | If `rootComponentAutodetect` is disabled, then this value is assumed as the "version" of the `package.json`. |

### Example

In your [webpack config] add the CycloneDX plugin:

```javascript
const { CycloneDxWebpackPlugin } = require('@cyclonedx/webpack-plugin');

/** @type {import('@cyclonedx/webpack-plugin').CycloneDxWebpackPluginOptions} */
const cycloneDxWebpackPluginOptions = {
  specVersion: '1.4',
  outputLocation: './bom'
}

module.exports = {
  // ...
  plugins: [
    new CycloneDxWebpackPlugin(cycloneDxWebpackPluginOptions)
  ]
}
```

See extended [examples].

### Support for IETF /.well-known/sbom

The CycloneDX _webpack_ plugin supports placing the CycloneDX SBOM in a pre-defined location, specifically in
`/.well-known/sbom`. This option is enabled by default. The behavior can be changed by overriding the values 
of `includeWellknown` and `wellknownLocation`.  
See [draft-ietf-opsawg-sbom-access] for more information on the specification, currently an IETF draft.

In your [webpack config] add the CycloneDX plugin:

```javascript
const { CycloneDxWebpackPlugin } = require('@cyclonedx/webpack-plugin');

/** @type {import('@cyclonedx/webpack-plugin').CycloneDxWebpackPluginOptions} */
const cycloneDxWebpackPluginOptions = {
  includeWellknown: true,
  wellknownLocation: './.well-known'
}

module.exports = {
  // ...
  plugins: [
    new CycloneDxWebpackPlugin(cycloneDxWebpackPluginOptions)
  ]
}
```

### Use with Angular

_Angular_ uses _webpack_ under the hood. Therefore, it is possible to integrate this plugin by utilizing
[@angular-builders/custom-webpack](https://www.npmjs.com/package/@angular-builders/custom-webpack).  
See an example here: [integration with Angular17/webpack5](https://github.com/CycloneDX/cyclonedx-webpack-plugin/tree/master/tests/integration/webpack5-angular17).

### Use with React

_React_ uses _webpack_ under the hood. Therefore, it is possible to integrate this plugin.  
See an example here: [integration with React18/webpack5](https://github.com/CycloneDX/cyclonedx-webpack-plugin/tree/master/tests/integration/webpack5-react18).

## Internals

This _webpack_ plugin utilizes the [CycloneDX library][CycloneDX-javascript-library] to generate the actual data structures.

Besides the class `CycloneDxWebpackPlugin` and the interface `CycloneDxWebpackPluginOptions`,  
this _webpack_ plugin does **not** expose any additional _public_ API or classes - all code is intended to be internal and might change without any notice during version upgrades.

## Development & Contributing

Feel free to open issues, bugreports or pull requests.  
See the [CONTRIBUTING][contributing_file] file for details.

## License

Permission to modify and redistribute is granted under the terms of the Apache 2.0 license.  
See the [LICENSE][license_file] file for the full license.

[CycloneDX]: https://cyclonedx.org/
[CycloneDX-spec]: https://github.com/CycloneDX/

[webpack]: https://webpack.js.org/
[webpack config]: https://webpack.js.org/configuration/
[draft-ietf-opsawg-sbom-access]: https://datatracker.ietf.org/doc/html/draft-ietf-opsawg-sbom-access

[CycloneDX-javascript-library]: https://github.com/CycloneDX/cyclonedx-javascript-library/

[license_file]: https://github.com/CycloneDX/cyclonedx-webpack-plugin/blob/master/LICENSE
[contributing_file]: https://github.com/CycloneDX/cyclonedx-webpack-plugin/blob/master/CONTRIBUTING.md
[examples]: https://github.com/CycloneDX/cyclonedx-webpack-plugin/tree/master/examples

[shield_gh-workflow-test]: https://img.shields.io/github/actions/workflow/status/CycloneDX/cyclonedx-webpack-plugin/nodejs.yml?branch=master&logo=GitHub&logoColor=white "tests"
[shield_npm-version]: https://img.shields.io/npm/v/%40cyclonedx%2fwebpack-plugin/latest?label=npm&logo=npm&logoColor=white "npm"
[shield_license]: https://img.shields.io/github/license/CycloneDX/cyclonedx-webpack-plugin?logo=open%20source%20initiative&logoColor=white "license"
[shield_ossf-best-practices]: https://img.shields.io/cii/percentage/7884?label=OpenSSF%20best%20practices "OpenSSF best practices"
[shield_coverage]: https://img.shields.io/codacy/coverage/100ece8926d548e99d8ca56b9d8cec78?logo=Codacy&logoColor=white "test coverage"
[shield_website]: https://img.shields.io/badge/https://-cyclonedx.org-blue.svg "homepage"
[shield_slack]: https://img.shields.io/badge/slack-join-blue?logo=Slack&logoColor=white "slack join"
[shield_groups]: https://img.shields.io/badge/discussion-groups.io-blue.svg "groups discussion"
[shield_twitter-follow]: https://img.shields.io/badge/Twitter-follow-blue?logo=Twitter&logoColor=white "twitter follow"

[link_website]: https://cyclonedx.org/
[link_gh-workflow-test]: https://github.com/CycloneDX/cyclonedx-webpack-plugin/actions/workflows/nodejs.yml?query=branch%3Amaster
[link_codacy]: https://app.codacy.com/gh/CycloneDX/cyclonedx-webpack-plugin/dashboard
[link_ossf-best-practices]: https://www.bestpractices.dev/projects/7884
[link_npm]: https://www.npmjs.com/package/@cyclonedx/webpack-plugin
[link_slack]: https://cyclonedx.org/slack/invite
[link_discussion]: https://groups.io/g/CycloneDX
[link_twitter]: https://twitter.com/CycloneDX_Spec
