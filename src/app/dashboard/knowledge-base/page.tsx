"use client";

import React, { useState } from 'react';
import { KnowledgeDocument, KnowledgeStats, Category } from '../../../types';
import CategorySidebar from '../../../components/ui/category-sidebar';
import KnowledgeCard from '../../../components/ui/knowledge-card';
import UploadModal from '../../../components/ui/upload-modal';
import { 
    UploadIcon, 
    DocumentIcon, 
    ChunksIcon, 
    CategoryIcon as StatsCategoryIcon,
    ClockIcon,
    AllDocsIcon,
    BuildingIcon,
    ProductsIcon,
    FaqIcon,
    PolicyIcon,
    LocationIcon
} from '../../../components/icons/Icons';

// Mock Data
const MOCK_DOCUMENTS: KnowledgeDocument[] = [
  { id: '1', title: 'Company Overview.pdf', type: 'pdf', category: 'Business Info', sizeMB: 2.3, chunks: 45, lastUpdated: '2 days ago', status: 'active' },
  { id: '2', title: 'Frequently Asked Questions', type: 'manual', category: 'FAQs', sizeMB: 0.1, chunks: 15, lastUpdated: '1 week ago', status: 'active' },
  { id: '3', title: 'Product Catalog 2025.docx', type: 'docx', category: 'Products & Services', sizeMB: 5.1, chunks: 127, lastUpdated: '3 days ago', status: 'processing' },
  { id: '4', title: 'Business Hours & Locations', type: 'manual', category: 'Contact & Location', sizeMB: 0.05, chunks: 3, lastUpdated: '1 month ago', status: 'active' },
  { id: '5', title: 'Return Policy.txt', type: 'txt', category: 'Policies', sizeMB: 0.2, chunks: 5, lastUpdated: '5 days ago', status: 'active' },
  { id: '6', title: 'API Documentation.pdf', type: 'pdf', category: 'Products & Services', sizeMB: 8.9, chunks: 250, lastUpdated: '1 hour ago', status: 'error' },
];

const MOCK_STATS: KnowledgeStats = {
  totalDocuments: 24,
  knowledgeChunks: 1247,
  categories: 8,
  lastUpdated: '2 hrs ago',
};

const MOCK_CATEGORIES: Category[] = [
    { name: 'All Documents', count: 24, icon: AllDocsIcon },
    { name: 'Business Info', count: 5, icon: BuildingIcon },
    { name: 'Products & Services', count: 8, icon: ProductsIcon },
    { name: 'FAQs', count: 6, icon: FaqIcon },
    { name: 'Policies', count: 3, icon: PolicyIcon },
    { name: 'Contact & Location', count: 2, icon: LocationIcon },
]

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; change: string; }> = ({ icon, label, value, change }) => (
    <div className="neuro-card p-4 sm:p-6 flex items-start gap-4 transition-transform hover:-translate-y-1">
        <div className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center text-white" style={{background: 'var(--namib-gold-gradient)'}}>
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">{value}</p>
            <p className="text-xs text-green-600 mt-1">{change}</p>
        </div>
    </div>
);


export default function KnowledgeBasePage() {
    const [documents, setDocuments] = useState<KnowledgeDocument[]>(MOCK_DOCUMENTS);
    const [stats, setStats] = useState<KnowledgeStats>(MOCK_STATS);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All Documents');

    const handleUpload = (files: File[], title: string, category: string, content: string) => {
        console.log('Uploading:', { files, title, category, content });
        // Here you would call your API to upload/create documents
        setIsUploadModalOpen(false);
    };

    return (
        <div className="flex-1 flex flex-col h-screen">
            <header className="sticky top-0 z-10 bg-[#E0E0E0]/80 backdrop-blur-md p-4 sm:p-6 border-b border-white/80 shadow-[0_4px_8px_rgba(163,163,163,0.1)]">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Knowledge Base</h1>
                        <p className="text-sm text-gray-500">Manage your AI's knowledge and training data</p>
                    </div>
                    <button onClick={() => setIsUploadModalOpen(true)} className="neuro-button-namib-gold flex items-center gap-2 !py-2.5 !px-4">
                        <UploadIcon />
                        <span className="hidden sm:inline">Upload New File</span>
                    </button>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto no-scrollbar">
                <section className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard icon={<DocumentIcon />} label="Total Documents" value={stats.totalDocuments} change="+3 this week" />
                        <StatCard icon={<ChunksIcon />} label="Knowledge Chunks" value={stats.knowledgeChunks.toLocaleString()} change="+156 this week" />
                        <StatCard icon={<StatsCategoryIcon />} label="Categories" value={stats.categories} change="2 active" />
                        <StatCard icon={<ClockIcon />} label="Last Updated" value={stats.lastUpdated} change="Auto-sync enabled" />
                    </div>
                </section>

                <main className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
                    <CategorySidebar 
                        categories={MOCK_CATEGORIES} 
                        activeCategory={activeCategory} 
                        onCategorySelect={setActiveCategory}
                    />

                    <div className="w-full">
                         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {documents.map(doc => (
                                <KnowledgeCard 
                                    key={doc.id} 
                                    document={doc}
                                    onPreview={() => console.log('Preview', doc.id)}
                                    onEdit={() => console.log('Edit', doc.id)}
                                    onDelete={() => console.log('Delete', doc.id)}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
            
            {isUploadModalOpen && (
                <UploadModal 
                    onClose={() => setIsUploadModalOpen(false)} 
                    onUpload={handleUpload}
                    categories={MOCK_CATEGORIES.filter(c => c.name !== 'All Documents').map(c => c.name)}
                />
            )}
        </div>
    );
}
