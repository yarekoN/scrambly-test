export const ApiVersions = {
  Neutral: '',
  First: 'v1',
} as const;

export type ApiVersions = (typeof ApiVersions)[keyof typeof ApiVersions];
