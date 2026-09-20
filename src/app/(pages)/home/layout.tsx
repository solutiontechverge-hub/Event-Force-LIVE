// Home route layout — providers already wrap the app in root layout.
import React from 'react';
import { metadata } from './metadata';

export { metadata };

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
