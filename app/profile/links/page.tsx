"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus, Link as LinkIcon } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { fetchUserPortfolio } from "@/hooks/use-api";

interface LinkData {
  url: string;
  text: string;
  portfolioId: string;
}

export default function LinksSection() {
  const { user } = useAuth();
  const [links, setLinks] = useState<LinkData[]>([]);
  const [newLink, setNewLink] = useState<{url: string, text: string}>({ 
    url: "", 
    text: "" 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      if (!user?.portfolioId) return;
      
      try {
        const { portfolio } = await fetchUserPortfolio(user?.username);
        if (portfolio?.links) {
          setLinks(portfolio.links);
        }
      } catch (err) {
        console.error("Failed to fetch links", err);
        setError("Could not load existing links");
      }
    };
    
    fetchLinks();
  }, [user?.username]);

  const addLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLink.url && newLink.text && user?.id) {
      const formattedLink: LinkData = {
        url: newLink.url.startsWith("http") 
          ? newLink.url 
          : `https://${newLink.url}`,
        text: newLink.text,
        portfolioId: user.portfolioId
      };

      setLinks([...links, formattedLink]);
      setNewLink({ url: "", text: "" });
    }
  };

  const removeLink = (linkToRemove: LinkData) => {
    setLinks(links.filter((link) => link !== linkToRemove));
  };

  const handleSubmit = async () => {
    if (!user?.portfolioId) {
      setError("No portfolio ID found");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(links)
      });

      if (response.ok) {
        console.log("Links updated successfully");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update links");
      }
    } catch (error) {
      console.error("Submission error", error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Important Links</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addLink} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>URL</Label>
              <Input
                value={newLink.url}
                onChange={(e) =>
                  setNewLink((prev) => ({ ...prev, url: e.target.value }))
                }
                placeholder="Enter website URL"
              />
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={newLink.text}
                onChange={(e) =>
                  setNewLink((prev) => ({ ...prev, text: e.target.value }))
                }
                placeholder="Link title"
              />
            </div>
          </div>
          <Button type="submit" variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Link
          </Button>
        </form>

        {links.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-medium">Current Links</h3>
            {links.map((link, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <div className="flex items-center space-x-2">
                  <LinkIcon className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">{link.text}</p>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      {link.url}
                    </a>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLink(link)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {links.length > 0 && (
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading}
            className="w-full mt-4"
          >
            {isLoading ? "Saving..." : "Save Links"}
          </Button>
        )}

        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
}