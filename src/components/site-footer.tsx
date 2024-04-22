import { siteConfig } from '@/config/site';

export default function SiteFooter() {
  return (
    <footer className="md:px-8 md:py-0 py-3.5 border-t-[1px]">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{' '}
          <a
            href={siteConfig.links.schoolEmail}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Dmitrii Nikolaev
          </a>
          . The source code is available on{' '}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
