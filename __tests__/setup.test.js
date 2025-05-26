// Basic sanity check test to verify Jest is working
describe('Jest Setup', () => {
  test('should be able to run basic tests', () => {
    expect(true).toBe(true);
  });

  test('should handle basic assertions', () => {
    expect(2 + 2).toBe(4);
    expect('hello').toMatch(/ello/);
    expect(['apple', 'banana', 'cherry']).toContain('banana');
  });

  test('should handle async operations', async () => {
    const promise = Promise.resolve('test data');
    await expect(promise).resolves.toBe('test data');
  });
});
