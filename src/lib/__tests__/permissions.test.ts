import {
  canCreateResume,
  canUseAITools,
  canUseCustomizations,
} from '../permissions';

describe('Permissions', () => {
  describe('canCreateResume', () => {
    it('should always return true (unlimited resumes for all users)', () => {
      expect(canCreateResume()).toBe(true);
    });
  });

  describe('canUseAITools', () => {
    it('should always return true (AI tools available to all users)', () => {
      expect(canUseAITools()).toBe(true);
    });
  });

  describe('canUseCustomizations', () => {
    it('should always return true (customizations available to all users)', () => {
      expect(canUseCustomizations()).toBe(true);
    });
  });
});
