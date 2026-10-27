const cards = [
  {
    title: "20% Off On Tank Tops",
    text: "Stay cool this summer with our lightweight tank tops in every color.",
    gender: "all",
    type: "tanktops",
    tint: "168, 86, 107",
    image: "/Tank.jpeg",
  },
  {
    title: "Latest Eyewear For You",
    text: "Find the perfect sunglasses to match your style and protect your eyes.",
    gender: "all",
    type: "eyewear",
    tint: "42, 111, 134",
    image: "/Eyewear.jpeg",
  },
  {
    title: "Let's Suit Up!",
    text: "Look sharp with our new collection of jackets, shirts and shoes.",
    gender: "all",
    type: "jackets",
    tint: "138, 74, 94",
    image: "/Jacket.jpeg",
  },
];

export default function PromoCards({ onShop = () => {} }) {
  return (
    <section id="offers" className="promo">
      {cards.map((c) => (
        <div
          key={c.title}
          className="promo-card"
          style={{
            backgroundImage: `linear-gradient(rgba(${c.tint}, 0.35), rgba(${c.tint}, 0.35)), url(${c.image})`,
          }}
        >
          <h3>{c.title}</h3>
          <p>{c.text}</p>
          <button className="btn btn-light" onClick={() => onShop(c.gender, c.type)}>
            Shop more
          </button>
        </div>
      ))}
    </section>
  );
}