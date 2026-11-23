import Image from "next/image";
import Link from "next/link";
import styles from "./christmas.module.css";

export default function ChristmasBanner() {
  return (
    <section className={styles.banner} aria-labelledby="christmas-banner-title">
      <div className={styles.bannerArt} aria-hidden="true">
        <Image src="/images/christmas/ely-winter.svg" alt="" fill sizes="(max-width: 700px) 100vw, 400px" />
      </div>
      <div className={styles.bannerCopy}>
        <p className={styles.eyebrow}>A little Christmas magic. A lot of local good.</p>
        <h2 id="christmas-banner-title">The sleigh is coming to Ely.</h2>
        <p>Father Christmas, familiar streets and a community coming together. Find your road on our Christmas Collection 2026 route.</p>
      </div>
      <Link className={styles.goldButton} href="/christmas-collection">Find your Christmas visit</Link>
    </section>
  );
}
