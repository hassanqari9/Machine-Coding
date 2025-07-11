export type Path = Record<string, unknown>

export const dataPaths: Path = {
  "/": ["index.ts"],
  hello: ["index.ts", "page.tsx"],
  test: ["index.ts", "text.tsx"],
  nested: {
    nest1: ["nested.tsx"],
    nest2: {
      nest3: ["nested-nested.ts"]
    }
  }
}
