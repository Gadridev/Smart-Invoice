import "@/styles/loading.css";


export default function Loading({
  message = "Chargement…",
  fullScreen = false,
  size = "md",
}) {
  const className = [
    "loading",
    fullScreen && "loading--fullscreen",
    size !== "md" && `loading--${size}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} role="status" aria-busy="true" aria-live="polite">
      <div className="loading__visual" aria-hidden="true">
        <span className="loading__glow" />
        <span className="loading__ring loading__ring--outer" />
        <span className="loading__ring loading__ring--inner" />
        <span className="loading__core" />
        <span className="loading__dot loading__dot--1" />
        <span className="loading__dot loading__dot--2" />
        <span className="loading__dot loading__dot--3" />
      </div>
      {message ? <p className="loading__message">{message}</p> : null}
    </div>
  );
}
