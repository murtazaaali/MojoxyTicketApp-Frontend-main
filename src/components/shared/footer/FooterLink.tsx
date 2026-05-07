interface FooterLinkProps {
    category: string;
    links: string[];
}

const FooterLink = ({ category, links }: FooterLinkProps) => {
    return (
        <div>
            <h3 className="text-white font-semibold mb-4">{category}</h3>

            <ul className="space-y-3">
                {links.map((link) => (
                    <li key={link}>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-purple-500 text-sm transition-colors"
                        >
                            {link}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FooterLink;