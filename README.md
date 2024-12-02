# eslint-plugin-ivan-plugin

easy plugin

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-ivan-plugin`:

```sh
npm install eslint-plugin-ivan-plugin --save-dev
```

## Usage

In your [configuration file](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file), import the plugin `eslint-plugin-ivan-plugin` and add `ivan-plugin` to the `plugins` key:

```js
import ivan-plugin from "eslint-plugin-ivan-plugin";

export default [
    {
        plugins: {
            ivan-plugin
        }
    }
];
```


Then configure the rules you want to use under the `rules` key.

```js
import ivan-plugin from "eslint-plugin-ivan-plugin";

export default [
    {
        plugins: {
            ivan-plugin
        },
        rules: {
            "ivan-plugin/rule-name": "warn"
        }
    }
];
```



## Configurations

<!-- begin auto-generated configs list -->
TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).
<!-- end auto-generated configs list -->



## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


