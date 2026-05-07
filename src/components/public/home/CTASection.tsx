import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { ROUTES_PATHS } from '../../../routes/routes_path';
import { Button, Card } from '../../ui';

const CTASection = () => (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <Card className="relative overflow-hidden p-12 text-center">
                <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 to-purple-500/20" />
                <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
                    <div>
                        <h2 className="text-4xl font-bold text-white">Host Your Own Event</h2>
                        <p className="text-xl text-gray-300">
                            Share your passion with the world. Create and manage events with our powerful platform.
                        </p>
                    </div>
                    <Link to={ROUTES_PATHS.USER.CREATE_EVENT}>
                        <Button size="lg" icon={<Plus className="w-5 h-5" />}>
                            Create Your Event
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    </section>
);

export default CTASection;