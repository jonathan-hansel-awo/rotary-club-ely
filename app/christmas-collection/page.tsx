import Image from "next/image";
import Link from "next/link";
import RouteFinder from "@/components/christmas/RouteFinder";
import { donationUrl, trackerUrl } from "@/lib/christmas/routes";
import { createPageMetadata } from "@/lib/seo";
import styles from "@/components/christmas/christmas.module.css";

export const metadata = createPageMetadata({
  title: "Christmas Collection 2026 — Sleigh Routes & Donations",
  description: "Father Christmas is coming to Ely! Find your street and December 2026 sleigh visit, meet us on Ely High Street, and donate to local charities and good causes.",
  path: "/christmas-collection",
});

export default function ChristmasCollectionPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="christmas-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <Link href="/" className={styles.backLink}>Rotary Club of Ely / Christmas 2026</Link>
            <p className={styles.eyebrow}>Our streets. Our community. Our Christmas.</p>
            <h1 id="christmas-title">A little magic.<br />A whole lot<br />of <em>good.</em></h1>
            <p className={styles.heroLead}>Father Christmas is coming to Ely.</p>
            <p>Our sleigh is back for an evening visit to a street near you. Join Ely Rotary and our wonderful volunteers in supporting local charities and good causes this Christmas.</p>
            <div className={styles.actions}>
              <a className={styles.goldButton} href="#find-your-street">Find your street</a>
              <a className={styles.outlineButton} href="#give">Make a donation</a>
            </div>
            <p className={styles.heroDates}>7–22 December 2026 <span aria-hidden="true">✦</span> Weekday evenings, 6pm–around 8pm</p>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.postmark}><span>Ely Rotary</span><strong>Christmas<br />Collection</strong><span>2026</span></div>
            <Image src="/images/christmas/ely-winter.svg" alt="An illustration of Father Christmas in his sleigh on a snowy Ely street, with the cathedral glowing in the background." width={1000} height={680} priority sizes="(max-width: 800px) 100vw, 55vw" />
            <p className={styles.visualCaption}>Bringing a little joy to your doorstep.</p>
          </div>
        </div>
      </section>

      <div className={styles.ribbon}>
        <p><span aria-hidden="true">♡</span> Collected with kindness. Given to local good causes.</p>
      </div>

      <section id="find-your-street" className={styles.section} aria-labelledby="finder-title">
        <div className={styles.sectionHeading}>
          <div><p className={styles.redEyebrow}>The 2026 sleigh rounds</p><h2 id="finder-title">When’s your Christmas visit?</h2></div>
          <p>Find your road, gather the family and look out for the sleigh. We set off at 6pm and aim to reach the last street by around 8pm.</p>
        </div>
        <RouteFinder />
        <div className={styles.downloads}>
          <div><strong>Prefer a copy to keep?</strong><p>Download the club’s original route lists.</p></div>
          <a href="/downloads/christmas-2026/collection-routes-2026.doc" download>Routes by date <span>Word document</span></a>
          <a href="/downloads/christmas-2026/streets-alphabetical-2026.doc" download>Alphabetical street list <span>Word document</span></a>
        </div>
      </section>

      <section className={styles.visitSection} aria-labelledby="high-street-title">
        <div className={styles.visitInner}>
          <div className={styles.highStreet}>
            <p className={styles.redEyebrow}>A Saturday in the city</p>
            <h2 id="high-street-title">See you on<br />the High Street.</h2>
            <p>Out and about in Ely? Come along to our static Christmas collection and help bring a little more cheer to local good causes.</p>
            <div className={styles.saturdays}>
              <div><span>Saturday</span><strong>12</strong><span>December</span></div>
              <div><span>Saturday</span><strong>19</strong><span>December</span></div>
              <p><strong>9am–3:45pm</strong><span>Ely High Street</span></p>
            </div>
          </div>
          <aside className={styles.tracker} aria-labelledby="tracker-title">
            <svg viewBox="0 0 220 110" aria-hidden="true" className={styles.trackerArt}><path d="M10 90C40 20 90 120 120 58s65-36 90-41" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 8"/><circle cx="12" cy="88" r="5" fill="currentColor"/><path d="M173 28a16 16 0 1 1 32 0c0 12-16 25-16 25s-16-13-16-25Z" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="189" cy="27" r="5" fill="currentColor"/></svg>
            <p className={styles.eyebrow}>{trackerUrl ? "Follow the Christmas magic" : "A little closer to Christmas"}</p>
            <h3 id="tracker-title">Where’s the sleigh?</h3>
            {trackerUrl ? <><p>See the sleigh’s position during our collection evenings.</p><a className={styles.goldButton} href={trackerUrl} target="_blank" rel="noopener noreferrer">Open the sleigh tracker <span className="sr-only">(opens in a new tab)</span></a></> : <><p>Our live tracker is getting ready. We’ll add the link here and on our Facebook page nearer the first collection evening.</p><span className={styles.comingSoon}>Tracker coming soon</span></>}
          </aside>
        </div>
      </section>

      <section id="give" className={`${styles.section} ${styles.giving}`} aria-labelledby="giving-title">
        <div className={styles.givingIntro}>
          <p className={styles.redEyebrow}>Christmas kindness, close to home</p>
          <h2 id="giving-title">A small gift.<br /><em>A local difference.</em></h2>
          <p>Our door-to-door collection raises funds to support local charities and good causes. We’re joined by volunteers, including people from local charities and clubs, who give their time to make it happen.</p>
          <p>Whether you meet the sleigh, see us on the High Street or give from home, thank you for being part of it.</p>
        </div>
        <div className={styles.givingOptions}>
          <article className={styles.onlineGiving}>
            <span aria-hidden="true" className={styles.giftIcon}>♡</span>
            <h3>Give from wherever you are.</h3>
            <p>Out when we visit? You can still support the Christmas collection online.</p>
            <a className={styles.goldButton} href={donationUrl} target="_blank" rel="noopener noreferrer">Donate with MyGivingHub <span className="sr-only">(opens in a new tab)</span></a>
            <p className={styles.donationHelp}>On MyGivingHub, choose <strong>Donations to Charity</strong> and search for <strong>Rotary Club of Ely</strong>.</p>
          </article>
          <div className={styles.inPerson}><h3>No cash? No problem.</h3><p>We’ll have a number of card readers and QR codes on our collection buckets, so you can donate by card or online when you see us.</p></div>
        </div>
      </section>
      <div className={styles.thanks}><p>From all of us at Ely Rotary,</p><strong>thank you for making spirits bright.</strong><span>And for helping good things happen, right here in Ely.</span></div>
    </div>
  );
}
