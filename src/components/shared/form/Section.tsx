interface SectionProps {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

const Section = ({ title, icon, children, className = "bg-white/5 border-white/10" }: SectionProps) => (
    <div className={`rounded-xl p-6 border ${className}`}>
        <h3 className="text-xl font-semibold mb-4 text-white/90 flex items-center gap-2">
            {icon}
            {title}
        </h3>
        {children}
    </div>
);

export default Section;