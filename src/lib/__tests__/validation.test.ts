import {
  optionalString,
  generalInfoSchema,
  workExperienceSchema,
  educationSchema,
  skillsSchema,
  summarySchema,
  generateWorkExperienceSchema,
  generateSummarySchema,
} from '../validation';

describe('Validation Schemas', () => {
  describe('optionalString', () => {
    it('should accept valid string', () => {
      expect(optionalString.parse('hello')).toBe('hello');
    });

    it('should trim whitespace', () => {
      expect(optionalString.parse('  hello  ')).toBe('hello');
    });

    it('should accept empty string', () => {
      expect(optionalString.parse('')).toBe('');
    });

    it('should accept undefined', () => {
      expect(optionalString.parse(undefined)).toBeUndefined();
    });
  });

  describe('generalInfoSchema', () => {
    it('should accept valid general info', () => {
      const result = generalInfoSchema.parse({
        title: 'My Resume',
        description: 'A great resume',
      });
      expect(result.title).toBe('My Resume');
      expect(result.description).toBe('A great resume');
    });

    it('should accept empty values', () => {
      const result = generalInfoSchema.parse({});
      expect(result.title).toBeUndefined();
      expect(result.description).toBeUndefined();
    });
  });

  describe('workExperienceSchema', () => {
    it('should accept valid work experiences', () => {
      const result = workExperienceSchema.parse({
        workExperiences: [
          {
            position: 'Software Engineer',
            company: 'Tech Corp',
            startDate: '2020-01-01',
            endDate: '2023-12-01',
            description: 'Built amazing software',
          },
        ],
      });
      expect(result.workExperiences).toHaveLength(1);
      expect(result.workExperiences![0].position).toBe('Software Engineer');
    });

    it('should accept empty work experiences', () => {
      const result = workExperienceSchema.parse({});
      expect(result.workExperiences).toBeUndefined();
    });

    it('should accept multiple work experiences', () => {
      const result = workExperienceSchema.parse({
        workExperiences: [
          { position: 'Position 1', company: 'Company 1' },
          { position: 'Position 2', company: 'Company 2' },
        ],
      });
      expect(result.workExperiences).toHaveLength(2);
    });
  });

  describe('educationSchema', () => {
    it('should accept valid education entries', () => {
      const result = educationSchema.parse({
        educations: [
          {
            degree: 'Bachelor of Science',
            school: 'University of Tech',
            startDate: '2016-09-01',
            endDate: '2020-05-01',
          },
        ],
      });
      expect(result.educations).toHaveLength(1);
      expect(result.educations![0].degree).toBe('Bachelor of Science');
    });

    it('should accept empty educations', () => {
      const result = educationSchema.parse({});
      expect(result.educations).toBeUndefined();
    });
  });

  describe('skillsSchema', () => {
    it('should accept valid skills array', () => {
      const result = skillsSchema.parse({
        skills: ['JavaScript', 'TypeScript', 'React'],
      });
      expect(result.skills).toHaveLength(3);
      expect(result.skills).toContain('JavaScript');
    });

    it('should accept empty skills', () => {
      const result = skillsSchema.parse({});
      expect(result.skills).toBeUndefined();
    });

    it('should trim skill strings', () => {
      const result = skillsSchema.parse({
        skills: ['  JavaScript  ', '  React  '],
      });
      expect(result.skills![0]).toBe('JavaScript');
      expect(result.skills![1]).toBe('React');
    });
  });

  describe('summarySchema', () => {
    it('should accept valid summary', () => {
      const result = summarySchema.parse({
        summary: 'Experienced software developer with 5 years of experience.',
      });
      expect(result.summary).toBe('Experienced software developer with 5 years of experience.');
    });

    it('should accept empty summary', () => {
      const result = summarySchema.parse({});
      expect(result.summary).toBeUndefined();
    });
  });

  describe('generateWorkExperienceSchema', () => {
    it('should accept valid description', () => {
      const result = generateWorkExperienceSchema.parse({
        description: 'Software engineer at Google building cloud infrastructure',
      });
      expect(result.description).toBe('Software engineer at Google building cloud infrastructure');
    });

    it('should reject description shorter than 20 characters', () => {
      expect(() => generateWorkExperienceSchema.parse({
        description: 'Short desc',
      })).toThrow();
    });

    it('should reject empty description', () => {
      expect(() => generateWorkExperienceSchema.parse({
        description: '',
      })).toThrow();
    });
  });

  describe('generateSummarySchema', () => {
    it('should accept valid summary input', () => {
      const result = generateSummarySchema.parse({
        jobTitle: 'Software Engineer',
        workExperiences: [{ position: 'Developer', company: 'Tech Corp' }],
        educations: [{ degree: 'BS', school: 'University' }],
        skills: ['JavaScript', 'Python'],
      });
      expect(result.jobTitle).toBe('Software Engineer');
      expect(result.workExperiences).toHaveLength(1);
    });

    it('should accept empty input', () => {
      const result = generateSummarySchema.parse({});
      expect(result.jobTitle).toBeUndefined();
    });
  });
});
