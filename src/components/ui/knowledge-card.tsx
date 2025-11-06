"use client";
import React from 'react';
import { KnowledgeDocument } from '../../types';
import { PreviewIcon, EditIcon, DeleteIcon, PdfFileIcon, DocxFileIcon, TxtFileIcon, ManualFileIcon } from '../icons/Icons';

interface KnowledgeCardProps {
  document: KnowledgeDocument;
  onPreview: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const getFileIcon = (type: KnowledgeDocument['type']) => {
    switch (type) {
        case 'pdf': return <PdfFileIcon />;
        case 'docx': return <DocxFileIcon />;
        case 'txt': return <TxtFileIcon />;
        case 'manual': return <ManualFileIcon />;
        default: return null;
    }
};

const StatusBadge: React.FC<{status: KnowledgeDocument['status']}> = ({ status }) => {
    const baseClasses = "absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-md";
    if (status === 'active') {
        return <div className={`${baseClasses} bg-green-100 text-green-700`}>✓ Active</div>;
    }
    if (status === 'processing') {
        return <div className={`${baseClasses} bg-purple-100 text-purple-700 animate-pulse`}>⚡ Processing</div>;
    }
    if (status === 'error') {
        return <div className={`${baseClasses} bg-red-100 text-red-700`}>✗ Error</div>;
    }
    return null;
}

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({ document, onPreview, onEdit, onDelete }) => {
  const isProcessing = document.status === 'processing';
  return (
    <div className={`neuro-card p-4 flex flex-col relative transition-transform hover:-translate-y-1.5 ${isProcessing && 'processing-shimmer'}`}>
        <StatusBadge status={document.status} />

        <div className="flex items-start gap-4">
            {getFileIcon(document.type)}
            <div className="flex-1 overflow-hidden">
                <h3 className="font-bold text-gray-800 truncate" title={document.title}>{document.title}</h3>
                 <span className="inline-block bg-[#F4A460]/20 text-[#D2691E] text-xs font-semibold px-2 py-0.5 rounded-md mt-1">
                    {document.category}
                </span>
            </div>
        </div>

        <div className="text-xs text-gray-500 mt-3 space-y-1">
            <p><strong>Size:</strong> {document.sizeMB} MB</p>
            <p><strong>Chunks:</strong> {document.chunks}</p>
            <p><strong>Updated:</strong> {document.lastUpdated}</p>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-300/50 flex-grow flex items-end">
             <div className="flex items-center justify-end w-full space-x-2">
                <button onClick={onPreview} title="Preview" className="neuro-button !p-0 !w-9 !h-9 !rounded-lg flex items-center justify-center"><PreviewIcon /></button>
                <button onClick={onEdit} title="Edit" className="neuro-button !p-0 !w-9 !h-9 !rounded-lg flex items-center justify-center"><EditIcon /></button>
                <button onClick={onDelete} title="Delete" className="neuro-button !p-0 !w-9 !h-9 !rounded-lg flex items-center justify-center hover:!text-red-500"><DeleteIcon /></button>
            </div>
        </div>
    </div>
  );
};

export default KnowledgeCard;
