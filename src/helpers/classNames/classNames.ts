type Mods = Record<string, boolean | string>;

export function classNames(cls: string, mods: Mods, addinional: string[]): string {
  return [
    cls,
    ...addinional,
    ...Object.entries(mods)
      .filter(([key, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(' ');
}
