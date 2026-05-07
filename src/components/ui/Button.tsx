interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    fullWidth?: boolean;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'submit' | 'reset' | 'button';
}

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    fullWidth,
    className = '',
    onClick,
    disabled,
    type
}: ButtonProps) => {

    const baseStyles =
        'font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ' +
        'disabled:opacity-50 disabled:cursor-not-allowed ' +
        'hover:-translate-y-0.5 active:translate-y-0 active:scale-95';

    const variants = {
        primary:
            'bg-gradient-to-r from-purple-500 to-indigo-500 ' +
            'hover:from-purple-600 hover:to-indigo-600 ' +
            'text-white shadow-md shadow-purple-500/30 ' +
            'hover:shadow-lg hover:shadow-purple-500/40 hover:scale-105',

        secondary:
            'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm ' +
            'border border-white/20 hover:border-white/40 ' +
            'hover:shadow-md hover:scale-105',

        outline:
            'border-2 border-purple-500 text-purple-500 ' +
            'hover:bg-purple-500 hover:text-white ' +
            'hover:shadow-md hover:scale-105',

        ghost:
            'text-gray-300 hover:bg-white/10 hover:text-white ' +
            'hover:scale-105',

        success:
            'bg-gradient-to-r from-green-500 to-emerald-500 ' +
            'hover:from-green-600 hover:to-emerald-600 ' +
            'text-white shadow-md shadow-green-500/30 ' +
            'hover:shadow-lg hover:shadow-green-500/40 hover:scale-105',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button
            className={`cursor-pointer ${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''
                } ${className}`}
            onClick={onClick}
            disabled={disabled}
            type={type || 'button'}
        >
            {icon && <span className="transition-transform duration-300 group-hover:scale-110">{icon}</span>}
            {children}
        </button>
    );
};

export default Button