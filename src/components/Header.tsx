import Link from "next/link";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary border-bottom border-secondary">
        <div className="container-fluid px-5">
          <Link href="/">
            <a className={`${styles.brand} navbar-brand fs-1 fw-bolder`}>
              #TezosTeusday
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
