"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/routing";
import { siteConfig } from "@/data/siteConfig";

const footerLinks = [
  { key: "usine", href: "/usine" },
  { key: "produits", href: "/produits" },
  { key: "configurateur", href: "/configurateur-3d" },
  { key: "projets", href: "/projets" },
  { key: "contact", href: "/contact" },
  { key: "catalogue", href: "/catalogue" },
] as const;

const socialItems = [
  { key: "facebook", href: siteConfig.social.facebook },
  { key: "instagram", href: siteConfig.social.instagram },
  { key: "youtube", href: siteConfig.social.youtube },
  { key: "linkedin", href: siteConfig.social.linkedin },
] as const;

export default function Footer({ className = "" }: { className?: string }) {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const tSocial = useTranslations("social");

  return (
    <footer className={`border-t border-stone-200 bg-white text-black ${className}`}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            {/* SWAP: Replace with final logo variant if needed */}
            <Image
              src={siteConfig.assets.logo}
              alt={siteConfig.name}
              width={56}
              height={56}
              className="h-14 w-auto"
            />
            <div>
              <p className="flex flex-wrap items-baseline gap-x-2 font-display text-sm font-bold tracking-widest text-black">
                <span>MARBRERIE TUNIS CARTHAGE</span>
                <span className="text-[0.85em] font-semibold tracking-wide text-black">
                  Since 1989
                </span>
              </p>
              <p className="font-arabic text-sm text-black/75" dir="rtl">
                {siteConfig.nameArabic}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg font-bold text-black">
            {tFooter("usefulLinks")}
          </h3>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="text-sm text-stone-600 transition hover:text-black"
                >
                  {tNav(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg font-bold text-black">
            {tFooter("contactUs")}
          </h3>
          <ul className="space-y-2 text-sm text-stone-600">
            <li>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="transition hover:text-black"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="transition hover:text-black"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>{siteConfig.address}</li>
          </ul>
          <div className="mt-4 overflow-hidden rounded-lg border border-stone-200">
            {/* SWAP: Replace embed URL with precise factory location */}
            <iframe
              src={siteConfig.assets.googleMapsEmbedUrl}
              title="Google Maps"
              className="h-40 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-stone-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row lg:px-8">
          <div className="flex gap-4">
            {socialItems.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tSocial(key)}
                className="text-sm text-stone-600 transition hover:text-black"
              >
                {tSocial(key)}
              </a>
            ))}
          </div>
          <p className="text-center text-xs text-stone-500">
            {tFooter("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
