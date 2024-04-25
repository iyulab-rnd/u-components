export const languages = ['en', 'ko'] as const;

export type Languages = typeof languages[number];

export type ULocalizerConfig = {
  [lang in Languages]: { 
    [namespace: string]: Record<string, string>; 
  };
}
