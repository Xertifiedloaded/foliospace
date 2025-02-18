"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, LinkIcon, ExternalLink } from "lucide-react";
import ProfileLayout from "@/components/layout";
import { LinksDisplay } from "@/components/views/LinkDisplay";
import { IPhoneFrame } from "@/components/Preview";

interface LinkData {
  id?: string;
  userId: string;
  url: string;
  text: string;
}

export default function LinksSection() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [links, setLinks] = useState<LinkData[]>([]);
  const [newLink, setNewLink] = useState<{ url: string; text: string }>({
    url: "",
    text: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      if (!userId) return;
      setIsFetching(true);
      try {
        const response = await fetch(`/api/portfolio/links`);
        if (!response.ok) throw new Error("Failed to fetch links");
        const fetchedLinks = await response.json();
        setLinks(fetchedLinks);
      } catch (err) {
        console.error("Failed to fetch links", err);
        setError("Could not load existing links");
      } finally {
        setIsFetching(false);
      }
    };
    fetchLinks();
  }, [userId]);

  const addLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newLink.url && newLink.text && userId) {
      setIsLoading(true);
      try {
        const formattedLink = {
          userId,
          url: newLink.url.startsWith("http")
            ? newLink.url
            : `https://${newLink.url}`,
          text: newLink.text,
        };
        const response = await fetch("/api/portfolio/links", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedLink),
        });
        if (!response.ok) throw new Error("Failed to add link");
        const addedLink = await response.json();
        setLinks([...links, addedLink]);
        setNewLink({ url: "", text: "" });
      } catch (err) {
        console.error("Error adding link", err);
        setError("Could not add link");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const removeLink = async (linkToRemove: LinkData) => {
    try {
      const response = await fetch(
        `/api/portfolio/links?linkId=${linkToRemove.id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete link");
      setLinks(links.filter((link) => link.id !== linkToRemove.id));
    } catch (err) {
      console.error("Error removing link", err);
      setError("Could not remove link");
    }
  };

  return (
    <ProfileLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Manage Your Links</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-2xl">Add New Link</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={addLink} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      <LinkIcon className="h-4 w-4" />
                    </span>
                    <Input
                      id="url"
                      value={newLink.url}
                      onChange={(e) =>
                        setNewLink((prev) => ({ ...prev, url: e.target.value }))
                      }
                      placeholder="Enter website URL"
                      className="rounded-l-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="text">Title</Label>
                  <Input
                    id="text"
                    value={newLink.text}
                    onChange={(e) =>
                      setNewLink((prev) => ({ ...prev, text: e.target.value }))
                    }
                    placeholder="Link title"
                  />
                </div>
                <Button variant='default' type="submit" className="w-full  text-black font-bold" disabled={isLoading}>
                  {isLoading ? "Adding..." : "Add Link"}
                </Button>
              </form>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Your Links</CardTitle>
              </CardHeader>
              <CardContent>
                {isFetching ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-10 bg-gray-200 animate-pulse rounded"
                      />
                    ))}
                  </div>
                ) : links.length === 0 ? (
                  <p className="text-center text-gray-500">
                    No links added yet
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li
                        key={link.id}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <div className="flex items-center space-x-2">
                          <ExternalLink className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-black font-medium">
                            {link.text}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLink(link)}
                        >
                          <X className="h-4 text-black font-bold w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            <IPhoneFrame>
              <LinksDisplay links={links} removeLink={removeLink} />
            </IPhoneFrame>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
