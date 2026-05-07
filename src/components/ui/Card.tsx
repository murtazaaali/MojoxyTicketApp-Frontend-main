interface CardProps {
    children: React.ReactNode;
    hover?: boolean;
    className?: string;
}

const Card = ({ children, hover = true, className = '' }: CardProps) => {
    return (
        <div className={`bg-linear-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl ${hover ? 'hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1' : ''} ${className}`}>
            {children}
        </div>
    );
};

export default Card;