# reproduction-vitepress-usedata-error

## Structure

```shell
.
├── README.md
# bootstrap a private npm registry to test the component
├── verdaccio
# contains reproductions of the issue
└── repros
    # install the component as a regular dependency
    ├── regular-dep
    # install the component as a workspace dependency
    └── workspace-dep
```

## It works well within the monorepo

```shell
cd repros/workspace-dep
```

### Install dependencies

```shell
ni
```

### Build the component

```shell
nr packages:build
```

### Start a development server for VitePress site

```shell
nr docs:dev
```

`TryUseData` and `lang: en-US` should appear in the left bottom corner of the page.

### Build VitePress site

```shell
nr docs:build
```

it shouldn't have any error.

### Preview the VitePress site

```shell
nr docs:preview
```

it works the same as `docs:dev`: `TryUseData` and `lang: en-US` should appear in the left bottom corner of the page.

## It doesn't work well when installed as a regular dependency

### Start a private npm registry server

```shell
cd ../../verdaccio
```

or:

```shell
cd <repository clone>/verdaccio
```

```shell
nr start
```

### Setup the npm registry server

Navigate to `http://localhost:4873/` and follow the instructions to setup the npm registry server with a new user and sign it in:

```shell
npm adduser --registry http://localhost:4873/
```

### Build and push to the private npm registry server

Go to the components directory:

```shell
cd ../repros/workspace-dep/packages/vitepress-plugin-testcomponents
```

Build it and publish it to the private npm registry server:

> **NOTE**
> If you need to delete the private registry's data, you can run the following command when using macOS:
>
> 1. Delete the entire storage: rm -rf ~/.local/share/verdaccio/storage
> 2. Delete only the repro component: rm -rf ~/.local/share/verdaccio/storage/vitepress-usedata-repro-monorepo-components

```shell
nr build
npm publish --registry http://localhost:4873/
```

### Install the component as a regular dependency

Go to the `regular-dep` directory:

```shell
cd ../../../regular-dep
```

Install the component as a regular dependency:

```shell
pnpm set registry http://localhost:4873/
```

```shell
ni
```

### Start a development server for VitePress site

```shell
nr docs:dev
```

`TryUseData` and `lang: en-US` should appear in the left bottom corner of the page.

### Build VitePress site

```shell
nr docs:build
```

Now the build will fail with the following error:

```shell
build error:
file:///vitepress-usedata-repro-monorepo/repros/regular-dep/node_modules/.pnpm/vitepress-usedata-repro-monorepo-components@1.0.0_vitepress@1.0.0-rc.12_vue@3.3.4/node_modules/vitepress-usedata-repro-monorepo-components/dist/index.es.mjs:2
import { useData as s } from "vitepress";
         ^^^^^^^
SyntaxError: The requested module 'vitepress' does not provide an export named 'useData'
    at ModuleJob._instantiate (node:internal/modules/esm/module_job:124:21)
    at async ModuleJob.run (node:internal/modules/esm/module_job:190:5)
```
