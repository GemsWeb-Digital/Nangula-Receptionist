export type KnowledgeDocumentStatus = 'active' | 'processing' | 'error';
export type KnowledgeDocumentType = 'pdf' | 'docx' | 'txt' | 'manual';

export interface KnowledgeDocument {
  id: string;
  title: string;
  type: KnowledgeDocumentType;
  category: string;
  sizeMB: number;
  chunks: number;
  lastUpdated: string;
  status: KnowledgeDocumentStatus;
}

export interface Category {
  name: string;
  count: number;
  icon: React.ComponentType;
}

export interface KnowledgeStats {
    totalDocuments: number;
    knowledgeChunks: number;
    categories: number;
    lastUpdated: string;
}
