'use client';

/**
 * AI-Powered Search Page
 * Semantic search across YPI content
 */

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AISearchBar } from '@/components/ai/AISearchBar';
import { SearchResults } from '@/components/ai/SearchResults';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  url: string;
  source: string;
  type: string;
  score: number;
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await fetch('/api/ai/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery.trim(),
          limit: 10,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResults(data.results);
      } else {
        setError(data.error || 'Search failed');
      }
    } catch {
      setError('Unable to perform search. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy via-navy-600 to-navy-700 text-white py-12">
        <div className="container max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Search className="h-8 w-8 text-gold" />
            <h1 className="text-3xl md:text-4xl font-bold">Search</h1>
          </div>
          <p className="text-center text-gray-300 mb-8">
            Find information about our services, careers, projects, and more
          </p>

          <AISearchBar
            placeholder="Search YPI services, careers, sustainability..."
            onSearch={performSearch}
            autoFocus={!initialQuery}
            className="max-w-2xl mx-auto"
          />
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="container max-w-4xl">
          {error && (
            <Card className="border-red-200 bg-red-50 mb-6">
              <CardContent className="py-4">
                <p className="text-red-800">{error}</p>
              </CardContent>
            </Card>
          )}

          {hasSearched ? (
            <SearchResults results={results} query={initialQuery} isLoading={isLoading} />
          ) : (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Start Searching</h2>
              <p className="text-gray-500">
                Enter your search query above to find relevant information across our website
              </p>

              <div className="mt-8 grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => performSearch('drilling services')}>
                  <CardContent className="py-6 text-center">
                    <p className="font-medium text-navy">Drilling Services</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => performSearch('career opportunities')}>
                  <CardContent className="py-6 text-center">
                    <p className="font-medium text-navy">Career Opportunities</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => performSearch('sustainability')}>
                  <CardContent className="py-6 text-center">
                    <p className="font-medium text-navy">Sustainability</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>


    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
