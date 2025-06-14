export default function PortfolioItem({ 
  image, 
  title, 
  description, 
  link, 
  category = "ML",
  alt = "Portfolio Item",
  style = {},
  className = "portfolio-item one-four isotope-item effect-oscar"
}) {
  return (
    <figure
      style={style}
      class={`${className} ${category}`}
    >
      <div class="portfolio_img">
        <img src={image} alt={alt} />
      </div>
      <figcaption>
        <div>
          <a
            href={link}
            class="nav-link"
          >
            <h2>{title}</h2>
            <p>{description}</p>
          </a>
        </div>
      </figcaption>
    </figure>
  );
}