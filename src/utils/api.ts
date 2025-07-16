/**
 * API utilities for caching and fetching Varlet UI type definitions.
 */
import { readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { homedir } from 'os'

const CACHE_DIR = join(homedir(), '.varlet-mcp')
const CACHE_FILE = (version: string) => join(CACHE_DIR, `varlet-${version}.json`)

// Varlet UI web-types URL (this would need to be the actual URL when available)
const VARLET_WEB_TYPES_URL = (version: string) => 
  version === 'latest' 
    ? 'https://unpkg.com/@varlet/ui/web-types.json'
    : `https://unpkg.com/@varlet/ui@${version}/web-types.json`

export async function cacheApi(version: string): Promise<string> {
  const cacheFile = CACHE_FILE(version)
  
  try {
    // Try to read from cache first
    const cached = await readFile(cacheFile, 'utf-8')
    return cached
  } catch {
    // Cache miss, fetch from remote
    try {
      const response = await fetch(VARLET_WEB_TYPES_URL(version))
      
      if (!response.ok) {
        throw new Error(`Failed to fetch Varlet UI types: ${response.statusText}`)
      }
      
      const data = await response.text()
      
      // Ensure cache directory exists
      await mkdir(CACHE_DIR, { recursive: true })
      
      // Cache the response
      await writeFile(cacheFile, data, 'utf-8')
      
      return data
    } catch (error) {
      // If fetching fails, return a mock structure for development
      console.warn(`Failed to fetch Varlet UI types for version ${version}:`, error)
      
      const mockData = {
        $schema: 'https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json',
        framework: 'vue',
        name: '@varlet/ui',
        version: version,
        contributions: {
          html: {
            'types-syntax': 'typescript',
            'description-markup': 'markdown',
            tags: [
              {
                name: 'var-button',
                description: 'Button component for user interactions',
                'doc-url': 'https://varlet.gitee.io/varlet-ui/#/en-US/button',
                attributes: [
                  {
                    name: 'type',
                    description: 'Button type',
                    default: 'default',
                    value: {
                      kind: 'enum',
                      type: 'string'
                    }
                  },
                  {
                    name: 'size',
                    description: 'Button size',
                    default: 'normal',
                    value: {
                      kind: 'enum',
                      type: 'string'
                    }
                  },
                  {
                    name: 'disabled',
                    description: 'Whether the button is disabled',
                    default: false,
                    value: {
                      kind: 'boolean',
                      type: 'boolean'
                    }
                  }
                ],
                events: [
                  {
                    name: 'click',
                    description: 'Triggered when button is clicked',
                    arguments: [
                      {
                        name: 'event',
                        type: 'MouseEvent'
                      }
                    ]
                  }
                ]
              },
              {
                name: 'var-card',
                description: 'Card component for displaying content',
                'doc-url': 'https://varlet.gitee.io/varlet-ui/#/en-US/card',
                attributes: [
                  {
                    name: 'title',
                    description: 'Card title',
                    value: {
                      kind: 'string',
                      type: 'string'
                    }
                  },
                  {
                    name: 'subtitle',
                    description: 'Card subtitle',
                    value: {
                      kind: 'string',
                      type: 'string'
                    }
                  }
                ],
                slots: [
                  {
                    name: 'default',
                    description: 'Card content'
                  },
                  {
                    name: 'title',
                    description: 'Custom title content'
                  }
                ]
              },
              {
                name: 'var-input',
                description: 'Input component for user text input',
                'doc-url': 'https://varlet.gitee.io/varlet-ui/#/en-US/input',
                attributes: [
                  {
                    name: 'v-model',
                    description: 'Input value',
                    value: {
                      kind: 'string',
                      type: 'string'
                    }
                  },
                  {
                    name: 'placeholder',
                    description: 'Input placeholder text',
                    value: {
                      kind: 'string',
                      type: 'string'
                    }
                  },
                  {
                    name: 'disabled',
                    description: 'Whether the input is disabled',
                    default: false,
                    value: {
                      kind: 'boolean',
                      type: 'boolean'
                    }
                  }
                ],
                'vue-model': {
                  prop: 'value',
                  event: 'input'
                }
              }
            ],
            attributes: [
              {
                name: 'v-ripple',
                description: 'Ripple effect directive',
                'doc-url': 'https://varlet.gitee.io/varlet-ui/#/en-US/ripple'
              }
            ]
          }
        }
      }
      
      const mockDataString = JSON.stringify(mockData, null, 2)
      
      // Cache the mock data
      try {
        await mkdir(CACHE_DIR, { recursive: true })
        await writeFile(cacheFile, mockDataString, 'utf-8')
      } catch (cacheError) {
        console.warn('Failed to cache mock data:', cacheError)
      }
      
      return mockDataString
    }
  }
}

export async function clearCache(): Promise<void> {
  try {
    const { rmdir } = await import('fs/promises')
    await rmdir(CACHE_DIR, { recursive: true })
  } catch (error) {
    console.warn('Failed to clear cache:', error)
  }
}
