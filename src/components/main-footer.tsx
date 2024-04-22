import { siteConfig } from '@/config/site';

export default function MainFooter() {
  return (
    <footer className="py-3.5 md:py-0 px-24 border-t-[1px] ">
      <div className="flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row">
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
