import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Next Generation Toolset',
    Svg: require('@site/static/img/tools.svg').default,
    description: (
      <>
        Tools for Microsoft Power Platform developers and architects., 
        Applications that can be used to accelerate development
      </>
    ),
  },
  {
    title: 'Model-driven Applications',
    Svg: require('@site/static/img/favourite-window.svg').default,
    description: (
      <>
        Managed solutions for Dynamics 365 Model-driven apps that can be
        installed directly into your environment to extend its capabilities.
      </>
    ),
  },
  {
    title: 'Keep Updated',
    Svg: require('@site/static/img/settings.svg').default,
    description: (
      <>
        Blog is focused on only Microsoft Power Platform tool news.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
