import {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import {Chrome, Edge} from 'developer-icons';

import styles from './styles.module.css';

type BrowserKind = 'chrome' | 'edge' | 'other';

const STORE_LINKS = {
  chrome: {
    href: 'https://chromewebstore.google.com/detail/bjjinmnfkhkcpfkogighlcdfmejincbh',
    label: 'Install for Chrome',
    icon: Chrome,
  },
  edge: {
    href: 'https://microsoftedge.microsoft.com/addons/detail/dnalekcahpnolnhfdphcgjhgehbdghbf',
    label: 'Install for Edge',
    icon: Edge,
  },
} as const;

function detectBrowser(): BrowserKind {
  if (typeof navigator === 'undefined') {
    return 'other';
  }

  const brands = navigator.userAgentData?.brands
    ?.map(brand => brand.brand.toLowerCase())
    .join(' ');

  if (brands?.includes('microsoft edge')) {
    return 'edge';
  }

  if (brands?.includes('google chrome')) {
    return 'chrome';
  }

  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes('edg/')) {
    return 'edge';
  }

  if (userAgent.includes('chrome/')) {
    return 'chrome';
  }

  return 'other';
}

export default function BrowserStoreButtons() {
  const [browser, setBrowser] = useState<BrowserKind>('other');

  useEffect(() => {
    setBrowser(detectBrowser());
  }, []);

  const buttonOrder =
    browser === 'edge' ? ['edge', 'chrome'] : ['chrome', 'edge'];

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Install xRM MDA</p>
      <div className={styles.buttons}>
        {buttonOrder.map(kind => {
          const storeLink = STORE_LINKS[kind];
          const Icon = storeLink.icon;
          const className =
            browser === kind ? 'button button--primary button--lg' : 'button button--secondary button--lg';

          return (
            <Link key={kind} className={className} href={storeLink.href}>
              <span className={styles.buttonContent}>
                <Icon className={styles.icon} size={18} aria-hidden="true" />
                <span>{storeLink.label}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}