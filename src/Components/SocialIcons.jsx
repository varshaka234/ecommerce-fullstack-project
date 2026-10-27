const brands = [
  { name: "Urban Style", shape: "circle" },
  { name: "Trendy Wear", shape: "square" },
  { name: "NORTH", shape: "diamond" },
  { name: "Street Co", shape: "circle" },
  { name: "Daily Fit", shape: "square" },
];

export default function SocialIcons() {
  return (
    <section className="brands">
      {brands.map((b) => (
        <div key={b.name} className="brand">
          <span className={`brand-mark ${b.shape}`}>{b.name[0]}</span>
          <span className="brand-name">{b.name}</span>
        </div>
      ))}
    </section>
  );
}