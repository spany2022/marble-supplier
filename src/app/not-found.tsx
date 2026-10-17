import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grain relative isolate flex min-h-[80svh] items-end bg-charcoal pb-20 pt-40 text-ivory">
      <div className="site-x mx-auto w-full max-w-site">
        <p className="eyebrow text-brass">Error 404</p>
        <h1 className="display-xl mt-6">
          Not quarried
          <br />
          <span className="serif-accent text-brass">yet.</span>
        </h1>
        <p className="lede mt-8 max-w-lg text-ivory/75">The page you were looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/" variant="light">
            Back to home
          </Button>
          <Button href="/collections" variant="outline-light">
            Explore collections
          </Button>
        </div>
      </div>
    </section>
  );
}
