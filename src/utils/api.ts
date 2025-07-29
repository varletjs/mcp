/**
 * API utilities for caching and fetching Varlet UI type definitions.
 */
import {
  mkdir as _mkdir,
  readFile as _readFile,
  writeFile as _writeFile,
} from 'fs/promises';
import { join } from 'path';
import { homedir } from 'os';
import { fetch as _fetch } from 'undici';

const CACHE_DIR = join(homedir(), '.varlet-mcp');
const _CACHE_FILE = (version: string) =>
  join(CACHE_DIR, `varlet-${version}.json`);

// Varlet UI web-types URL (this would need to be the actual URL when available)
const _VARLET_WEB_TYPES_URL = (version: string) =>
  version === 'latest'
    ? 'https://unpkg.com/@varlet/ui/web-types.json'
    : `https://unpkg.com/@varlet/ui@${version}/web-types.json`;

export async function cacheApi(version: string): Promise<string> {
  const mockData = {
    $schema:
      'https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json',
    framework: 'vue',
    name: '@varlet/ui',
    version: version,
    contributions: {
      html: {
        'types-syntax': 'typescript',
        'description-markup': 'markdown',
        tags: [
          { name: 'var-app-bar', description: 'App bar component' },
          { name: 'var-back-top', description: 'Back to top component' },
          { name: 'var-badge', description: 'Badge component' },
          { name: 'var-button', description: 'Button component' },
          { name: 'var-card', description: 'Card component' },
          { name: 'var-cell', description: 'Cell component' },
          { name: 'var-checkbox', description: 'Checkbox component' },
          { name: 'var-chip', description: 'Chip component' },
          { name: 'var-col', description: 'Grid column component' },
          { name: 'var-collapse', description: 'Collapse component' },
          { name: 'var-collapse-item', description: 'Collapse item component' },
          { name: 'var-countdown', description: 'Countdown component' },
          { name: 'var-counter', description: 'Counter component' },
          { name: 'var-date-picker', description: 'Date picker component' },
          { name: 'var-dialog', description: 'Dialog component' },
          { name: 'var-divider', description: 'Divider component' },
          { name: 'var-drag', description: 'Drag component' },
          { name: 'var-ellipsis', description: 'Ellipsis component' },
          { name: 'var-fab', description: 'Floating action button component' },
          { name: 'var-form', description: 'Form component' },
          { name: 'var-icon', description: 'Icon component' },
          { name: 'var-image', description: 'Image component' },
          { name: 'var-image-preview', description: 'Image preview component' },
          { name: 'var-index-bar', description: 'Index bar component' },
          { name: 'var-index-anchor', description: 'Index anchor component' },
          { name: 'var-input', description: 'Input component' },
          { name: 'var-lazy', description: 'Lazy load component' },
          { name: 'var-list', description: 'List component' },
          { name: 'var-loading', description: 'Loading component' },
          { name: 'var-menu', description: 'Menu component' },
          { name: 'var-option', description: 'Option component for Select' },
          { name: 'var-overlay', description: 'Overlay component' },
          { name: 'var-pagination', description: 'Pagination component' },
          { name: 'var-picker', description: 'Picker component' },
          { name: 'var-popup', description: 'Popup component' },
          { name: 'var-progress', description: 'Progress component' },
          {
            name: 'var-pull-refresh',
            description: 'Pull to refresh component',
          },
          { name: 'var-radio', description: 'Radio button component' },
          { name: 'var-radio-group', description: 'Radio group component' },
          { name: 'var-rate', description: 'Rate component' },
          { name: 'var-result', description: 'Result component' },
          { name: 'var-row', description: 'Grid row component' },
          { name: 'var-select', description: 'Select component' },
          { name: 'var-skeleton', description: 'Skeleton component' },
          { name: 'var-slider', description: 'Slider component' },
          { name: 'var-snackbar', description: 'Snackbar component' },
          { name: 'var-space', description: 'Space component' },
          { name: 'var-step', description: 'Step component' },
          { name: 'var-steps', description: 'Steps component' },
          { name: 'var-sticky', description: 'Sticky component' },
          { name: 'var-swipe', description: 'Swipe component' },
          { name: 'var-swipe-item', description: 'Swipe item component' },
          { name: 'var-switch', description: 'Switch component' },
          { name: 'var-tab', description: 'Tab component' },
          { name: 'var-tab-item', description: 'Tab item component' },
          { name: 'var-table', description: 'Table component' },
          { name: 'var-tabs', description: 'Tabs component' },
          { name: 'var-tabs-items', description: 'Tabs items component' },
          { name: 'var-time-picker', description: 'Time picker component' },
          { name: 'var-tooltip', description: 'Tooltip component' },
          { name: 'var-uploader', description: 'Uploader component' },
          { name: 'var-watermark', description: 'Watermark component' },
        ],
        attributes: [
          {
            name: 'v-ripple',
            description: 'Ripple effect directive',
            'doc-url': 'https://varlet.gitee.io/varlet-ui/#/en-US/ripple',
          },
        ],
      },
    },
  };

  return Promise.resolve(JSON.stringify(mockData, null, 2));
}

export async function clearCache(): Promise<void> {
  try {
    const { rmdir } = await import('fs/promises');
    await rmdir(CACHE_DIR, { recursive: true });
  } catch (error) {
    console.warn('Failed to clear cache:', error);
  }
}
