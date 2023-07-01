type FormatterConfig = {
  datetime: Intl.DateTimeFormatOptions;
};

export const useFormatters = ({ datetime }: Partial<FormatterConfig> = {}) => {
  const dformat = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    ...datetime,
  }).format;

  return {
    dformat,
  };
};
