import { LandingHero } from "./components/home/landing-hero";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <LandingHero />
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]"></footer>
    </div>
  );
}
