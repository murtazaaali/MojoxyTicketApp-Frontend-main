import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button, Card } from '../../ui';
import { ROUTES_PATHS } from '../../../routes/routes_path';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    // const handleSearch = () => navigate(`/events${query ? `?q=${encodeURIComponent(query)}` : ''}`);

    const handleSearch = () => navigate(`${ROUTES_PATHS.PUBLIC.EVENTS_LIST}${query ? `?search=${encodeURIComponent(query)}` : ''}`);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-5 relative z-30">
            {/* search bar */}
            <Card className="p-2">
                <div className="relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent border-none pl-14 pr-6 py-4 text-white placeholder-gray-400 focus:outline-none text-lg"
                    />
                    <Button
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        size="sm"
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </div>
            </Card>
        </div>

    );
};

export default SearchBar;