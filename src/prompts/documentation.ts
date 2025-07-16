/**
 * Documentation-related prompts for Varlet UI.
 */
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

export async function registerDocumentationPrompts (server: McpServer) {
  server.prompt(
    'varlet_component_usage',
    'Generate usage examples and best practices for a Varlet UI component',
    {
      componentName: z.string().describe('The name of the Varlet component (e.g., Button, Card, Input)'),
      useCase: z.string().optional().describe('Specific use case or scenario for the component'),
    },
    async ({ componentName, useCase }) => {
      const useCaseText = useCase ? ` for ${useCase}` : ''
      
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Please provide comprehensive usage examples and best practices for the Varlet UI ${componentName} component${useCaseText}. Include:

1. Basic usage example
2. Common props and their purposes
3. Event handling
4. Styling and theming options
5. Accessibility considerations
6. Common patterns and best practices
7. Integration with forms (if applicable)

Format the response with clear code examples and explanations.`,
            },
          },
        ],
      }
    },
  )

  server.prompt(
    'varlet_layout_design',
    'Generate layout design suggestions using Varlet UI components',
    {
      layoutType: z.enum(['dashboard', 'form', 'list', 'card-grid', 'navigation', 'mobile-app']).describe('Type of layout to design'),
      requirements: z.string().optional().describe('Specific requirements or features needed'),
    },
    async ({ layoutType, requirements }) => {
      const requirementsText = requirements ? `\n\nSpecific requirements: ${requirements}` : ''
      
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Design a ${layoutType} layout using Varlet UI components. Please provide:

1. Overall layout structure and component hierarchy
2. Recommended Varlet UI components for this layout
3. Complete Vue.js code example
4. Responsive design considerations
5. Accessibility best practices
6. Performance optimization tips
7. Styling and theming suggestions${requirementsText}

Ensure the design follows modern UI/UX principles and Varlet UI design guidelines.`,
            },
          },
        ],
      }
    },
  )

  server.prompt(
    'varlet_migration_guide',
    'Generate migration guide from other UI libraries to Varlet UI',
    {
      fromLibrary: z.enum(['vuetify', 'element-plus', 'ant-design-vue', 'quasar', 'naive-ui']).describe('The UI library to migrate from'),
      components: z.string().optional().describe('Specific components to focus on (comma-separated)'),
    },
    async ({ fromLibrary, components }) => {
      const componentsText = components ? ` focusing on these components: ${components}` : ''
      
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Create a comprehensive migration guide from ${fromLibrary} to Varlet UI${componentsText}. Include:

1. Key differences between the libraries
2. Component mapping (${fromLibrary} → Varlet UI)
3. Props and API changes
4. Styling and theming migration
5. Breaking changes to watch out for
6. Step-by-step migration process
7. Code examples showing before/after
8. Common pitfalls and solutions
9. Performance considerations
10. Timeline and effort estimation

Provide practical, actionable guidance for developers making this transition.`,
            },
          },
        ],
      }
    },
  )

  server.prompt(
    'varlet_troubleshooting',
    'Generate troubleshooting guide for common Varlet UI issues',
    {
      issueCategory: z.enum(['installation', 'styling', 'components', 'build', 'ssr', 'typescript']).describe('Category of issues to troubleshoot'),
      specificIssue: z.string().optional().describe('Specific issue or error message'),
    },
    async ({ issueCategory, specificIssue }) => {
      const specificText = specificIssue ? `\n\nSpecific issue: ${specificIssue}` : ''
      
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Provide a comprehensive troubleshooting guide for ${issueCategory} issues with Varlet UI. Include:

1. Common problems in this category
2. Step-by-step diagnostic process
3. Solutions with code examples
4. Prevention strategies
5. When to seek additional help
6. Useful debugging tools and techniques
7. Community resources and documentation links${specificText}

Format as a practical troubleshooting checklist that developers can follow.`,
            },
          },
        ],
      }
    },
  )

  server.prompt(
    'varlet_performance_optimization',
    'Generate performance optimization guide for Varlet UI applications',
    {
      appType: z.enum(['spa', 'ssr', 'mobile', 'desktop', 'pwa']).describe('Type of application'),
      focusArea: z.enum(['bundle-size', 'runtime', 'loading', 'memory', 'all']).describe('Performance area to focus on'),
    },
    async ({ appType, focusArea }) => {
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Create a performance optimization guide for ${appType} applications using Varlet UI, focusing on ${focusArea === 'all' ? 'all performance aspects' : focusArea}. Include:

1. Performance analysis and measurement techniques
2. Bundle size optimization strategies
3. Runtime performance improvements
4. Loading performance enhancements
5. Memory usage optimization
6. Component-specific optimizations
7. Build configuration recommendations
8. Monitoring and profiling tools
9. Performance budgets and metrics
10. Real-world optimization examples

Provide actionable recommendations with measurable impact on application performance.`,
            },
          },
        ],
      }
    },
  )
}
