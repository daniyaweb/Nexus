import React from 'react';
import { FileText, Upload, Download, Trash2, Share2 } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

const initialDocuments = [
  { id: 1, name: 'Pitch Deck 2024.pdf', type: 'PDF', size: '2.4 MB', lastModified: '2024-02-15', shared: true, status: 'In Review' },
  { id: 2, name: 'Financial Projections.xlsx', type: 'Spreadsheet', size: '1.8 MB', lastModified: '2024-02-10', shared: false, status: 'Draft' },
  { id: 3, name: 'Business Plan.docx', type: 'Document', size: '3.2 MB', lastModified: '2024-02-05', shared: true, status: 'Signed' },
  { id: 4, name: 'Market Research.pdf', type: 'PDF', size: '5.1 MB', lastModified: '2024-01-28', shared: false, status: 'Draft' }
];

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = React.useState(initialDocuments);
  const [showSignModal, setShowSignModal] = React.useState(false);
  const [selectedDoc, setSelectedDoc] = React.useState<number | null>(null);
  const [signature, setSignature] = React.useState('');
  const [previewDoc, setPreviewDoc] = React.useState<typeof initialDocuments[0] | null>(null);

  const handleStatusChange = (id: number, status: string) => {
    setDocuments(documents.map(doc => doc.id === id ? { ...doc, status } : doc));
  };

  const handleSign = (id: number) => {
    setSelectedDoc(id);
    setShowSignModal(true);
  };

  const handleConfirmSign = () => {
    if (selectedDoc && signature.trim()) {
      handleStatusChange(selectedDoc, 'Signed');
      setShowSignModal(false);
      setSignature('');
      setSelectedDoc(null);
    } else {
      alert('Please enter your signature');
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDoc = {
        id: documents.length + 1,
        name: file.name,
        type: file.type.includes('pdf') ? 'PDF' : 'Document',
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        lastModified: new Date().toISOString().split('T')[0],
        shared: false,
        status: 'Draft'
      };
      setDocuments([...documents, newDoc]);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">Manage your startup's important files</p>
        </div>
        <label className="cursor-pointer">
          <input type="file" className="hidden" onChange={handleUpload} accept=".pdf,.doc,.docx,.xlsx" />
          <Button leftIcon={<Upload size={18} />} onClick={() => { }}>
            Upload Document
          </Button>
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Storage info */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Storage</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Used</span>
                <span className="font-medium text-gray-900">12.5 GB</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-primary-600 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Available</span>
                <span className="font-medium text-gray-900">7.5 GB</span>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Quick Access</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">Recent Files</button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">Shared with Me</button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">Starred</button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">Trash</button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Document list */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">All Documents</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Sort by</Button>
                <Button variant="outline" size="sm">Filter</Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-2">
                {documents.map(doc => (
                  <div key={doc.id} className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <div className="p-2 bg-primary-50 rounded-lg mr-4">
                      <FileText size={24} className="text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3
                          className="text-sm font-medium text-gray-900 truncate cursor-pointer hover:text-primary-600"
                          onClick={() => setPreviewDoc(doc)}
                        >
                          {doc.name}
                        </h3>
                        {doc.shared && <Badge variant="secondary" size="sm">Shared</Badge>}
                        <Badge
                          variant={doc.status === 'Signed' ? 'success' : doc.status === 'In Review' ? 'warning' : 'gray'}
                          size="sm"
                        >
                          {doc.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span>{doc.type}</span>
                        <span>{doc.size}</span>
                        <span>Modified {doc.lastModified}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="ghost" size="sm" className="p-2" aria-label="Download">
                        <Download size={18} />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2" aria-label="Share">
                        <Share2 size={18} />
                      </Button>
                      {doc.status !== 'Signed' && (
                        <Button variant="outline" size="sm" onClick={() => handleSign(doc.id)}>
                          Sign
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 text-error-600 hover:text-error-700"
                        aria-label="Delete"
                        onClick={() => setDocuments(documents.filter(d => d.id !== doc.id))}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Signature Modal */}
      {showSignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Sign Document</h2>
            <p className="text-sm text-gray-600 mb-4">Type your full name as your signature</p>
            <input
              type="text"
              placeholder="Your full name"
              value={signature}
              onChange={e => setSignature(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
            />
            {signature && (
              <div className="border border-gray-200 rounded-md p-4 mb-4 bg-gray-50">
                <p className="text-center text-2xl text-primary-700 italic">{signature}</p>
              </div>
            )}
            <div className="flex gap-3">
              <Button onClick={handleConfirmSign} fullWidth>Confirm Signature</Button>
              <Button variant="outline" onClick={() => setShowSignModal(false)} fullWidth>Cancel</Button>
            </div>
          </div>
        </div>
      )}
      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Document Preview</h2>
              <button onClick={() => setPreviewDoc(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 mb-4 text-center border border-gray-200">
              <FileText size={48} className="text-primary-600 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">{previewDoc.name}</h3>
              <div className="flex justify-center gap-4 mt-2 text-sm text-gray-500">
                <span>{previewDoc.type}</span>
                <span>{previewDoc.size}</span>
                <span>Modified {previewDoc.lastModified}</span>
              </div>
              <div className="mt-4">
                <Badge
                  variant={previewDoc.status === 'Signed' ? 'success' : previewDoc.status === 'In Review' ? 'warning' : 'gray'}
                >
                  {previewDoc.status}
                </Badge>
              </div>
              <div className="mt-6 bg-white border border-gray-200 rounded p-4 text-left">
                <p className="text-sm text-gray-400 text-center">[ Document content preview would appear here ]</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button fullWidth onClick={() => setPreviewDoc(null)}>Close</Button>
              {previewDoc.status !== 'Signed' && (
                <Button variant="outline" fullWidth onClick={() => { handleSign(previewDoc.id); setPreviewDoc(null); }}>
                  Sign Document
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};