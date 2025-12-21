import { cn } from '../utils';

describe('Utils', () => {
  describe('cn (class name merger)', () => {
    it('should merge class names correctly', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const isDisabled = false;
      expect(cn('base', isActive && 'active', isDisabled && 'disabled')).toBe('base active');
    });

    it('should merge conflicting tailwind classes', () => {
      expect(cn('p-2', 'p-4')).toBe('p-4');
    });

    it('should handle empty inputs', () => {
      expect(cn()).toBe('');
    });

    it('should handle undefined and null', () => {
      expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
    });

    it('should handle array of classes', () => {
      expect(cn(['foo', 'bar'])).toBe('foo bar');
    });

    it('should merge complex tailwind classes', () => {
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    });

    it('should handle object syntax', () => {
      expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
    });
  });
});
