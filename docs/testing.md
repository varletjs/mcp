# Testing Guide

## 🧪 Overview

This guide provides comprehensive information on testing strategies, frameworks, and best practices for Varlet MCP Server. It covers unit testing, integration testing, end-to-end testing, and performance testing.

## 📋 Table of Contents

- [Testing Philosophy](#testing-philosophy)
- [Testing Structure](#testing-structure)
- [Unit Testing](#unit-testing)
- [Integration Testing](#integration-testing)
- [End-to-End Testing](#end-to-end-testing)
- [Performance Testing](#performance-testing)
- [Test Data Management](#test-data-management)
- [Mocking and Stubbing](#mocking-and-stubbing)
- [Test Coverage](#test-coverage)
- [Continuous Integration](#continuous-integration)
- [Testing Best Practices](#testing-best-practices)

## 🎯 Testing Philosophy

### Testing Pyramid

```
        /\     E2E Tests (Few)
       /  \    • Full system tests
      /    \   • User journey tests
     /______\  • Critical path tests
    /        \
   /          \ Integration Tests (Some)
  /            \ • API integration
 /              \ • Service integration
/________________\ • Database integration

     Unit Tests (Many)
     • Function tests
     • Class tests
     • Module tests
```

### Testing Principles

1. **Fast Feedback**: Tests should run quickly to provide immediate feedback
2. **Reliable**: Tests should be deterministic and not flaky
3. **Maintainable**: Tests should be easy to understand and modify
4. **Comprehensive**: Tests should cover critical functionality
5. **Independent**: Tests should not depend on each other
6. **Realistic**: Tests should simulate real-world scenarios

## 🏗️ Testing Structure

### Directory Structure

```
tests/
├── unit/                    # Unit tests
│   ├── tools/              # Tool tests
│   │   ├── component/      # Component tool tests
│   │   ├── documentation/  # Documentation tool tests
│   │   ├── examples/       # Example tool tests
│   │   └── migration/      # Migration tool tests
│   ├── resources/          # Resource tests
│   ├── prompts/           # Prompt tests
│   ├── services/          # Service tests
│   │   ├── cache.test.ts  # Cache service tests
│   │   ├── config.test.ts # Config service tests
│   │   └── logger.test.ts # Logger service tests
│   └── utils/             # Utility tests
├── integration/           # Integration tests
│   ├── api/              # API integration tests
│   ├── mcp/              # MCP protocol tests
│   └── external/         # External service tests
├── e2e/                  # End-to-end tests
│   ├── scenarios/        # Test scenarios
│   ├── fixtures/         # Test fixtures
│   └── helpers/          # Test helpers
├── performance/          # Performance tests
│   ├── load/            # Load tests
│   ├── stress/          # Stress tests
│   └── benchmark/       # Benchmark tests
├── fixtures/            # Test data
│   ├── components/      # Component fixtures
│   ├── documentation/   # Documentation fixtures
│   └── responses/       # API response fixtures
├── helpers/             # Test utilities
│   ├── setup.ts        # Test setup
│   ├── teardown.ts     # Test teardown
│   ├── mocks.ts        # Mock factories
│   └── assertions.ts   # Custom assertions
└── config/             # Test configuration
    ├── jest.config.js  # Jest configuration
    ├── setup.ts       # Global setup
    └── teardown.ts    # Global teardown
```

### Test Configuration

```typescript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  transform: {
    '^.+\.ts$': 'ts-jest'
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/cli.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/tests/config/setup.ts'],
  globalTeardown: '<rootDir>/tests/config/teardown.ts',
  testTimeout: 30000,
  maxWorkers: '50%'
};
```

## 🔬 Unit Testing

### Tool Testing

```typescript
// tests/unit/tools/component/info.test.ts
import { ComponentInfoTool } from '../../../../src/tools/component/info';
import { MockCache } from '../../../helpers/mocks';
import { createMockLogger } from '../../../helpers/logger';

describe('ComponentInfoTool', () => {
  let tool: ComponentInfoTool;
  let mockCache: MockCache;
  let mockLogger: any;
  
  beforeEach(() => {
    mockCache = new MockCache();
    mockLogger = createMockLogger();
    tool = new ComponentInfoTool({
      cache: mockCache,
      logger: mockLogger
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  describe('handler', () => {
    it('should return component information for valid component', async () => {
      // Arrange
      const componentName = 'button';
      const expectedInfo = {
        name: 'button',
        description: 'A clickable button component',
        category: 'basic',
        version: '2.0.0'
      };
      
      mockCache.get.mockResolvedValue(null);
      mockCache.set.mockResolvedValue(undefined);
      
      // Mock API response
      jest.spyOn(tool as any, 'fetchComponentInfo')
        .mockResolvedValue(expectedInfo);
      
      // Act
      const result = await tool.handler({ name: componentName });
      
      // Assert
      expect(result).toEqual(expectedInfo);
      expect(mockCache.get).toHaveBeenCalledWith(
        `component:info:${componentName}`
      );
      expect(mockCache.set).toHaveBeenCalledWith(
        `component:info:${componentName}`,
        expectedInfo,
        expect.any(Number)
      );
    });
    
    it('should return cached data when available', async () => {
      // Arrange
      const componentName = 'button';
      const cachedInfo = {
        name: 'button',
        description: 'Cached button info',
        category: 'basic',
        version: '2.0.0'
      };
      
      mockCache.get.mockResolvedValue(cachedInfo);
      const fetchSpy = jest.spyOn(tool as any, 'fetchComponentInfo');
      
      // Act
      const result = await tool.handler({ name: componentName });
      
      // Assert
      expect(result).toEqual(cachedInfo);
      expect(fetchSpy).not.toHaveBeenCalled();
      expect(mockCache.set).not.toHaveBeenCalled();
    });
    
    it('should throw error for invalid component name', async () => {
      // Arrange
      const invalidName = 'invalid-component';
      mockCache.get.mockResolvedValue(null);
      
      jest.spyOn(tool as any, 'fetchComponentInfo')
        .mockRejectedValue(new Error('Component not found'));
      
      // Act & Assert
      await expect(tool.handler({ name: invalidName }))
        .rejects.toThrow('Component not found');
    });
    
    it('should validate input parameters', async () => {
      // Act & Assert
      await expect(tool.handler({})).rejects.toThrow('Component name is required');
      await expect(tool.handler({ name: '' })).rejects.toThrow('Component name cannot be empty');
      await expect(tool.handler({ name: 123 })).rejects.toThrow('Component name must be a string');
    });
  });
  
  describe('input validation', () => {
    it('should have correct input schema', () => {
      expect(tool.inputSchema).toEqual({
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Component name'
          }
        },
        required: ['name']
      });
    });
  });
});
```

### Service Testing

```typescript
// tests/unit/services/cache.test.ts
import { CacheManager } from '../../../src/services/cache';
import { promises as fs } from 'fs';
import path from 'path';

jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(),
    writeFile: jest.fn(),
    readFile: jest.fn(),
    unlink: jest.fn(),
    stat: jest.fn()
  }
}));

describe('CacheManager', () => {
  let cacheManager: CacheManager;
  let mockFs: jest.Mocked<typeof fs>;
  
  beforeEach(() => {
    mockFs = fs as jest.Mocked<typeof fs>;
    cacheManager = new CacheManager({
      directory: '/tmp/test-cache',
      maxSize: '100MB',
      ttl: 300000
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  describe('get', () => {
    it('should return cached value from memory', async () => {
      // Arrange
      const key = 'test-key';
      const value = { data: 'test-data' };
      
      // Set in memory cache first
      await cacheManager.set(key, value);
      
      // Act
      const result = await cacheManager.get(key);
      
      // Assert
      expect(result).toEqual(value);
      expect(mockFs.readFile).not.toHaveBeenCalled();
    });
    
    it('should return cached value from filesystem when not in memory', async () => {
      // Arrange
      const key = 'test-key';
      const value = { data: 'test-data' };
      const cacheEntry = {
        data: value,
        timestamp: Date.now(),
        ttl: 300000
      };
      
      mockFs.readFile.mockResolvedValue(JSON.stringify(cacheEntry));
      mockFs.stat.mockResolvedValue({ mtime: new Date() } as any);
      
      // Act
      const result = await cacheManager.get(key);
      
      // Assert
      expect(result).toEqual(value);
      expect(mockFs.readFile).toHaveBeenCalledWith(
        path.join('/tmp/test-cache', expect.stringContaining(key)),
        'utf-8'
      );
    });
    
    it('should return null for expired cache entries', async () => {
      // Arrange
      const key = 'test-key';
      const expiredEntry = {
        data: { data: 'test-data' },
        timestamp: Date.now() - 400000, // Expired
        ttl: 300000
      };
      
      mockFs.readFile.mockResolvedValue(JSON.stringify(expiredEntry));
      mockFs.unlink.mockResolvedValue(undefined);
      
      // Act
      const result = await cacheManager.get(key);
      
      // Assert
      expect(result).toBeNull();
      expect(mockFs.unlink).toHaveBeenCalled();
    });
  });
  
  describe('set', () => {
    it('should store value in both memory and filesystem', async () => {
      // Arrange
      const key = 'test-key';
      const value = { data: 'test-data' };
      
      mockFs.mkdir.mockResolvedValue(undefined);
      mockFs.writeFile.mockResolvedValue(undefined);
      
      // Act
      await cacheManager.set(key, value);
      
      // Assert
      expect(mockFs.mkdir).toHaveBeenCalled();
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        expect.stringContaining(key),
        expect.stringContaining(JSON.stringify(value)),
        'utf-8'
      );
    });
    
    it('should respect TTL when storing', async () => {
      // Arrange
      const key = 'test-key';
      const value = { data: 'test-data' };
      const customTTL = 600000;
      
      mockFs.mkdir.mockResolvedValue(undefined);
      mockFs.writeFile.mockResolvedValue(undefined);
      
      // Act
      await cacheManager.set(key, value, customTTL);
      
      // Assert
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining(`"ttl":${customTTL}`),
        'utf-8'
      );
    });
  });
  
  describe('delete', () => {
    it('should remove from both memory and filesystem', async () => {
      // Arrange
      const key = 'test-key';
      
      // Set first
      await cacheManager.set(key, { data: 'test' });
      
      mockFs.unlink.mockResolvedValue(undefined);
      
      // Act
      await cacheManager.delete(key);
      
      // Assert
      const result = await cacheManager.get(key);
      expect(result).toBeNull();
      expect(mockFs.unlink).toHaveBeenCalled();
    });
  });
});
```

### Utility Testing

```typescript
// tests/unit/utils/validation.test.ts
import { validateInput, sanitizeInput } from '../../../src/utils/validation';

describe('Validation Utils', () => {
  describe('validateInput', () => {
    const schema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number', minimum: 0 }
      },
      required: ['name']
    };
    
    it('should validate correct input', () => {
      const input = { name: 'John', age: 25 };
      const result = validateInput(schema, input);
      
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
    
    it('should reject invalid input', () => {
      const input = { age: -5 }; // Missing required name, invalid age
      const result = validateInput(schema, input);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(2);
      expect(result.errors[0]).toContain('name');
      expect(result.errors[1]).toContain('age');
    });
  });
  
  describe('sanitizeInput', () => {
    it('should remove dangerous characters', () => {
      const input = {
        name: '<script>alert("xss")</script>',
        description: 'Normal text'
      };
      
      const result = sanitizeInput(input);
      
      expect(result.name).not.toContain('<script>');
      expect(result.description).toBe('Normal text');
    });
    
    it('should handle nested objects', () => {
      const input = {
        user: {
          name: '<img src=x onerror=alert(1)>',
          profile: {
            bio: 'javascript:alert(1)'
          }
        }
      };
      
      const result = sanitizeInput(input);
      
      expect(result.user.name).not.toContain('<img');
      expect(result.user.profile.bio).not.toContain('javascript:');
    });
  });
});
```

## 🔗 Integration Testing

### MCP Protocol Testing

```typescript
// tests/integration/mcp/protocol.test.ts
import { MCPServer } from '../../../src/server';
import { createTestClient } from '../../helpers/mcp-client';

describe('MCP Protocol Integration', () => {
  let server: MCPServer;
  let client: any;
  
  beforeAll(async () => {
    server = new MCPServer({
      cache: { enabled: false }, // Disable cache for testing
      logging: { level: 'error' } // Reduce log noise
    });
    
    await server.initialize();
    client = createTestClient(server);
  });
  
  afterAll(async () => {
    await server.shutdown();
  });
  
  describe('Tool Execution', () => {
    it('should execute get_component_info tool', async () => {
      const response = await client.callTool('get_component_info', {
        name: 'button'
      });
      
      expect(response).toHaveProperty('content');
      expect(response.content[0]).toHaveProperty('type', 'text');
      expect(response.content[0].text).toContain('button');
    });
    
    it('should handle tool errors gracefully', async () => {
      const response = await client.callTool('get_component_info', {
        name: 'nonexistent-component'
      });
      
      expect(response).toHaveProperty('isError', true);
      expect(response.content[0].text).toContain('not found');
    });
    
    it('should validate tool input', async () => {
      const response = await client.callTool('get_component_info', {});
      
      expect(response).toHaveProperty('isError', true);
      expect(response.content[0].text).toContain('required');
    });
  });
  
  describe('Resource Access', () => {
    it('should list available resources', async () => {
      const response = await client.listResources();
      
      expect(response.resources).toBeInstanceOf(Array);
      expect(response.resources.length).toBeGreaterThan(0);
      
      const componentResource = response.resources.find(
        r => r.uri === 'varlet://components'
      );
      expect(componentResource).toBeDefined();
    });
    
    it('should read resource content', async () => {
      const response = await client.readResource('varlet://components');
      
      expect(response).toHaveProperty('contents');
      expect(response.contents[0]).toHaveProperty('uri', 'varlet://components');
      expect(response.contents[0]).toHaveProperty('mimeType', 'application/json');
    });
  });
  
  describe('Prompt Handling', () => {
    it('should list available prompts', async () => {
      const response = await client.listPrompts();
      
      expect(response.prompts).toBeInstanceOf(Array);
      expect(response.prompts.length).toBeGreaterThan(0);
      
      const usagePrompt = response.prompts.find(
        p => p.name === 'component_usage'
      );
      expect(usagePrompt).toBeDefined();
    });
    
    it('should get prompt content', async () => {
      const response = await client.getPrompt('component_usage', {
        component: 'button'
      });
      
      expect(response).toHaveProperty('messages');
      expect(response.messages).toBeInstanceOf(Array);
      expect(response.messages[0]).toHaveProperty('role');
      expect(response.messages[0]).toHaveProperty('content');
    });
  });
});
```

### API Integration Testing

```typescript
// tests/integration/api/github.test.ts
import { GitHubAPIClient } from '../../../src/services/api/github';
import { createMockServer } from '../../helpers/mock-server';

describe('GitHub API Integration', () => {
  let apiClient: GitHubAPIClient;
  let mockServer: any;
  
  beforeAll(async () => {
    mockServer = await createMockServer(3001);
    apiClient = new GitHubAPIClient({
      baseURL: 'http://localhost:3001',
      timeout: 5000
    });
  });
  
  afterAll(async () => {
    await mockServer.close();
  });
  
  beforeEach(() => {
    mockServer.reset();
  });
  
  describe('fetchComponentInfo', () => {
    it('should fetch component information successfully', async () => {
      // Arrange
      const componentData = {
        name: 'button',
        description: 'A button component',
        props: ['type', 'size', 'disabled']
      };
      
      mockServer.get('/repos/varletjs/varlet/contents/packages/varlet-ui/src/button/docs/en-US.md')
        .reply(200, {
          content: Buffer.from(JSON.stringify(componentData)).toString('base64')
        });
      
      // Act
      const result = await apiClient.fetchComponentInfo('button');
      
      // Assert
      expect(result).toEqual(componentData);
    });
    
    it('should handle API errors', async () => {
      // Arrange
      mockServer.get('/repos/varletjs/varlet/contents/packages/varlet-ui/src/button/docs/en-US.md')
        .reply(404, { message: 'Not Found' });
      
      // Act & Assert
      await expect(apiClient.fetchComponentInfo('button'))
        .rejects.toThrow('Component not found');
    });
    
    it('should handle rate limiting', async () => {
      // Arrange
      mockServer.get('/repos/varletjs/varlet/contents/packages/varlet-ui/src/button/docs/en-US.md')
        .reply(429, {
          message: 'API rate limit exceeded',
          documentation_url: 'https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting'
        });
      
      // Act & Assert
      await expect(apiClient.fetchComponentInfo('button'))
        .rejects.toThrow('Rate limit exceeded');
    });
  });
});
```

## 🎭 End-to-End Testing

### User Journey Testing

```typescript
// tests/e2e/scenarios/component-discovery.test.ts
import { MCPTestRunner } from '../../helpers/mcp-test-runner';

describe('Component Discovery Journey', () => {
  let testRunner: MCPTestRunner;
  
  beforeAll(async () => {
    testRunner = new MCPTestRunner();
    await testRunner.start();
  });
  
  afterAll(async () => {
    await testRunner.stop();
  });
  
  it('should complete full component discovery workflow', async () => {
    // Step 1: List all components
    const listResponse = await testRunner.callTool('list_components', {});
    expect(listResponse.content[0].text).toContain('button');
    
    // Step 2: Get component information
    const infoResponse = await testRunner.callTool('get_component_info', {
      name: 'button'
    });
    expect(infoResponse.content[0].text).toContain('description');
    
    // Step 3: Get component props
    const propsResponse = await testRunner.callTool('get_component_props', {
      name: 'button'
    });
    expect(propsResponse.content[0].text).toContain('type');
    
    // Step 4: Get component examples
    const examplesResponse = await testRunner.callTool('get_component_examples', {
      name: 'button'
    });
    expect(examplesResponse.content[0].text).toContain('<var-button>');
    
    // Step 5: Generate component template
    const templateResponse = await testRunner.callTool('generate_component_template', {
      name: 'button',
      framework: 'vue'
    });
    expect(templateResponse.content[0].text).toContain('<template>');
  });
  
  it('should handle error scenarios gracefully', async () => {
    // Test invalid component name
    const errorResponse = await testRunner.callTool('get_component_info', {
      name: 'invalid-component'
    });
    expect(errorResponse.isError).toBe(true);
    
    // Test missing required parameters
    const missingParamResponse = await testRunner.callTool('get_component_info', {});
    expect(missingParamResponse.isError).toBe(true);
  });
});
```

### Performance E2E Testing

```typescript
// tests/e2e/scenarios/performance.test.ts
import { MCPTestRunner } from '../../helpers/mcp-test-runner';
import { PerformanceMonitor } from '../../helpers/performance-monitor';

describe('Performance E2E Tests', () => {
  let testRunner: MCPTestRunner;
  let performanceMonitor: PerformanceMonitor;
  
  beforeAll(async () => {
    testRunner = new MCPTestRunner();
    performanceMonitor = new PerformanceMonitor();
    await testRunner.start();
  });
  
  afterAll(async () => {
    await testRunner.stop();
  });
  
  it('should handle concurrent requests efficiently', async () => {
    const startTime = Date.now();
    
    // Make 50 concurrent requests
    const promises = Array.from({ length: 50 }, (_, i) => 
      testRunner.callTool('get_component_info', {
        name: i % 2 === 0 ? 'button' : 'input'
      })
    );
    
    const results = await Promise.all(promises);
    const endTime = Date.now();
    
    // All requests should succeed
    expect(results.every(r => !r.isError)).toBe(true);
    
    // Should complete within reasonable time (5 seconds)
    expect(endTime - startTime).toBeLessThan(5000);
    
    // Memory usage should be reasonable
    const memoryUsage = process.memoryUsage();
    expect(memoryUsage.heapUsed).toBeLessThan(200 * 1024 * 1024); // 200MB
  });
  
  it('should maintain performance under sustained load', async () => {
    const monitor = performanceMonitor.start();
    
    // Run requests for 30 seconds
    const endTime = Date.now() + 30000;
    const results = [];
    
    while (Date.now() < endTime) {
      const result = await testRunner.callTool('list_components', {});
      results.push(result);
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const metrics = monitor.stop();
    
    // All requests should succeed
    expect(results.every(r => !r.isError)).toBe(true);
    
    // Average response time should be reasonable
    expect(metrics.averageResponseTime).toBeLessThan(100);
    
    // Memory should not grow excessively
    expect(metrics.memoryGrowth).toBeLessThan(50 * 1024 * 1024); // 50MB
  });
});
```

## ⚡ Performance Testing

### Load Testing

```typescript
// tests/performance/load/basic-load.test.ts
import { LoadTester } from '../../helpers/load-tester';
import { MCPTestRunner } from '../../helpers/mcp-test-runner';

describe('Load Testing', () => {
  let testRunner: MCPTestRunner;
  let loadTester: LoadTester;
  
  beforeAll(async () => {
    testRunner = new MCPTestRunner();
    loadTester = new LoadTester(testRunner);
    await testRunner.start();
  });
  
  afterAll(async () => {
    await testRunner.stop();
  });
  
  it('should handle 100 requests per second', async () => {
    const result = await loadTester.runTest({
      requestsPerSecond: 100,
      duration: 60, // 1 minute
      tool: 'get_component_info',
      args: { name: 'button' }
    });
    
    expect(result.successRate).toBeGreaterThan(0.95); // 95% success rate
    expect(result.averageResponseTime).toBeLessThan(100); // < 100ms
    expect(result.p95ResponseTime).toBeLessThan(200); // < 200ms for 95th percentile
  });
  
  it('should handle burst traffic', async () => {
    const result = await loadTester.runBurstTest({
      normalRPS: 50,
      burstRPS: 200,
      burstDuration: 10, // 10 seconds
      totalDuration: 60,
      tool: 'list_components',
      args: {}
    });
    
    expect(result.successRate).toBeGreaterThan(0.90); // 90% success rate during burst
    expect(result.averageResponseTime).toBeLessThan(150); // < 150ms average
  });
});
```

### Stress Testing

```typescript
// tests/performance/stress/memory-stress.test.ts
import { StressTester } from '../../helpers/stress-tester';
import { MCPTestRunner } from '../../helpers/mcp-test-runner';

describe('Stress Testing', () => {
  let testRunner: MCPTestRunner;
  let stressTester: StressTester;
  
  beforeAll(async () => {
    testRunner = new MCPTestRunner();
    stressTester = new StressTester(testRunner);
    await testRunner.start();
  });
  
  afterAll(async () => {
    await testRunner.stop();
  });
  
  it('should handle memory pressure gracefully', async () => {
    const result = await stressTester.runMemoryStressTest({
      targetMemoryUsage: 400 * 1024 * 1024, // 400MB
      duration: 300, // 5 minutes
      requestPattern: 'constant'
    });
    
    expect(result.memoryLeakDetected).toBe(false);
    expect(result.maxMemoryUsage).toBeLessThan(500 * 1024 * 1024); // < 500MB
    expect(result.gcPressure).toBeLessThan(0.1); // < 10% time in GC
  });
  
  it('should recover from resource exhaustion', async () => {
    const result = await stressTester.runResourceExhaustionTest({
      maxConcurrentRequests: 1000,
      rampUpTime: 60,
      sustainTime: 120,
      rampDownTime: 60
    });
    
    expect(result.recoveryTime).toBeLessThan(30); // < 30 seconds to recover
    expect(result.finalSuccessRate).toBeGreaterThan(0.95); // 95% success after recovery
  });
});
```

## 📊 Test Data Management

### Fixtures

```typescript
// tests/fixtures/components.ts
export const componentFixtures = {
  button: {
    name: 'button',
    description: 'A clickable button component',
    category: 'basic',
    version: '2.0.0',
    props: [
      {
        name: 'type',
        type: 'string',
        default: 'default',
        description: 'Button type'
      },
      {
        name: 'size',
        type: 'string',
        default: 'normal',
        description: 'Button size'
      }
    ],
    events: [
      {
        name: 'click',
        description: 'Triggered when button is clicked'
      }
    ],
    slots: [
      {
        name: 'default',
        description: 'Button content'
      }
    ]
  },
  
  input: {
    name: 'input',
    description: 'An input field component',
    category: 'form',
    version: '2.0.0',
    props: [
      {
        name: 'value',
        type: 'string',
        default: '',
        description: 'Input value'
      },
      {
        name: 'placeholder',
        type: 'string',
        default: '',
        description: 'Placeholder text'
      }
    ]
  }
};
```

### Test Data Factory

```typescript
// tests/helpers/data-factory.ts
import { faker } from '@faker-js/faker';

export class TestDataFactory {
  static createComponent(overrides: Partial<Component> = {}): Component {
    return {
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      category: faker.helpers.arrayElement(['basic', 'form', 'navigation', 'feedback']),
      version: faker.system.semver(),
      props: this.createProps(),
      events: this.createEvents(),
      slots: this.createSlots(),
      ...overrides
    };
  }
  
  static createProps(count: number = 3): ComponentProp[] {
    return Array.from({ length: count }, () => ({
      name: faker.lorem.word(),
      type: faker.helpers.arrayElement(['string', 'number', 'boolean', 'object']),
      default: faker.lorem.word(),
      description: faker.lorem.sentence()
    }));
  }
  
  static createAPIResponse<T>(data: T, overrides: Partial<APIResponse<T>> = {}): APIResponse<T> {
    return {
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      timestamp: Date.now(),
      ...overrides
    };
  }
}
```

## 🎭 Mocking and Stubbing

### Mock Factories

```typescript
// tests/helpers/mocks.ts
import { jest } from '@jest/globals';

export class MockCache {
  get = jest.fn();
  set = jest.fn();
  delete = jest.fn();
  clear = jest.fn();
  getStats = jest.fn().mockResolvedValue({
    hitRate: 0.85,
    missRate: 0.15,
    size: 1000
  });
}

export class MockLogger {
  info = jest.fn();
  warn = jest.fn();
  error = jest.fn();
  debug = jest.fn();
}

export class MockAPIClient {
  get = jest.fn();
  post = jest.fn();
  put = jest.fn();
  delete = jest.fn();
  
  // Helper to setup common responses
  setupComponentResponse(componentName: string, data: any) {
    this.get.mockImplementation((url: string) => {
      if (url.includes(componentName)) {
        return Promise.resolve({ data });
      }
      return Promise.reject(new Error('Not found'));
    });
  }
}

export function createMockLogger(): MockLogger {
  return new MockLogger();
}

export function createMockCache(): MockCache {
  return new MockCache();
}

export function createMockAPIClient(): MockAPIClient {
  return new MockAPIClient();
}
```

### Test Doubles

```typescript
// tests/helpers/test-doubles.ts
import { MCPServer } from '../../src/server';

export class TestMCPServer extends MCPServer {
  private mockResponses = new Map<string, any>();
  
  setMockResponse(toolName: string, response: any): void {
    this.mockResponses.set(toolName, response);
  }
  
  async callTool(name: string, args: any): Promise<any> {
    if (this.mockResponses.has(name)) {
      return this.mockResponses.get(name);
    }
    return super.callTool(name, args);
  }
}

export class SpyCache {
  private realCache: any;
  private calls: Array<{ method: string; args: any[]; timestamp: number }> = [];
  
  constructor(realCache: any) {
    this.realCache = realCache;
  }
  
  async get(key: string): Promise<any> {
    this.recordCall('get', [key]);
    return this.realCache.get(key);
  }
  
  async set(key: string, value: any, ttl?: number): Promise<void> {
    this.recordCall('set', [key, value, ttl]);
    return this.realCache.set(key, value, ttl);
  }
  
  getCalls(): Array<{ method: string; args: any[]; timestamp: number }> {
    return [...this.calls];
  }
  
  private recordCall(method: string, args: any[]): void {
    this.calls.push({
      method,
      args,
      timestamp: Date.now()
    });
  }
}
```

## 📈 Test Coverage

### Coverage Configuration

```typescript
// jest.config.js (coverage section)
module.exports = {
  // ... other config
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/cli.ts',
    '!src/**/__tests__/**',
    '!src/**/*.test.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'text-summary',
    'lcov',
    'html',
    'json'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    },
    './src/tools/': {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
    },
    './src/services/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
};
```

### Coverage Analysis

```typescript
// scripts/analyze-coverage.ts
import { readFileSync } from 'fs';
import path from 'path';

interface CoverageReport {
  total: CoverageSummary;
  [key: string]: CoverageSummary;
}

interface CoverageSummary {
  lines: { total: number; covered: number; pct: number };
  functions: { total: number; covered: number; pct: number };
  statements: { total: number; covered: number; pct: number };
  branches: { total: number; covered: number; pct: number };
}

class CoverageAnalyzer {
  analyzeCoverage(): void {
    const coverageFile = path.join(process.cwd(), 'coverage/coverage-summary.json');
    const coverage: CoverageReport = JSON.parse(readFileSync(coverageFile, 'utf-8'));
    
    console.log('\n📊 Coverage Analysis\n');
    
    // Overall coverage
    this.printCoverageSummary('Overall', coverage.total);
    
    // Find files with low coverage
    const lowCoverageFiles = this.findLowCoverageFiles(coverage);
    if (lowCoverageFiles.length > 0) {
      console.log('\n⚠️  Files with low coverage:');
      lowCoverageFiles.forEach(file => {
        console.log(`  ${file.path}: ${file.coverage}%`);
      });
    }
    
    // Find untested files
    const untestedFiles = this.findUntestedFiles(coverage);
    if (untestedFiles.length > 0) {
      console.log('\n❌ Untested files:');
      untestedFiles.forEach(file => console.log(`  ${file}`));
    }
  }
  
  private printCoverageSummary(name: string, summary: CoverageSummary): void {
    console.log(`${name}:`);
    console.log(`  Lines: ${summary.lines.pct}% (${summary.lines.covered}/${summary.lines.total})`);
    console.log(`  Functions: ${summary.functions.pct}% (${summary.functions.covered}/${summary.functions.total})`);
    console.log(`  Statements: ${summary.statements.pct}% (${summary.statements.covered}/${summary.statements.total})`);
    console.log(`  Branches: ${summary.branches.pct}% (${summary.branches.covered}/${summary.branches.total})`);
  }
  
  private findLowCoverageFiles(coverage: CoverageReport): Array<{ path: string; coverage: number }> {
    const threshold = 70;
    const files: Array<{ path: string; coverage: number }> = [];
    
    Object.entries(coverage).forEach(([path, summary]) => {
      if (path !== 'total' && summary.lines.pct < threshold) {
        files.push({ path, coverage: summary.lines.pct });
      }
    });
    
    return files.sort((a, b) => a.coverage - b.coverage);
  }
  
  private findUntestedFiles(coverage: CoverageReport): string[] {
    const files: string[] = [];
    
    Object.entries(coverage).forEach(([path, summary]) => {
      if (path !== 'total' && summary.lines.pct === 0) {
        files.push(path);
      }
    });
    
    return files;
  }
}

if (require.main === module) {
  new CoverageAnalyzer().analyzeCoverage();
}
```

## 🔄 Continuous Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'pnpm'
    
    - name: Install pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8
    
    - name: Install dependencies
      run: pnpm install --frozen-lockfile
    
    - name: Run linting
      run: pnpm lint
    
    - name: Run type checking
      run: pnpm type-check
    
    - name: Run unit tests
      run: pnpm test:unit --coverage
    
    - name: Run integration tests
      run: pnpm test:integration
    
    - name: Run e2e tests
      run: pnpm test:e2e
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
        flags: unittests
        name: codecov-umbrella
    
    - name: Comment coverage on PR
      if: github.event_name == 'pull_request'
      uses: romeovs/lcov-reporter-action@v0.3.1
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
        lcov-file: ./coverage/lcov.info
```

### Test Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:unit": "jest tests/unit",
    "test:integration": "jest tests/integration",
    "test:e2e": "jest tests/e2e",
    "test:performance": "jest tests/performance",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:coverage:open": "jest --coverage && open coverage/lcov-report/index.html",
    "test:debug": "node --inspect-brk node_modules/.bin/jest --runInBand",
    "test:ci": "jest --ci --coverage --watchAll=false"
  }
}
```

## 🎯 Testing Best Practices

### Test Organization

1. **Follow AAA Pattern**: Arrange, Act, Assert
2. **One Assertion Per Test**: Focus on single behavior
3. **Descriptive Test Names**: Clearly state what is being tested
4. **Test Edge Cases**: Include boundary conditions and error scenarios
5. **Independent Tests**: Tests should not depend on each other

### Test Quality

```typescript
// ✅ Good test
describe('ComponentInfoTool', () => {
  describe('when component exists', () => {
    it('should return component information with all required fields', async () => {
      // Arrange
      const componentName = 'button';
      const expectedInfo = createComponentInfo({ name: componentName });
      mockAPI.setupComponentResponse(componentName, expectedInfo);
      
      // Act
      const result = await tool.handler({ name: componentName });
      
      // Assert
      expect(result).toEqual(expectedInfo);
      expect(result).toHaveProperty('name', componentName);
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('props');
    });
  });
  
  describe('when component does not exist', () => {
    it('should throw ComponentNotFoundError', async () => {
      // Arrange
      const nonExistentComponent = 'non-existent';
      mockAPI.setupNotFoundResponse(nonExistentComponent);
      
      // Act & Assert
      await expect(tool.handler({ name: nonExistentComponent }))
        .rejects.toThrow(ComponentNotFoundError);
    });
  });
});

// ❌ Poor test
it('should work', async () => {
  const result = await tool.handler({ name: 'button' });
  expect(result).toBeTruthy();
});
```

### Performance Testing Guidelines

1. **Establish Baselines**: Measure current performance before optimization
2. **Test Realistic Scenarios**: Use production-like data and load patterns
3. **Monitor Resource Usage**: Track memory, CPU, and network usage
4. **Test Degradation Gracefully**: Ensure system handles overload well
5. **Automate Performance Tests**: Include in CI/CD pipeline

### Test Maintenance

1. **Regular Test Review**: Remove obsolete tests, update outdated ones
2. **Refactor Test Code**: Apply same quality standards as production code
3. **Update Test Data**: Keep fixtures and mocks current
4. **Monitor Test Performance**: Keep test suite execution time reasonable
5. **Document Test Scenarios**: Explain complex test setups and scenarios

---

## 📋 Testing Checklist

### Before Committing

- [ ] All tests pass locally
- [ ] New features have corresponding tests
- [ ] Test coverage meets minimum requirements
- [ ] No test warnings or deprecation notices
- [ ] Performance tests pass (if applicable)

### Before Releasing

- [ ] Full test suite passes in CI
- [ ] Integration tests pass with real APIs
- [ ] E2E tests cover critical user journeys
- [ ] Performance benchmarks meet targets
- [ ] Load tests demonstrate system stability
- [ ] Security tests pass (if applicable)

---

This testing guide provides a comprehensive framework for ensuring the quality and reliability of Varlet MCP Server. Regular testing and continuous improvement of test practices are essential for maintaining a robust and reliable system.