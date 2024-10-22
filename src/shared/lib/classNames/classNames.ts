export type Mods = Record<string, boolean | string | undefined>;

// эта функци повторяет функциональность бибилиотеки classNames, можно было бы использовать эту
// готовую библиотеку, но мы используем эту функцию для опытов и тестов

export function classNames(
    cls: string,
    mods: Mods = {},
    addinional: Array<string | undefined> = [],
): string {
    return [
        cls,
        ...addinional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([, value]) => Boolean(value))
            .map(([className]) => className),
    ].join(' ');
}
