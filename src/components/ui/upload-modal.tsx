"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloseIcon, CloudUploadIcon } from '../icons/Icons';

interface UploadModalProps {
  onClose: () => void;
  onUpload: (files: File[], title: string, category: string, content: string) => void;
  categories: string[];
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUpload, categories }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(categories[0] || '');
    const [content, setContent] = useState('');
    
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(prev => [...prev, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'text/plain': ['.txt'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        }
    });

    const handleSubmit = () => {
        onUpload(files, title, category, content);
    };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="neuro-card w-full max-w-2xl max-h-[90vh] flex flex-col fade-in-up">
        <header className="flex justify-between items-center p-6 border-b border-gray-300/50 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800">Upload Knowledge Content</h2>
          <button onClick={onClose} className="neuro-button !rounded-full !w-10 !h-10 !p-0 flex items-center justify-center">
            <CloseIcon className="w-5 h-5"/>
          </button>
        </header>

        <main className="p-6 flex-1 overflow-y-auto space-y-6 no-scrollbar">
            <div {...getRootProps()} className={`p-8 text-center rounded-2xl border-2 border-dashed  transition-all duration-300 cursor-pointer
                ${isDragActive 
                    ? 'border-[#F4A460] bg-[#F4A460]/20 scale-105' 
                    : 'border-[#F4A460]/50 hover:border-[#F4A460] hover:bg-[#F4A460]/10'}`
                }>
                <input {...getInputProps()} />
                <CloudUploadIcon />
                <p className="mt-4 font-semibold text-gray-700">Drag & drop files here, or click to browse</p>
                <p className="text-xs text-gray-500 mt-1">Supported: PDF, TXT, DOCX (Max 10MB)</p>
            </div>

            {files.length > 0 && (
                <div>
                    <h4 className="font-semibold text-sm mb-2">Selected Files:</h4>
                    <ul className="space-y-1 text-sm">
                        {files.map((file, i) => <li key={i} className="bg-gray-200/50 p-2 rounded-md">{file.name}</li>)}
                    </ul>
                </div>
            )}

            <div className="flex items-center gap-4">
                <hr className="flex-1 border-gray-300/50" />
                <span className="text-sm font-bold text-gray-400">OR</span>
                <hr className="flex-1 border-gray-300/50" />
            </div>
            
            <div className="space-y-4">
                <h3 className="font-bold text-gray-800">Add Manual Entry</h3>
                <div>
                    <label className="text-sm font-medium text-gray-600 mb-1 block">Title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Business Hours" className="neuro-input" />
                </div>
                 <div>
                    <label className="text-sm font-medium text-gray-600 mb-1 block">Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} className="neuro-input appearance-none">
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-600 mb-1 block">Content</label>
                    <textarea value={content} onChange={e => setContent(e.target.value)} rows={5} placeholder="Enter your knowledge base content..." className="neuro-textarea"></textarea>
                </div>
            </div>

        </main>
        
        <footer className="flex justify-end items-center gap-4 p-6 border-t border-gray-300/50 flex-shrink-0">
          <button onClick={onClose} className="neuro-button">Cancel</button>
          <button onClick={handleSubmit} className="neuro-button-namib-gold">Upload & Process</button>
        </footer>
      </div>
    </div>
  );
};

export default UploadModal;
