export type BuildMode = 'production' | 'development';

export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    src: string;
    // следующие два поля требуются для того что бы можно было указывать куда перемещать переводы из i18 так как без этого указания они не будут работать в prod сборке
    locales: string; // где находятся переводы
    buildLocales: string; // куда переместить
}

export interface BuildEnv {
    mode: BuildMode;
    port: number;
    apiUrl: string;
}

export interface BuildOptions {
    mode: BuildMode;
    paths: BuildPaths;
    isDev: boolean;
    port: number;
    apiUrl: string;
    project: 'storybook' | 'frontend' | 'jest';
}
