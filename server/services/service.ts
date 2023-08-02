export type Service<P, T> = (
  params?:
    | {
        limit?: string;
        offset?: string;
      } & P
) => Promise<T>;
