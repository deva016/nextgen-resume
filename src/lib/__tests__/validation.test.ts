import {
  optionalString,
  generalInfoSchema,
  workExperienceSchema,
  educationSchema,
  projectSchema,
  certificationSchema,
  skillsSchema,
  strengthsSchema,
  languagesSchema,
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

  describe('projectSchema', () => {
    it('should accept valid project entries', () => {
      const result = projectSchema.parse({
        projects: [
          {
            name: 'E-commerce Website',
            description: 'Built a full-stack e-commerce platform',
            year: '2024',
            link: 'https://example.com',
          },
        ],
      });
      expect(result.projects).toHaveLength(1);
      expect(result.projects![0].name).toBe('E-commerce Website');
    });

    it('should accept empty projects', () => {
      const result = projectSchema.parse({});
      expect(result.projects).toBeUndefined();
    });

    it('should accept multiple projects', () => {
      const result = projectSchema.parse({
        projects: [
          { name: 'Project 1', year: '2023' },
          { name: 'Project 2', year: '2024' },
        ],
      });
      expect(result.projects).toHaveLength(2);
    });
  });

  describe('certificationSchema', () => {
    it('should accept valid certification entries', () => {
      const result = certificationSchema.parse({
        certifications: [
          {
            name: 'AWS Solutions Architect',
            yearRange: '2024 - 2027',
            link: 'https://aws.amazon.com/certification',
          },
        ],
      });
      expect(result.certifications).toHaveLength(1);
      expect(result.certifications![0].name).toBe('AWS Solutions Architect');
    });

    it('should accept empty certifications', () => {
      const result = certificationSchema.parse({});
      expect(result.certifications).toBeUndefined();
    });
  });

  describe('strengthsSchema', () => {
    it('should accept valid strengths array', () => {
      const result = strengthsSchema.parse({
        strengths: ['Leadership', 'Problem Solving', 'Communication'],
      });
      expect(result.strengths).toHaveLength(3);
      expect(result.strengths).toContain('Leadership');
    });

    it('should accept empty strengths', () => {
      const result = strengthsSchema.parse({});
      expect(result.strengths).toBeUndefined();
    });

    it('should trim strength strings', () => {
      const result = strengthsSchema.parse({
        strengths: ['  Leadership  ', '  Teamwork  '],
      });
      expect(result.strengths![0]).toBe('Leadership');
      expect(result.strengths![1]).toBe('Teamwork');
    });
  });

  describe('languagesSchema', () => {
    it('should accept valid languages array', () => {
      const result = languagesSchema.parse({
        languages: ['English', 'Hindi', 'Spanish'],
      });
      expect(result.languages).toHaveLength(3);
      expect(result.languages).toContain('English');
    });

    it('should accept empty languages', () => {
      const result = languagesSchema.parse({});
      expect(result.languages).toBeUndefined();
    });

    it('should trim language strings', () => {
      const result = languagesSchema.parse({
        languages: ['  English  ', '  French  '],
      });
      expect(result.languages![0]).toBe('English');
      expect(result.languages![1]).toBe('French');
    });
  });
});
