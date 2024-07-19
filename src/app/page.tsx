'use client';

import Image from 'next/image';
import IndexHeader from '@/components/headers/IndexHeader';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import Link from 'next/link';
import { FC, ReactElement, ReactNode } from 'react';

interface IFeature {
  icon: JSX.Element;
  title: string;
  description?: string;
}

const Index: FC = (): ReactElement => {
  const features: IFeature[] = [
    {
      icon: <FaCheckCircle className="text-green-500" />,
      title: 'Real-time Monitoring',
      description: 'Monitor service uptime in real-time and get instant notifications for downtime.'
    },
    {
      icon: <FaCheckCircle className="text-green-500" />,
      title: 'Easy Integration',
      description: 'Integrate seamlessly with your existing tools and workflows.'
    },
    {
      icon: <FaExclamationCircle className="text-red-500" />,
      title: 'Alerting',
      description: 'Get instant notification of potential issues before they impact your users.'
    }
  ];
  const monitors: string[] = ['HTTP/HTTPS', 'TCP', 'MONGODB', 'REDIS', 'SSL/TLS'];

  return (
    <>
      <IndexHeader />
      <div className="w-screen min-h-screen relative">
        <div className="flex flex-col m-auto mt-4 px-6 xl:container md:px-12 lg:px-6">
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  The best <strong className="font-bold text-green-400">Uptime</strong> monitor service.
                </h1>
                <p className="text-gray-700 mb-4">
                  Our Uptime monitoring service helps you track uptime of your services in real-time, ensuring high availability and
                  reliability for your applications.
                </p>
                <Link href="/create-account" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                  Create a FREE account
                </Link>
              </div>
              <Image
                src="https://i.ibb.co/MshLk9P/bg.jpg"
                alt="API Monitor"
                className="w-full"
                width={800}
                height={800}
                priority
              />
            </div>

            <Section title="Key Features">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <Feature key={index} {...feature} />
                ))}
              </div>
            </Section>

            <Section title="Monitors">
              <div className="grid grid-cols-1 gap-4">
                {monitors.map((monitor, index) => (
                  <Feature key={index} icon={<FaCheckCircle className="text-green-500" />} title={monitor} />
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const Feature: FC<IFeature> = ({ icon, title, description }) => (
  <div className="flex items-center">
    <div className="mr-4">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="text-gray-700">{description}</p>}
    </div>
  </div>
);

const Section: FC<{ title: string; children: ReactNode }> = ({ title, children }): ReactElement => (
  <div className="mt-8">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    {children}
  </div>
);

const Footer: FC = (): ReactElement => (
  <footer className="bg-gray-900 text-white py-8 mt-auto">
    <div className="max-w-7xl mx-auto px-4">
      <p className="text-center">&copy; {new Date().getFullYear()} Uptimer Dashboard. All rights reserved.</p>
    </div>
  </footer>
);

export default Index;
