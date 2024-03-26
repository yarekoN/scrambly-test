export const ApiVersions = {
  Neutral: '',
  First: '1',
} as const;

export type ApiVersions = (typeof ApiVersions)[keyof typeof ApiVersions];
