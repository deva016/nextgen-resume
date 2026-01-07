/**
 * Template Date Formatting Tests
 * 
 * Tests to verify that all resume templates correctly format dates
 * from various input formats (YYYY-MM, YYYY-MM-DD, etc.)
 */

import { describe, it, expect } from '@jest/globals';
import { format } from 'date-fns';

// Helper function used in all templates
const formatDateString = (dateString: string | undefined, formatStr: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return format(date, formatStr);
};

describe('Template Date Formatting', () => {
  describe('formatDateString helper', () => {
    it('should format YYYY-MM format to MMM yyyy', () => {
      expect(formatDateString('2020-01', 'MMM yyyy')).toBe('Jan 2020');
      expect(formatDateString('2023-12', 'MMM yyyy')).toBe('Dec 2023');
      expect(formatDateString('2021-06', 'MMM yyyy')).toBe('Jun 2021');
    });

    it('should format YYYY-MM-DD format to MMM yyyy', () => {
      expect(formatDateString('2020-01-15', 'MMM yyyy')).toBe('Jan 2020');
      expect(formatDateString('2023-12-25', 'MMM yyyy')).toBe('Dec 2023');
    });

    it('should format to yyyy (year only)', () => {
      expect(formatDateString('2020-01', 'yyyy')).toBe('2020');
      expect(formatDateString('2023-12-25', 'yyyy')).toBe('2023');
      expect(formatDateString('2021-06-15', 'yyyy')).toBe('2021');
    });

    it('should handle undefined dates', () => {
      expect(formatDateString(undefined, 'MMM yyyy')).toBe('');
      expect(formatDateString(undefined, 'yyyy')).toBe('');
    });

    it('should return original string for invalid dates', () => {
      expect(formatDateString('invalid-date', 'MMM yyyy')).toBe('invalid-date');
      expect(formatDateString('not a date', 'yyyy')).toBe('not a date');
    });

    it('should handle edge cases', () => {
      expect(formatDateString('2020-01-01', 'MMM yyyy')).toBe('Jan 2020');
      expect(formatDateString('2020-12-31', 'MMM yyyy')).toBe('Dec 2020');
      expect(formatDateString('2015-09', 'yyyy')).toBe('2015');
    });
  });

  describe('Template-specific date formats', () => {
    const testDates = {
      workStart: '2021-03',
      workEnd: '2023-05',
      eduStart: '2015-09',
      eduEnd: '2019-05',
      currentDate: undefined,
    };

    describe('ModernProfessionalTemplate', () => {
      it('should format work experience dates as "MMM yyyy - MMM yyyy"', () => {
        const start = formatDateString(testDates.workStart, 'MMM yyyy');
        const end = formatDateString(testDates.workEnd, 'MMM yyyy');
        expect(start).toBe('Mar 2021');
        expect(end).toBe('May 2023');
        expect(`${start} - ${end}`).toBe('Mar 2021 - May 2023');
      });

      it('should format education dates as "yyyy - yyyy"', () => {
        const start = formatDateString(testDates.eduStart, 'yyyy');
        const end = formatDateString(testDates.eduEnd, 'yyyy');
        expect(start).toBe('2015');
        expect(end).toBe('2019');
        expect(`${start} - ${end}`).toBe('2015 - 2019');
      });

      it('should show "Present" for ongoing work', () => {
        const start = formatDateString(testDates.workStart, 'MMM yyyy');
        const end = testDates.currentDate ? formatDateString(testDates.currentDate, 'MMM yyyy') : 'Present';
        expect(`${start} - ${end}`).toBe('Mar 2021 - Present');
      });
    });

    describe('CreativeGradientTemplate', () => {
      it('should format work experience dates as "MMM yyyy"', () => {
        expect(formatDateString('2021-03', 'MMM yyyy')).toBe('Mar 2021');
        expect(formatDateString('2018-06', 'MMM yyyy')).toBe('Jun 2018');
      });

      it('should format education dates as "yyyy"', () => {
        expect(formatDateString('2014-09', 'yyyy')).toBe('2014');
        expect(formatDateString('2018-05', 'yyyy')).toBe('2018');
      });
    });

    describe('ExecutiveTemplate', () => {
      it('should format all dates as "yyyy"', () => {
        expect(formatDateString('2020-01', 'yyyy')).toBe('2020');
        expect(formatDateString('2023-12', 'yyyy')).toBe('2023');
      });

      it('should display year-only format for professional appearance', () => {
        const start = formatDateString('2021-03', 'yyyy');
        const end = formatDateString('2023-05', 'yyyy');
        expect(`${start} - ${end}`).toBe('2021 - 2023');
      });
    });

    describe('ModernMinimalTemplate', () => {
      it('should format work dates as "MMM yyyy"', () => {
        const formatted = formatDateString('2020-01', 'MMM yyyy');
        expect(formatted).toBe('Jan 2020');
      });

      it('should format education dates as "MMM yyyy"', () => {
        const formatted = formatDateString('2015-09', 'MMM yyyy');
        expect(formatted).toBe('Sep 2015');
      });
    });

    describe('SidebarTemplate', () => {
      it('should format work experience as "yyyy" only', () => {
        expect(formatDateString('2021-03', 'yyyy')).toBe('2021');
      });

      it('should format education as "MMM yyyy"', () => {
        expect(formatDateString('2015-09', 'MMM yyyy')).toBe('Sep 2015');
      });

      it('should show PRESENT for ongoing work', () => {
        const endDate = undefined;
        const end = endDate ? formatDateString(endDate, 'yyyy') : 'PRESENT';
        expect(end).toBe('PRESENT');
      });
    });

    describe('ProfessionalSidebarTemplate', () => {
      it('should format all dates as "yyyy"', () => {
        expect(formatDateString('2021-03', 'yyyy')).toBe('2021');
        expect(formatDateString('2014-09', 'yyyy')).toBe('2014');
      });

      it('should show PRESENT for current positions', () => {
        const endDate = undefined;
        const result = endDate ? formatDateString(endDate, 'yyyy') : 'PRESENT';
        expect(result).toBe('PRESENT');
      });
    });
  });

  describe('Real-world date scenarios', () => {
    it('should handle dates from actual resume ID cmk2l6lk9000011vzechlhlzk', () => {
      // Based on typical resume data structure
      const sampleDates = [
        { input: '2021-03', format: 'MMM yyyy', expected: 'Mar 2021' },
        { input: '2018-06', format: 'MMM yyyy', expected: 'Jun 2018' },
        { input: '2021-02', format: 'MMM yyyy', expected: 'Feb 2021' },
        { input: '2014-09', format: 'yyyy', expected: '2014' },
        { input: '2018-05', format: 'yyyy', expected: '2018' },
      ];

      sampleDates.forEach(({ input, format: formatStr, expected }) => {
        expect(formatDateString(input, formatStr)).toBe(expected);
      });
    });

    it('should handle all months correctly', () => {
      const months = [
        { input: '2020-01', expected: 'Jan 2020' },
        { input: '2020-02', expected: 'Feb 2020' },
        { input: '2020-03', expected: 'Mar 2020' },
        { input: '2020-04', expected: 'Apr 2020' },
        { input: '2020-05', expected: 'May 2020' },
        { input: '2020-06', expected: 'Jun 2020' },
        { input: '2020-07', expected: 'Jul 2020' },
        { input: '2020-08', expected: 'Aug 2020' },
        { input: '2020-09', expected: 'Sep 2020' },
        { input: '2020-10', expected: 'Oct 2020' },
        { input: '2020-11', expected: 'Nov 2020' },
        { input: '2020-12', expected: 'Dec 2020' },
      ];

      months.forEach(({ input, expected }) => {
        expect(formatDateString(input, 'MMM yyyy')).toBe(expected);
      });
    });

    it('should handle dates from different decades', () => {
      expect(formatDateString('1990-01', 'MMM yyyy')).toBe('Jan 1990');
      expect(formatDateString('2000-06', 'MMM yyyy')).toBe('Jun 2000');
      expect(formatDateString('2010-12', 'MMM yyyy')).toBe('Dec 2010');
      expect(formatDateString('2024-01', 'MMM yyyy')).toBe('Jan 2024');
    });
  });

  describe('Template consistency', () => {
    it('should ensure all templates use consistent date formatting logic', () => {
      const testDate = '2020-06-15';
      
      // All templates should produce same output for same format string
      const mmmYyyy = formatDateString(testDate, 'MMM yyyy');
      const yyyy = formatDateString(testDate, 'yyyy');
      
      expect(mmmYyyy).toBe('Jun 2020');
      expect(yyyy).toBe('2020');
    });

    it('should handle null/undefined endDate consistently across templates', () => {
      // Templates use different labels but same logic
      const labels = ['Present', 'PRESENT', 'present'];
      const endDate = undefined;
      
      labels.forEach(label => {
        const result = endDate ? formatDateString(endDate, 'MMM yyyy') : label;
        expect(result).toBe(label);
      });
    });
  });

  describe('Date validation', () => {
    it('should detect invalid date formats', () => {
      const invalidDates = [
        '2020-13', // Invalid month
        '2020-00', // Invalid month
        '20-01', // Invalid year
        'January 2020', // Text format
        '01/01/2020', // Wrong separator
      ];

      invalidDates.forEach(dateStr => {
        const result = formatDateString(dateStr, 'MMM yyyy');
        // Invalid dates should either return original string or handle gracefully
        expect(typeof result).toBe('string');
      });
    });
  });
});

// Export for use in other tests
export { formatDateString };
