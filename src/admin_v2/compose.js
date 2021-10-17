export const compose =
  (...fns) =>
  (Base) =>
    fns.reduceRight((Component, hoc) => hoc(Component), Base);
