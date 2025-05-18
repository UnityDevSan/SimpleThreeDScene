'use client';
import { useTranslations } from 'next-intl';
import { DarkModeSwitch } from '@/components/ui/DarkModeSwitch';
import { Button } from '@/components/ui/button';

export function Header() {
  const t = useTranslations('Deshboard');
  return (
    <header className="w-full h-16 flex items-center px-8 shadow-lg z-10">
      <h1 className="text-2xl font-bold flex-1">{t('title')}</h1>
      <DarkModeSwitch />
      <LanguageSwitch />
      <Button variant="outline" className="ml-4" title="In Arbeit">
        Login
      </Button>
    </header>
  );
}