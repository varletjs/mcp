/**
 * Registers tools for documentation-related features.
 *
 * Includes functionality to fetch installation guides and other documentation.
 */
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import {
  AVAILABLE_FEATURES,
  createDocumentationService,
  INSTALLATION_PLATFORMS,
  type InstallationPlatform,
  type AvailableFeature,
} from '#services/documentation';

export async function registerDocumentationTools(server: McpServer) {
  const platforms = Object.keys(INSTALLATION_PLATFORMS) as [
    InstallationPlatform,
    ...InstallationPlatform[],
  ];
  const features = Object.keys(AVAILABLE_FEATURES) as [
    AvailableFeature,
    ...AvailableFeature[],
  ];

  const documentation = createDocumentationService();

  server.tool(
    'get_installation_guide',
    '获取如何在各种环境中安装 Varlet 的详细信息。',
    {
      platform: z
        .enum(platforms)
        .default('vite')
        .describe(`获取安装指南的平台。可用平台: ${platforms.join(', ')}`),
      ssr: z.boolean().default(false).describe('是否返回 SSR 版本的安装指南。'),
      fresh: z
        .boolean()
        .default(false)
        .describe('用户是已有项目还是从零开始。'),
    },
    async args => {
      const result = await documentation.getInstallationGuide(args);
      return {
        content: result.contents.map(item => ({
          type: 'text' as const,
          text: item.text,
        })),
      };
    }
  );

  server.tool(
    'get_feature_guides',
    '获取文档中可用功能的列表。',
    {},
    async () => {
      const result = await documentation.getFeatureGuides();
      return {
        content: result.contents.map(item => ({
          type: 'text' as const,
          text: item.text,
        })),
      };
    }
  );

  server.tool(
    'get_feature_guide',
    '获取文档中特定功能的信息。',
    {
      feature: z
        .enum(features)
        .describe(`获取文档的功能。可用功能: ${features.join(', ')}`),
    },
    async args => {
      const result = await documentation.getFeatureGuide(args);
      return {
        content: result.contents.map(item => ({
          type: 'text' as const,
          text: item.text,
        })),
      };
    }
  );

  server.tool(
    'get_varlet_exports',
    '从 @varlet/ui npm 包中获取导出列表',
    {},
    async () => {
      const result = await documentation.getVarletExports();
      return {
        content: result.contents.map(item => ({
          type: 'text' as const,
          text: item.text,
        })),
      };
    }
  );

  server.tool(
    'get_frequently_asked_questions',
    '获取有关 Varlet 的常见问题列表。',
    {},
    async () => {
      const result = await documentation.getFrequentlyAskedQuestions();
      return {
        content: result.contents.map(item => ({
          type: 'text' as const,
          text: item.text,
        })),
      };
    }
  );

  server.tool(
    'get_release_notes_by_version',
    '获取一个或多个 Varlet 版本的发行说明。',
    {
      version: z
        .string()
        .describe('获取发行说明的一个或多个 Varlet 版本。')
        .default('latest'),
    },
    async args => {
      const result = await documentation.getReleaseNotesByVersion(args);
      return {
        content: result.contents.map(item => ({
          type: 'text' as const,
          text: item.text,
        })),
      };
    }
  );

  server.tool(
    'get_varlet_playground_examples',
    '获取 Varlet 组件的示例代码和 Playground 链接。',
    {
      component: z.string().describe('要获取示例的组件名称').optional(),
    },
    async args => {
      const result = await documentation.getPlaygroundExamples(args);
      return {
        content: result.contents.map(item => ({
          type: 'text' as const,
          text: item.text,
        })),
      };
    }
  );
}
