declare module '*.json' {
  const value: any;
}

declare module '*.jpg' {
  const source: string;

  export default source;
}

declare module '*.png' {
  const source: string;

  export default source;
}

declare module '*.gif' {
  const source: string;

  export default source;
}

declare module '*.svg' {
  const source: string;

  export default source;
}

declare module '*.css' {
  const styleObject: Record<string, string>;

  export default styleObject;
}
