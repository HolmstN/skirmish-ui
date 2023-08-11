export type Service<P, T> = (
  params: P & { limit?: string; offset?: string }
) => Promise<{ value: T; error: null } | { value: null; error: string }>;
