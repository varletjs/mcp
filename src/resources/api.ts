/**
 * API resources for Varlet UI.
 */
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

export async function registerApiResources (server: McpServer) {
  server.resource(
    'varlet://api/components',
    'List of all Varlet UI components with their basic information',
    'application/json',
    async () => {
      const components = {
        basic: [
          { name: 'Button', description: 'Button component for user interactions', category: 'basic' },
          { name: 'Icon', description: 'Icon component for displaying icons', category: 'basic' },
          { name: 'Image', description: 'Image component with lazy loading support', category: 'basic' },
          { name: 'Cell', description: 'Cell component for list items', category: 'basic' },
          { name: 'Card', description: 'Card component for displaying content', category: 'basic' },
        ],
        form: [
          { name: 'Input', description: 'Input component for text input', category: 'form' },
          { name: 'Select', description: 'Select component for option selection', category: 'form' },
          { name: 'Checkbox', description: 'Checkbox component for boolean input', category: 'form' },
          { name: 'Radio', description: 'Radio component for single selection', category: 'form' },
          { name: 'Switch', description: 'Switch component for boolean toggle', category: 'form' },
          { name: 'Slider', description: 'Slider component for range input', category: 'form' },
          { name: 'Rate', description: 'Rate component for rating input', category: 'form' },
          { name: 'Form', description: 'Form component with validation', category: 'form' },
        ],
        feedback: [
          { name: 'Dialog', description: 'Dialog component for modal interactions', category: 'feedback' },
          { name: 'Popup', description: 'Popup component for overlay content', category: 'feedback' },
          { name: 'Loading', description: 'Loading component for async operations', category: 'feedback' },
          { name: 'Snackbar', description: 'Snackbar component for notifications', category: 'feedback' },
          { name: 'Tooltip', description: 'Tooltip component for contextual help', category: 'feedback' },
          { name: 'Progress', description: 'Progress component for showing progress', category: 'feedback' },
        ],
        navigation: [
          { name: 'Tab', description: 'Tab component for navigation', category: 'navigation' },
          { name: 'Menu', description: 'Menu component for navigation options', category: 'navigation' },
          { name: 'Pagination', description: 'Pagination component for data navigation', category: 'navigation' },
          { name: 'Step', description: 'Step component for step-by-step processes', category: 'navigation' },
        ],
        layout: [
          { name: 'List', description: 'List component for displaying data', category: 'layout' },
          { name: 'Table', description: 'Table component for tabular data', category: 'layout' },
          { name: 'Divider', description: 'Divider component for content separation', category: 'layout' },
          { name: 'Space', description: 'Space component for layout spacing', category: 'layout' },
          { name: 'Sticky', description: 'Sticky component for fixed positioning', category: 'layout' },
        ],
        advanced: [
          { name: 'Picker', description: 'Picker component for option selection', category: 'advanced' },
          { name: 'DatePicker', description: 'DatePicker component for date selection', category: 'advanced' },
          { name: 'TimePicker', description: 'TimePicker component for time selection', category: 'advanced' },
          { name: 'Uploader', description: 'Uploader component for file uploads', category: 'advanced' },
          { name: 'ImagePreview', description: 'ImagePreview component for image viewing', category: 'advanced' },
          { name: 'PullRefresh', description: 'PullRefresh component for refresh functionality', category: 'advanced' },
        ],
      }

      return {
        contents: [{
          type: 'text',
          text: JSON.stringify(components, null, 2),
        }],
      }
    },
  )

  server.resource(
    'varlet://api/directives',
    'List of all Varlet UI directives',
    'application/json',
    async () => {
      const directives = [
        {
          name: 'v-ripple',
          description: 'Adds ripple effect to elements',
          usage: 'v-ripple or v-ripple="{ color: \'red\' }"',
        },
        {
          name: 'v-lazy',
          description: 'Lazy loading for images and components',
          usage: 'v-lazy="imageUrl" or v-lazy="{ src: imageUrl, loading: loadingUrl }"',
        },
      ]

      return {
        contents: [{
          type: 'text',
          text: JSON.stringify(directives, null, 2),
        }],
      }
    },
  )

  server.resource(
    'varlet://api/utilities',
    'List of all Varlet UI utilities and services',
    'application/json',
    async () => {
      const utilities = {
        theming: [
          { name: 'StyleProvider', description: 'Provides custom theme variables' },
          { name: 'Themes', description: 'Theme management utilities' },
        ],
        i18n: [
          { name: 'Locale', description: 'Internationalization utilities' },
        ],
        services: [
          { name: 'Dialog', description: 'Programmatic dialog service' },
          { name: 'Snackbar', description: 'Programmatic snackbar service' },
          { name: 'Loading', description: 'Global loading service' },
          { name: 'LoadingBar', description: 'Global loading bar service' },
          { name: 'ImagePreview', description: 'Programmatic image preview service' },
          { name: 'ActionSheet', description: 'Programmatic action sheet service' },
        ],
        context: [
          { name: 'Context', description: 'Component context utilities' },
        ],
      }

      return {
        contents: [{
          type: 'text',
          text: JSON.stringify(utilities, null, 2),
        }],
      }
    },
  )

  server.resource(
    'varlet://examples/quick-start',
    'Quick start example for Varlet UI',
    'text/markdown',
    async () => {
      const quickStart = `# Varlet UI Quick Start

## Installation

\`\`\`bash
npm i @varlet/ui -S
\`\`\`

## Basic Usage

\`\`\`typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style.js'

const app = createApp(App)
app.use(Varlet)
app.mount('#app')
\`\`\`

## Component Example

\`\`\`vue
<template>
  <div class="app">
    <var-button type="primary" @click="showDialog">
      Click Me
    </var-button>
    
    <var-dialog v-model:show="show" title="Hello Varlet">
      Welcome to Varlet UI!
    </var-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(false)

const showDialog = () => {
  show.value = true
}
</script>
\`\`\`

## On-Demand Import

\`\`\`typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { Button, Dialog } from '@varlet/ui'
import '@varlet/ui/es/button/style/index.js'
import '@varlet/ui/es/dialog/style/index.js'

const app = createApp(App)
app.use(Button).use(Dialog)
app.mount('#app')
\`\`\`
`

      return {
        contents: [{
          type: 'text',
          text: quickStart,
        }],
      }
    },
  )
}
