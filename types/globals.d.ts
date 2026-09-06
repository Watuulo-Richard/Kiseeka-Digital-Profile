// Ambient declaration for plain CSS side-effect imports (e.g. `import "./globals.css"`).
// Next's generated types only declare `*.module.css` (CSS Modules). Without this
// declaration, side-effect CSS imports error with TS2882 when `noUncheckedSideEffectImports`
// is enabled, regardless of the Next or TypeScript version in use.
declare module "*.css" {
  const styles: Record<string, string>;
  export default styles;
}