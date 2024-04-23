'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex md:justify-between md:w-full">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6 ">
        <Link
          href="/about"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/about' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          About
        </Link>
        <Link
          href={siteConfig.links.github}
          className={cn(
            'hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block'
          )}
        >
          GitHub
        </Link>
        <SignedOut>
          <Link
            href="/sign-in"
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname === '/sign-in' ? 'text-foreground' : 'text-foreground/60'
            )}
          >
            Sign in
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </nav>
    </div>
  );
}
