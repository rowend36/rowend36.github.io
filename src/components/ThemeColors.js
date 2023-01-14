import baseTheme from "./Theme";
const lightness = (e) => {
  return e
    .slice(1)
    .split(/(..)/)
    .filter(Boolean)
    .map((o) => parseInt(o, 16))
    .reduce((s, e) => s + e / 3, 0)
    .toFixed(2);
};
export default function ThemeColors() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {baseTheme.colors.map((e, i, a) => {
        return (
          <div
            style={{
              padding: "20px",
              display: "flex",
              alignItems: "bottom",
              background: e,
              width: "100px",
              flexGrow: 1,
              color: a[lightness(e) > 128 ? 0 : a.length - 1],
              justifyContent: "center",
              maxWidth: "150px",
              aspectRatio: "1/1",
            }}
          >
            <b>{i}</b>
            <br />
            {e}
            <br />
            {lightness(e)}
          </div>
        );
      })}
    </div>
  );
}
