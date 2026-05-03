export function AnnouncementBar() {
  return (
    <div
      className="announcement-bar"
      style={{
        background: "var(--primary)",
        color: "var(--bg-dark)",
        textAlign: "center",
        padding: "8px",
        fontWeight: 600,
        fontSize: "0.9rem",
        zIndex: 1001,
        position: "relative",
      }}
    >
      Portfolio showcase &mdash; Contact: openrize@gmail.com &middot; +1 (224) 377 9043
    </div>
  );
}
