import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { cacheApi } from '#utils/api';

export interface VarletWebTypes {
  $schema: string;
  framework: 'vue' | string;
  name: string;
  version: string;
  contributions: {
    [key: string]: unknown;
    html: {
      'types-syntax': string;
      'description-markup': string;
      tags: VarletHtmlTag[];
      attributes?: VarletAttr[];
    };
  };
}

export interface VarletHtmlTag {
  [key: string]: unknown;
  name: string;
  source?: {
    module: string;
    symbol: string;
  };
  description?: string;
  'doc-url'?: string;
  attributes?: VarletAttr[];
  events?: VarletEvent[];
  slots?: VarletSlot[];
  'vue-model'?: {
    prop: string;
    event: string;
  };
}

export interface VarletAttr {
  name: string;
  description?: string;
  'doc-url'?: string;
  default?: unknown;
  value?: {
    kind: string;
    type?: string;
  };
}

export interface VarletEvent {
  name: string;
  description?: string;
  'doc-url'?: string;
  arguments?: {
    name?: string;
    type?: string;
  }[];
}

export interface VarletSlot {
  name: string;
  description?: string;
  'doc-url'?: string;
  'vue-properties'?: {
    name: string;
    type?: string;
  }[];
}

export async function registerApiTools(server: McpServer) {
  server.tool(
    'get_varlet_api_by_version',
    'Download and cache Varlet API types by version',
    {
      version: z
        .string()
        .default('latest')
        .describe(
          'The version of Varlet to retrieve API types for, e.g., "latest" or "3.0.0"'
        ),
    },
    async ({ version }) => {
      await cacheApi(version);

      server.sendResourceListChanged();

      return {
        content: [
          {
            type: 'text',
            text: `Downloaded and cached @varlet/ui@${version}`,
          },
        ],
      };
    }
  );

  server.tool(
    'get_component_api_by_version',
    'Return the API list for a Varlet component',
    {
      componentName: z
        .string()
        .describe(
          'The name of a Varlet component, available options: Button, Card, Cell, Dialog, Input, etc.'
        ),
      version: z
        .string()
        .default('latest')
        .describe(
          'The version of Varlet to retrieve API types for, e.g., "latest" or "3.0.0"'
        ),
    },
    async ({ componentName, version }) => {
      const api: VarletWebTypes = JSON.parse(await cacheApi(version));
      let target = componentName.replace('-', '').toLowerCase();

      if (!target.startsWith('var')) {
        target = `var-${target}`;
      }

      const tag = api.contributions.html.tags.find(
        tag => tag.name.toLowerCase() === target
      );

      if (!tag) {
        return {
          content: [
            {
              type: 'text',
              text: `Component "${target}" not found in Varlet version ${version}.`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(tag, null, 2),
          },
        ],
      };
    }
  );

  server.tool(
    'get_directive_api_by_version',
    'Return the API information for a Varlet directive',
    {
      directiveName: z
        .string()
        .describe(
          'The name of a Varlet directive, e.g., "v-ripple" or "ripple"'
        ),
      version: z
        .string()
        .default('latest')
        .describe(
          'The version of Varlet to retrieve API types for, e.g., "latest" or "3.0.0"'
        ),
    },
    async ({ directiveName, version }) => {
      const api: VarletWebTypes = JSON.parse(await cacheApi(version));

      let target = directiveName.toLowerCase();

      // Normalise directive naming to include leading "v-"
      if (!target.startsWith('v')) {
        target = `v-${target}`;
      } else if (!target.startsWith('v-')) {
        // Handles case where provided as "vripple" etc.
        target = target.replace(/^v/, 'v-');
      }

      const attr = api.contributions.html.attributes?.find(
        attr => attr.name.toLowerCase() === target
      );

      if (!attr) {
        return {
          content: [
            {
              type: 'text',
              text: `Directive "${target}" not found in Varlet version ${version}.`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(attr, null, 2),
          },
        ],
      };
    }
  );

  server.tool(
    'get_varlet_components_list',
    'Get a list of all available Varlet components',
    {
      version: z
        .string()
        .default('latest')
        .describe('The version of Varlet to retrieve components for'),
    },
    async ({ version }) => {
      const components = [
        'Button',
        'Card',
        'Cell',
        'Checkbox',
        'Dialog',
        'Divider',
        'Fab',
        'Form',
        'Icon',
        'Image',
        'Input',
        'List',
        'Loading',
        'Menu',
        'Overlay',
        'Picker',
        'Popup',
        'Progress',
        'Radio',
        'Rate',
        'Select',
        'Slider',
        'Snackbar',
        'Step',
        'Sticky',
        'Switch',
        'Tab',
        'Table',
        'Tooltip',
        'Uploader',
      ];

      return {
        content: [
          {
            type: 'text',
            text: `Available Varlet components (v${version}):\n\n${components.map(comp => `• var-${comp.toLowerCase()}`).join('\n')}`,
          },
        ],
      };
    }
  );
}
