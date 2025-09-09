'use client';

import React, { useState } from 'react';
import { AuthProvider, useRequireAuth } from '@/components/auth/AuthContext';
import AccountSidebar from '@/components/auth/AccountSidebar';
import { Download, FileText, Calendar, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DownloadItem {
  id: string;
  type: 'invoice' | 'receipt' | 'certificate' | 'guide';
  title: string;
  description: string;
  date: string;
  fileSize: string;
  downloadUrl: string;
}

// Initialize with no downloads; real data will populate later
const initialDownloads: DownloadItem[] = [];

function DownloadsContent() {
  const { user, loading } = useRequireAuth();
  const [downloads, setDownloads] = useState<DownloadItem[]>(initialDownloads);
  const [filter, setFilter] = useState<string>('all');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your downloads...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Load invoices as downloads
  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/account/invoices?userId=${encodeURIComponent(user.id)}`);
        const data = await res.json();
        if (Array.isArray(data.invoices)) {
          setDownloads(
            data.invoices.map((inv: any) => ({
              id: inv.id,
              type: 'invoice',
              title: `Invoice ${inv.number || inv.id}`,
              description: new Date(inv.created).toLocaleDateString(),
              date: new Date(inv.created).toLocaleDateString(),
              fileSize: '',
              downloadUrl: inv.invoice_pdf || inv.hosted_invoice_url || '#',
            }))
          );
        }
      } catch {}
    })();
  }, [user.id]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'invoice':
      case 'receipt':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'certificate':
        return <FileText className="w-5 h-5 text-green-600" />;
      case 'guide':
        return <FileText className="w-5 h-5 text-purple-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'invoice':
      case 'receipt':
        return 'bg-blue-100 text-blue-800';
      case 'certificate':
        return 'bg-green-100 text-green-800';
      case 'guide':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDownloads = downloads.filter(item => 
    filter === 'all' || item.type === filter
  );

  const handleDownload = (item: DownloadItem) => {
    // In a real app, you would handle the actual download here
    // This might involve creating a signed URL or streaming the file
    console.log(`Downloading ${item.title}`);
    
    // Simulate download
    const link = document.createElement('a');
    link.href = item.downloadUrl;
    link.download = `${item.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <AccountSidebar />
          </div>

          {/* Downloads Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Download className="w-5 h-5 mr-2 text-green-600" />
                    Your Downloads ({filteredDownloads.length})
                  </h2>
                  <div className="flex items-center space-x-4">
                    <select 
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="all">All Files</option>
                      <option value="invoice">Invoices</option>
                      <option value="receipt">Receipts</option>
                      <option value="certificate">Certificates</option>
                      <option value="guide">Guides</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredDownloads.map((item) => (
                  <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getTypeIcon(item.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {item.title}
                            </h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getTypeColor(item.type)}`}>
                              {item.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {item.description}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 space-x-4">
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {item.date}
                            </div>
                            <div className="flex items-center">
                              <Download className="w-3 h-3 mr-1" />
                              {item.fileSize}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button
                          onClick={() => handleDownload(item)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 flex items-center"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredDownloads.length === 0 && (
                <div className="p-12 text-center">
                  <Download className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {filter === 'all' ? 'No downloads available' : `No ${filter}s available`}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {filter === 'all' 
                      ? 'Your invoices, receipts, and guides will appear here when available.'
                      : `Your ${filter}s will appear here when available.`
                    }
                  </p>
                  {filter !== 'all' && (
                    <Button
                      variant="outline"
                      onClick={() => setFilter('all')}
                    >
                      Show All Files
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Help Section */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Need help with downloads?
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Invoices are available 1-2 hours after your order is processed</li>
                      <li>Receipts can be downloaded immediately after payment</li>
                      <li>Guides and certificates are added to your account automatically</li>
                      <li>All files are available for download for 2 years</li>
                    </ul>
                  </div>
                  <div className="mt-3">
                    <Button variant="outline" size="sm">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DownloadsPage() {
  return (
    <AuthProvider>
      <DownloadsContent />
    </AuthProvider>
  );
}