import { Brand, FooterLink, Copyright } from "./footer/index"

const FOOTER_LINKS: Record<string, string[]> = {
    Product: ["Features", "Pricing", "API", "Mobile App"],
    Organizer: ["About", "Blog", "Careers", "Press"],
    Resources: ["Help Center", "Contact", "Guidelines", "Terms"],
    Social: ["Twitter", "Instagram", "LinkedIn", "YouTube"],
};

const Footer = () => {
    return (
        <footer className="bg-linear-to-b from-black to-zinc-950 border-t border-white/10 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    <Brand />

                    {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                        <FooterLink
                            key={category}
                            category={category}
                            links={links}
                        />
                    ))}
                </div>

                {/* Bottom Section */}
                <Copyright />
            </div>
        </footer>
    );
};

export default Footer;