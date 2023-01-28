/*!
This file is part of CycloneDX Webpack plugin.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

SPDX-License-Identifier: Apache-2.0
Copyright (c) OWASP Foundation. All Rights Reserved.
*/

import type * as CDX from '@cyclonedx/cyclonedx-library'
import { sync as readPackageUpSync } from 'read-pkg-up'

export function makeThisTool (builder: CDX.Builders.FromPackageJson.ToolBuilder): CDX.Models.Tool | undefined {
  const packageJson = readPackageUpSync({ cwd: __dirname, normalize: false })
  return packageJson === undefined
    ? undefined
    : builder.makeTool(packageJson.packageJson)
}
