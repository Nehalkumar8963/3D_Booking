import Link from "next/link";
import { Compass, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  Destinations: [
    { href: "/destinations", label: "All Destinations" },
    { href: "/destinations/paris", label: "Paris" },
    { href: "/destinations/bali", label: "Bali" },
    { href: "/destinations/tokyo", label: "Tokyo" },
    { href: "/destinations/santorini", label: "Santorini" },
  ],
  "Tour Categories": [
    { href: "/tour-listing?category=City+Tours", label: "City Tours" },
    { href: "/tour-listing?category=Adventure", label: "Adventure" },
    { href: "/tour-listing?category=Food+%26+Wine", label: "Food & Wine" },
    { href: "/tour-listing?category=Cultural+Tours", label: "Cultural" },
    { href: "/tour-listing?category=Wellness", label: "Wellness" },
  ],
  Support: [
    { href: "#", label: "Help Center" },
    { href: "#", label: "Cancellation Policy" },
    { href: "#", label: "Travel Insurance" },
    { href: "#", label: "Safety Guidelines" },
    { href: "#", label: "Contact Us" },
  ],
  Company: [
    { href: "#", label: "About Us" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Press" },
    { href: "#", label: "Blog" },
    { href: "#", label: "Terms & Privacy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-900 border-t">
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Compass className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">TourBooking</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Discover extraordinary experiences and create unforgettable memories with our curated tours.
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                hello@tourbooking.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                123 Travel St, NYC
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t">
        <div className="container mx-auto py-6 px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TourBooking. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.11 2.459c.636-.247 1.363-.416 2.427-.465C8.88 2 9.235 2 12.315 2zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.73a3.405 3.405 0 100 6.81 3.405 3.405 0 000-6.81zm4.338-2.663a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
              </svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
