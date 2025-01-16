import { Link } from "react-router-dom";
import Search from "../molecules/Search";
import { useGetCategoriesQuery } from "../libs/graphql/generated/graphql-types";
import { useUserStore } from "../libs/zustand/userStore";

function Header() {
  const { loading, error, data } = useGetCategoriesQuery();
  const user = useUserStore((state) => state.user);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Achtung! We broke something!</p>;

  return (
    <header className="header">
      <div className="main-menu">
        <h1>
          <Link to="/" className="button logo link-button">
            <span className="mobile-short-label">TGC</span>
            <span className="desktop-long-label">THE GOOD CORNER</span>
          </Link>
        </h1>
        <Search />
        {user?.name && <p>Welcome {user.name}</p>}
        <Link to="/ads/new" className="button link-button">
          <span className="mobile-short-label">Publier</span>
          <span className="desktop-long-label">Publier une annonce</span>
        </Link>
      </div>
      <nav className="categories-navigation">
        {data.getCategories.map((cat, id) => (
          <span key={cat.id}>
            {id > 0 && "•"}
            <Link
              to={`/categories/${cat.id}`}
              className="category-navigation-link"
            >
              {cat.name}
            </Link>
          </span>
        ))}
      </nav>
    </header>
  );
}

export default Header;
