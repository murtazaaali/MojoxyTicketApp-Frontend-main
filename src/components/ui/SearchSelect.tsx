import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronRight, X, Check } from "lucide-react";

export interface SearchSelectOption {
    value: string;
    label: string;
    sublabel?: string;
    badge?: string;
}

interface SearchSelectProps {
    label?: string;
    icon?: React.ReactNode;
    placeholder?: string;
    options: SearchSelectOption[];
    value: string;
    onChange: (value: string) => void;
    onSearch?: (query: string) => void | Promise<void>;
    isLoading?: boolean;
    error?: string;
    className?: string;
    debounceMs?: number;
    emptyMessage?: string;
}

const SearchSelect = ({
    label,
    icon,
    placeholder = "Search...",
    options,
    value,
    onChange,
    onSearch,
    isLoading = false,
    error,
    className = "",
    debounceMs = 300,
    emptyMessage = "No results found",
}: SearchSelectProps) => {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const selectedOption = options.find((o) => o.value === value);

    const filteredOptions = onSearch
        ? options
        : options.filter(
            (o) =>
                o.label.toLowerCase().includes(query.toLowerCase()) ||
                o.sublabel?.toLowerCase().includes(query.toLowerCase()) ||
                o.badge?.toLowerCase().includes(query.toLowerCase())
        );

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const q = e.target.value;
            setQuery(q);
            setHighlightedIndex(-1);

            if (onSearch) {
                if (debounceRef.current) clearTimeout(debounceRef.current);
                debounceRef.current = setTimeout(() => onSearch(q), debounceMs);
            }
        },
        [onSearch, debounceMs]
    );

    const handleSelect = (option: SearchSelectOption) => {
        onChange(option.value);
        setQuery("");
        setIsOpen(false);
        inputRef.current?.blur();
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange("");
        setQuery("");
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === "ArrowDown" || e.key === "Enter") setIsOpen(true);
            return;
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter" && highlightedIndex >= 0) {
            e.preventDefault();
            handleSelect(filteredOptions[highlightedIndex]);
        } else if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    const highlightMatch = (text: string) => {
        if (!query) return text;
        const idx = text.toLowerCase().indexOf(query.toLowerCase());
        if (idx === -1) return text;
        return (
            <>
                {text.slice(0, idx)}
                <mark className="bg-purple-500/25 text-inherit rounded-sm">
                    {text.slice(idx, idx + query.length)}
                </mark>
                {text.slice(idx + query.length)}
            </>
        );
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-300">
                    {label}
                </label>
            )}

            <div className="relative">
                {/* Input row */}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none">
                            {icon}
                        </div>
                    )}

                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={selectedOption ? selectedOption.label : placeholder}
                        value={query}
                        onChange={handleInputChange}
                        onFocus={() => setIsOpen(true)}
                        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
                        onKeyDown={handleKeyDown}
                        className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 ${icon ? "pl-12" : ""} pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all ${selectedOption ? "placeholder-white" : ""}`}
                    />

                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        {isLoading && (
                            <div className="w-4 h-4 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                        )}
                        {value && !isLoading && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="text-gray-400 hover:text-white transition-colors p-0.5 rounded"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                        {!value && !isLoading && (
                            <ChevronRight className="w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
                        )}
                    </div>
                </div>

                {/* Selected pill */}
                {selectedOption && !isOpen && (
                    <div className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-lg text-sm text-purple-300">
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{selectedOption.label}</span>
                        {selectedOption.badge && (
                            <span className="ml-auto text-xs bg-purple-500/20 px-2 py-0.5 rounded-full shrink-0">
                                {selectedOption.badge}
                            </span>
                        )}
                        <button
                            type="button"
                            onClick={handleClear}
                            className="ml-auto shrink-0 hover:text-white transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                )}

                {/* Dropdown */}
                {isOpen && (
                    <div
                        ref={dropdownRef}
                        className="absolute top-full mt-1.5 left-0 right-0 z-50 bg-zinc-900 border border-white/10 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2 py-6 text-gray-400 text-sm">
                                <div className="w-4 h-4 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                                Searching...
                            </div>
                        ) : filteredOptions.length === 0 ? (
                            <div className="py-6 text-center text-gray-500 text-sm">
                                {emptyMessage}
                            </div>
                        ) : (
                            filteredOptions.map((option, idx) => (
                                <div
                                    key={option.value}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        handleSelect(option);
                                    }}
                                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-white/5 last:border-0 transition-colors
                                        ${idx === highlightedIndex ? "bg-purple-500/15" : "hover:bg-white/5"}
                                        ${option.value === value ? "bg-purple-500/10" : ""}
                                    `}
                                >
                                    {option.value === value && (
                                        <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                                    )}
                                    <div className={`min-w-0 ${option.value === value ? "" : "pl-5"}`}>
                                        <p className="text-sm font-medium text-white truncate">
                                            {highlightMatch(option.label)}
                                        </p>
                                        {option.sublabel && (
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                {option.sublabel}
                                            </p>
                                        )}
                                    </div>
                                    {option.badge && (
                                        <span className="ml-auto shrink-0 text-xs font-semibold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/20">
                                            {option.badge}
                                        </span>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
    );
};

export default SearchSelect;