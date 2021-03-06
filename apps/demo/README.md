## Running Daffodil Demo

### Prerequisites
* [Lerna](https://lernajs.io/) - `npm install -g lerna`.
* [Angular CLI](https://cli.angular.io/) - `npm install -g @angular/cli`

### Getting Started
1. `lerna run build`
2. `ng serve --project=demo`
3. Navigate to `localhost:4200` in your browser of choice

#### Running with Magento

If you run demo with Magento drivers, Apollo will try to load fragment data from a file. This fragment data file can be generated by running `ng run demo:generateFragmentTypes -c magento-local`.

> Note: You might need to allow self-signed certificates during this command by setting env var NODE_TLS_REJECT_UNAUTHORIZED=0.

### Project Overview
Daffodil is structured as a monorepo. We utilize `lerna` to manage all the child packages that are generated by the repo as well as install their dependencies when needed. `lerna run build` will compile all the  internal `@daffodil` packages that the `demo` depends on.

### Contributing to demo
Generally speaking, you don't want to depend directly on the source of a dependency when developing, as that can cause unexpected issues at build and deployment time, as well as downstream effects for the developers that depend on your libraries. Yet, there are instances when quick development cycles that don't require a full rebuild can drastically improve development efficiency. E.g. changing styles in a component library.

For this reason, we have opted to create a secondary project `demo-dev` which depends directly on the `@daffodil` libraries source. This can be utilized for rapid feature prototyping, but should be used sparingly.

> demo-dev does not support `lint`ing or `build`ing, it only serves the purposes of the internal `@daffodil` development team.

You can run this project via:

```
ng serve --project=demo-dev
```
