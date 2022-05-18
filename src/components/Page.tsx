import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./Page.module.scss";

export const Page = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className={styles.page}>
      <Header />
      <main className="bg-primary text-white">{children}</main>
      <Footer />
    </div>
  );
};
