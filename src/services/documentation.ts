/**
 * Documentation service for Varlet UI.
 *
 * Provides access to installation guides, feature documentation, and other resources.
 */
import { Octokit } from 'octokit';

export type InstallationPlatform =
  | 'vite'
  | 'vue-cli'
  | 'nuxt'
  | 'webpack'
  | 'cdn';
export type AvailableFeature =
  | 'theming'
  | 'i18n'
  | 'dark-mode'
  | 'ssr'
  | 'typescript'
  | 'lazy-loading';

export const INSTALLATION_PLATFORMS: Record<InstallationPlatform, string> = {
  vite: 'Vite',
  'vue-cli': 'Vue CLI',
  nuxt: 'Nuxt.js',
  webpack: 'Webpack',
  cdn: 'CDN',
};

export const AVAILABLE_FEATURES: Record<AvailableFeature, string> = {
  theming: 'Theming and Customization',
  i18n: 'Internationalization',
  'dark-mode': 'Dark Mode',
  ssr: 'Server-Side Rendering',
  typescript: 'TypeScript Support',
  'lazy-loading': 'Lazy Loading Components',
};

export function createDocumentationService() {
  const _octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  return {
    async getInstallationGuide({
      platform,
      ssr,
      fresh,
    }: {
      platform: InstallationPlatform;
      ssr: boolean;
      fresh: boolean;
    }) {
      // Generate installation guide based on platform
      let guide = '';

      if (platform === 'vite') {
        if (fresh) {
          guide = `
# Installing Varlet UI with Vite (New Project)

## 1. Create a new Vite project

\`\`\`bash
npm create vite@latest my-varlet-app -- --template vue-ts
cd my-varlet-app
\`\`\`

## 2. Install Varlet UI

\`\`\`bash
npm i @varlet/ui -S
\`\`\`

## 3. Configure in main.ts

\`\`\`typescript
import { createApp } from 'vue'
import App from './App.vue'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style.js'

const app = createApp(App)
app.use(Varlet)
app.mount('#app')
\`\`\`

## 4. Start development server

\`\`\`bash
npm run dev
\`\`\`
`;
        } else {
          guide = `
# Installing Varlet UI with Vite (Existing Project)

## 1. Install Varlet UI

\`\`\`bash
npm i @varlet/ui -S
\`\`\`

## 2. Configure in main.ts

\`\`\`typescript
import { createApp } from 'vue'
import App from './App.vue'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style.js'

const app = createApp(App)
app.use(Varlet)
app.mount('#app')
\`\`\`
`;
        }

        if (ssr) {
          guide += `
## SSR Configuration for Vite

When using Varlet UI with SSR in Vite, you need to add the following configuration:

\`\`\`typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VarletImportResolver } from '@varlet/import-resolver'

export default defineConfig({
  plugins: [
    vue(),
    VarletImportResolver()
  ],
  // SSR specific configuration
  ssr: {
    noExternal: ['@varlet/ui']
  }
})
\`\`\`
`;
        }
      } else if (platform === 'vue-cli') {
        guide = `
# Installing Varlet UI with Vue CLI

## 1. Install Varlet UI

\`\`\`bash
npm i @varlet/ui -S
\`\`\`

## 2. Configure in main.js/ts

\`\`\`typescript
import { createApp } from 'vue'
import App from './App.vue'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style.js'

const app = createApp(App)
app.use(Varlet)
app.mount('#app')
\`\`\`
`;
      } else if (platform === 'nuxt') {
        guide = `
# Installing Varlet UI with Nuxt.js

## 1. Install Varlet UI

\`\`\`bash
npm i @varlet/ui -S
\`\`\`

## 2. Create a plugin file

Create a file at \`plugins/varlet.ts\`:

\`\`\`typescript
// plugins/varlet.ts
import { defineNuxtPlugin } from '#app'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style.js'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Varlet)
})
\`\`\`

## 3. Configure in nuxt.config.ts

\`\`\`typescript
// nuxt.config.ts
export default defineNuxtConfig({
  plugins: [
    '~/plugins/varlet.ts'
  ],
  build: {
    transpile: ['@varlet/ui']
  }
})
\`\`\`
`;
      } else if (platform === 'webpack') {
        guide = `
# Installing Varlet UI with Webpack

## 1. Install Varlet UI

\`\`\`bash
npm i @varlet/ui -S
\`\`\`

## 2. Configure in main.js/ts

\`\`\`typescript
import { createApp } from 'vue'
import App from './App.vue'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style.js'

const app = createApp(App)
app.use(Varlet)
app.mount('#app')
\`\`\`

## 3. Webpack Configuration (optional)

For better tree-shaking, you can use the Varlet Import Resolver:

\`\`\`bash
npm i @varlet/import-resolver -D
\`\`\`

\`\`\`javascript
// webpack.config.js
const { VarletImportResolver } = require('@varlet/import-resolver')

module.exports = {
  // ...
  plugins: [
    require('unplugin-vue-components/webpack')({
      resolvers: [VarletImportResolver()]
    })
  ]
}
\`\`\`
`;
      } else if (platform === 'cdn') {
        guide = `
# Using Varlet UI via CDN

You can use Varlet UI directly via CDN:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@varlet/ui/umd/style.css">
  <title>Varlet UI via CDN</title>
</head>
<body>
  <div id="app">
    <var-button type="primary">Hello Varlet</var-button>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@next"></script>
  <script src="https://cdn.jsdelivr.net/npm/@varlet/ui/umd/varlet.js"></script>
  <script>
    const app = Vue.createApp({
      template: '<var-button type="primary">Hello Varlet</var-button>'
    })
    app.use(Varlet)
    app.mount('#app')
  </script>
</body>
</html>
\`\`\`
`;
      }

      return {
        contents: [
          {
            uri: 'varlet://installation/guide.md',
            text: guide,
          },
        ],
      };
    },

    async getFeatureGuides() {
      return {
        contents: [
          {
            uri: 'varlet://features/guides.md',
            text: `# Available Varlet UI Features

${Object.entries(AVAILABLE_FEATURES)
  .map(([key, name]) => `- **${name}** (${key})`)
  .join('\n')}

Use the \`get_feature_guide\` tool with the feature key to get detailed information about each feature.`,
          },
        ],
      };
    },

    async getFeatureGuide({ feature }: { feature: AvailableFeature }) {
      let guide = '';

      if (feature === 'theming') {
        guide = `
# Varlet UI Theming and Customization

Varlet UI provides a powerful theming system that allows you to customize the look and feel of your application.

## Basic Theme Variables

You can override the default theme variables by creating a CSS file:

\`\`\`css
:root {
  --color-primary: #3a7afe;
  --color-link: #3a7afe;
  --color-success: #00c48f;
  --color-warning: #ff9f00;
  --color-danger: #f44336;
  --color-info: #00afef;
  --color-disabled: #e0e0e0;
  --color-text: #333;
  --color-text-primary: #3a7afe;
  --color-text-link: #3a7afe;
  --color-text-success: #00c48f;
  --color-text-warning: #ff9f00;
  --color-text-danger: #f44336;
  --color-text-info: #00afef;
  --color-text-disabled: #aaa;
  --color-border: rgba(0, 0, 0, 0.12);
  --color-background: #fff;
  --color-background-primary: #3a7afe;
  --color-background-success: #00c48f;
  --color-background-warning: #ff9f00;
  --color-background-danger: #f44336;
  --color-background-info: #00afef;
  --color-background-disabled: #e0e0e0;
}
\`\`\`

## Using the Theme Provider

Varlet UI provides a \`<var-theme-provider>\` component that allows you to create theme scopes:

\`\`\`vue
<template>
  <var-theme-provider :theme="{ sliderTrackHeight: '10px' }">
    <var-slider v-model="value" />
  </var-theme-provider>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(0)
</script>
\`\`\`

## Creating a Custom Theme

You can create a custom theme using the \`StyleProvider\` component:

\`\`\`typescript
import { StyleProvider } from '@varlet/ui'

// Define your custom theme
StyleProvider({  
  'color-primary': '#009688',
  'color-link': '#009688',
  'color-success': '#4caf50',
  'color-warning': '#ff9800',
  'color-danger': '#e53935',
  'color-info': '#2196f3'
})
\`\`\`
`;
      } else if (feature === 'i18n') {
        guide = `
# Varlet UI Internationalization

Varlet UI supports multiple languages and provides an easy way to switch between them.

## Available Languages

Varlet UI comes with the following languages built-in:
- Chinese (zh-CN)
- English (en-US)

## Changing the Language

You can change the language using the \`Locale\` object:

\`\`\`typescript
import { Locale } from '@varlet/ui'
import enUS from '@varlet/ui/es/locale/en-US'

Locale.use('en-US', enUS)
\`\`\`

## Creating a Custom Language Pack

You can create your own language pack by following this structure:

\`\`\`typescript
// fr-FR.ts
export default {
  // Common
  confirm: 'Confirmer',
  cancel: 'Annuler',
  // Component specific translations
  loading: {
    loading: 'Chargement...'
  },
  dialog: {
    confirmButtonText: 'Confirmer',
    cancelButtonText: 'Annuler'
  },
  // ... other component translations
}
\`\`\`

Then use it:

\`\`\`typescript
import { Locale } from '@varlet/ui'
import frFR from './fr-FR'

Locale.add('fr-FR', frFR)
Locale.use('fr-FR')
\`\`\`
`;
      } else if (feature === 'dark-mode') {
        guide = `
# Varlet UI Dark Mode

Varlet UI provides built-in support for dark mode.

## Enabling Dark Mode

You can enable dark mode using the \`Themes\` object:

\`\`\`typescript
import { Themes } from '@varlet/ui'

// Enable dark mode
Themes.use('dark')

// Disable dark mode
Themes.use('light')

// Toggle dark mode
Themes.toggle()
\`\`\`

## Auto Dark Mode

You can also make your app automatically switch to dark mode based on the user's system preferences:

\`\`\`typescript
import { Themes } from '@varlet/ui'

// Enable auto dark mode
Themes.addDarkMediaQuery()

// Disable auto dark mode
Themes.removeDarkMediaQuery()
\`\`\`

## Custom Dark Mode Variables

You can customize the dark mode variables by creating a CSS file:

\`\`\`css
html[var-theme='dark'] {
  --color-text: #fff;
  --color-background: #121212;
  --color-border: rgba(255, 255, 255, 0.12);
  /* ... other dark mode variables */
}
\`\`\`
`;
      } else if (feature === 'ssr') {
        guide = `
# Varlet UI Server-Side Rendering

Varlet UI supports server-side rendering (SSR) with frameworks like Nuxt.js.

## Nuxt.js Configuration

To use Varlet UI with Nuxt.js, follow these steps:

1. Install Varlet UI:

\`\`\`bash
npm i @varlet/ui -S
\`\`\`

2. Create a plugin file at \`plugins/varlet.ts\`:

\`\`\`typescript
import { defineNuxtPlugin } from '#app'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style.js'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Varlet)
})
\`\`\`

3. Configure in \`nuxt.config.ts\`:

\`\`\`typescript
export default defineNuxtConfig({
  plugins: [
    '~/plugins/varlet.ts'
  ],
  build: {
    transpile: ['@varlet/ui']
  }
})
\`\`\`

## Handling Client-Side Only Components

Some components like those using browser-specific APIs should only be rendered on the client side. Use the \`<client-only>\` component for these cases:

\`\`\`vue
<template>
  <div>
    <h1>My SSR App</h1>
    <client-only>
      <var-date-picker v-model="date" />
    </client-only>
  </div>
</template>
\`\`\`
`;
      } else if (feature === 'typescript') {
        guide = `
# Varlet UI TypeScript Support

Varlet UI is written in TypeScript and provides excellent TypeScript support out of the box.

## Component Props Types

Varlet UI exports types for all component props, making it easy to use with TypeScript:

\`\`\`typescript
import { ButtonProps } from '@varlet/ui'

// Use the types in your components
const buttonProps: ButtonProps = {
  type: 'primary',
  size: 'large',
  disabled: false
}
\`\`\`

## Global Component Types

Varlet UI automatically registers its component types with Vue, so you get proper type checking and autocompletion in your templates.

## Using with Vue + TypeScript

When using Varlet UI with Vue and TypeScript, you'll get full type support:

\`\`\`vue
<template>
  <var-button :type="buttonType" @click="handleClick">Click Me</var-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ButtonProps } from '@varlet/ui'

// Type-checked props
const buttonType = ref<ButtonProps['type']>('primary')

const handleClick = () => {
  console.log('Button clicked')
}
</script>
\`\`\`
`;
      } else if (feature === 'lazy-loading') {
        guide = `
# Varlet UI Lazy Loading

Varlet UI supports lazy loading components to reduce the initial bundle size of your application.

## On-Demand Import

You can import components on-demand to reduce bundle size:

\`\`\`typescript
import { createApp } from 'vue'
import App from './App.vue'

// Import only the components you need
import { Button, Dialog } from '@varlet/ui'
import '@varlet/ui/es/button/style/index.js'
import '@varlet/ui/es/dialog/style/index.js'

const app = createApp(App)

// Register individual components
app.use(Button)
app.use(Dialog)

app.mount('#app')
\`\`\`

## Auto Import with Resolver

You can use the Varlet Import Resolver to automatically import components as needed:

1. Install the resolver:

\`\`\`bash
npm i @varlet/import-resolver -D
\`\`\`

2. Configure in your build tool:

### Vite

\`\`\`typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VarletImportResolver } from '@varlet/import-resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VarletImportResolver()]
    })
  ]
})
\`\`\`

### Webpack

\`\`\`javascript
// webpack.config.js
const { VarletImportResolver } = require('@varlet/import-resolver')

module.exports = {
  // ...
  plugins: [
    require('unplugin-vue-components/webpack')({
      resolvers: [VarletImportResolver()]
    })
  ]
}
\`\`\`

With this configuration, you can use Varlet components directly in your templates without importing them, and only the components you actually use will be included in your bundle.
`;
      }

      return {
        contents: [
          {
            uri: `varlet://features/${feature}.md`,
            text: guide,
          },
        ],
      };
    },

    async getVarletExports() {
      return {
        contents: [
          {
            uri: 'varlet://exports/index.md',
            text: `# Varlet UI Exports

The @varlet/ui package exports the following:

## Components

- Button
- Card
- Cell
- Checkbox
- CheckboxGroup
- Chip
- Counter
- DatePicker
- Dialog
- Divider
- Form
- Icon
- Image
- ImagePreview
- Input
- List
- Loading
- Menu
- Overlay
- Pagination
- Picker
- Popup
- Progress
- PullRefresh
- Radio
- RadioGroup
- Rate
- Select
- Slider
- Snackbar
- Space
- Step
- Stepper
- Sticky
- Switch
- Tab
- Tabs
- Table
- TimePicker
- Tooltip
- Uploader

## Directives

- Ripple
- Lazy

## Utilities

- Locale (i18n utilities)
- Themes (theme utilities)
- StyleProvider (custom theme provider)
- Context (component context utilities)
- LoadingBar (global loading bar)
- Snackbar (global snackbar)
- Dialog (global dialog)
- ActionSheet (global action sheet)
- ImagePreview (global image preview)
- Picker (global picker)
- DatePicker (global date picker)
- TimePicker (global time picker)
- Loading (global loading)
`,
          },
        ],
      };
    },

    async getFrequentlyAskedQuestions() {
      return {
        contents: [
          {
            uri: 'varlet://faq/index.md',
            text: `# Varlet UI Frequently Asked Questions

## General

### Q: Is Varlet UI compatible with Vue 2?
A: No, Varlet UI is designed for Vue 3 only. If you need a UI library for Vue 2, consider using Vuetify, Element UI, or other Vue 2 compatible libraries.

### Q: Can I use Varlet UI with Nuxt.js?
A: Yes, Varlet UI works with Nuxt.js. See the SSR feature guide for detailed setup instructions.

### Q: How do I report bugs or request features?
A: You can report bugs or request features on the [Varlet GitHub repository](https://github.com/varletjs/varlet/issues).

## Installation & Setup

### Q: Why am I getting errors when importing Varlet UI components?
A: Make sure you've installed the package correctly and imported both the component and its styles. Check that your build configuration is set up correctly for handling ES modules.

### Q: How can I reduce my bundle size when using Varlet UI?
A: Use the on-demand import feature or the Varlet Import Resolver to only include the components you actually use in your application.

## Customization

### Q: How can I customize the default theme colors?
A: You can customize the theme by overriding CSS variables or using the StyleProvider. See the Theming feature guide for details.

### Q: Can I create multiple themes for my application?
A: Yes, you can create multiple themes using the StyleProvider or theme-provider component and switch between them dynamically.

## Components

### Q: How do I use form validation with Varlet UI?
A: Varlet UI provides a Form component with built-in validation capabilities. You can define rules for each form field and validate the entire form at once.

### Q: Can I use custom icons with Varlet UI?
A: Yes, Varlet UI's Icon component supports custom SVG icons and icon fonts. You can also use your own icon component if needed.

## Mobile & Responsive Design

### Q: Is Varlet UI responsive?
A: Yes, Varlet UI is designed to be responsive and works well on both mobile and desktop devices.

### Q: Does Varlet UI support touch gestures?
A: Yes, many Varlet UI components support touch gestures for mobile devices, such as swipe, pinch, and tap.
`,
          },
        ],
      };
    },

    async getReleaseNotesByVersion({ version }: { version: string }) {
      // In a real implementation, this would fetch actual release notes from GitHub
      // For this example, we'll return a placeholder
      return {
        contents: [
          {
            uri: `varlet://releases/${version}.md`,
            text: `# Varlet UI Release Notes - ${version === 'latest' ? 'v2.0.0' : `v${version}`}

## New Features

- Added new component: Table
- Enhanced theming system with more customization options
- Improved TypeScript support

## Bug Fixes

- Fixed Dialog component positioning on mobile devices
- Resolved issue with Form validation in nested components
- Fixed SSR compatibility issues

## Breaking Changes

- Renamed some props for consistency across components
- Updated minimum Vue version requirement to 3.3.0

## Performance Improvements

- Reduced bundle size by optimizing internal utilities
- Improved rendering performance for list-based components
`,
          },
        ],
      };
    },

    async getPlaygroundExamples({ component }: { component?: string }) {
      if (component) {
        // Return examples for a specific component
        return {
          contents: [
            {
              uri: `varlet://playground/${component}.md`,
              text: `# ${component} Component Examples

## Basic Usage

\`\`\`vue
<template>
  <var-${component.toLowerCase()} />
</template>
\`\`\`

## Playground Link

Try this component in the [Varlet UI Playground](https://varlet.gitee.io/varlet-ui/#/en-US/playground)
`,
            },
          ],
        };
      }

      // Return general playground information
      return {
        contents: [
          {
            uri: 'varlet://playground/index.md',
            text: `# Varlet UI Playground

You can try out Varlet UI components in the online playground:

[Varlet UI Playground](https://varlet.gitee.io/varlet-ui/#/en-US/playground)

Use the \`get_varlet_playground_examples\` tool with a specific component name to get examples for that component.
`,
          },
        ],
      };
    },
  };
}
