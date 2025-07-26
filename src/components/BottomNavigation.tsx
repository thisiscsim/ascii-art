'use client';

import { AnimatedBackground } from '@/components/motion-primitives/animated-background';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Knot' },
  { path: '/phasing', label: 'Phasing' },
  { path: '/shader', label: 'Shader' },
  { path: '/mobius', label: 'Mobius' },
  { path: '/motif', label: 'Motif' },
  { path: '/spiral', label: 'Spiral' },
  { path: '/eclipse', label: 'Eclipse' },
];

// Define which pages should have light theme navigation
const lightThemePages = ['/spiral'];

export function BottomNavigation() {
  const pathname = usePathname();
  const isLightTheme = lightThemePages.includes(pathname);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex justify-center py-4">
          <AnimatedBackground
            defaultValue={pathname}
            className={cn(
              "rounded-lg",
              isLightTheme 
                ? "bg-neutral-200" 
                : "bg-neutral-200 dark:bg-neutral-900"
            )}
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.3,
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                data-id={item.path}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                  pathname === item.path
                    ? isLightTheme 
                      ? "text-neutral-900"
                      : "text-neutral-900 dark:text-neutral-300"
                    : isLightTheme
                      ? "text-neutral-500 hover:text-neutral-800"
                      : "text-neutral-500 dark:text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                )}
              >
                {item.label}
              </Link>
            ))}
          </AnimatedBackground>
        </nav>
      </div>
    </div>
  );
} 