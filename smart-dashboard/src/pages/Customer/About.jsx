import "../../style.css";

export default function About() {
  return (
    <div className="about-page">
      {/* HERO SECTION */}
      <section className="about-hero">

        <h1>About Smart Cafe</h1>
        <p>Fresh taste, fast service, and a smart ordering experience</p>
      </section>

      {/* MAIN SECTION */}
      <section className="about-main">
        <div className="about-text">
          <h2>Welcome to Smart Cafe</h2>
          <p>
            Smart Cafe is your go-to place for delicious fast food, refreshing drinks,
            and customizable meals where we focus on freshness, quality, and speed.
            Our goal is to provide a smart ordering experience that allows customers
            to easily select and customize their favorite food items without waiting
            in long queues. From burgers, coffee, juices, and milkshakes to sandwiches
            and shawarma, everything is freshly prepared by our expert chefs with love
            and care. We are committed to using high-quality ingredients and ensuring
            quick service so every customer enjoys a satisfying and delightful experience
            at Smart Cafe.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <section className="about-footer">
        <h3>Thank you for visiting Smart Cafe</h3>
      </section>
    </div>
  );
}