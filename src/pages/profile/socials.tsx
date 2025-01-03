"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import ProfileLayout from "@/components/layout";
import { IPhoneFrame } from "@/components/Preview";

interface SocialMediaData {
  id: string;
  name: string;
  link: string;
  isVisible: boolean;
}

export default function SocialMediaSection() {
  const [socials, setSocials] = useState<SocialMediaData[]>([]);
  const { data: session, status } = useSession();
  const [newSocial, setNewSocial] = useState<
    Omit<SocialMediaData, "isVisible" | "id">
  >({
    name: "",
    link: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userId = session?.user?.id;

  useEffect(() => {
    const fetchSocials = async () => {
      if (!userId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/portfolio/socials?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setSocials(data.socials || []);
        } else {
          setError("Failed to fetch social media links.");
        }
      } catch (error) {
        setError("Error fetching socials: " + error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchSocials();
    }
  }, [session, status, userId]);

  const addSocial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSocial.name.trim() || !newSocial.link.trim()) {
      alert("Please complete all fields with valid data.");
      return;
    }

    const formattedSocial: Omit<SocialMediaData, "id"> = {
      ...newSocial,
      isVisible: true,
      link: newSocial.link.startsWith("http")
        ? newSocial.link
        : `https://${newSocial.link}`,
    };

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/portfolio/socials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...formattedSocial }),
      });
      const data = await res.json();
      if (data.success) {
        setSocials((prev) => [...prev, { id: data.id, ...formattedSocial }]);
        setNewSocial({ name: "", link: "" });
      } else {
        alert("Failed to add social media link.");
      }
    } catch (error) {
      setError("An error occurred while adding the social media link.");
    } finally {
      setLoading(false);
    }
  };

  const removeSocial = async (id: string) => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/portfolio/socials?id=${id}&userId=${userId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.success) {
        setSocials((prev) => prev.filter((social) => social.id !== id));
      } else {
        alert("Failed to remove social media link.");
      }
    } catch (error) {
      setError("An error occurred while removing the social media link.");
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (id: string) => {
    const social = socials.find((item) => item.id === id);
    if (!social || !userId) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/portfolio/socials`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name: social.name,
          link: social.link,
          isVisible: !social.isVisible,
          userId: userId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSocials((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, isVisible: !item.isVisible } : item
          )
        );
      } else {
        alert("Failed to update visibility.");
      }
    } catch (error) {
      setError("Error toggling visibility.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileLayout>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={addSocial} className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Name</Label>
                        <Input
                          value={newSocial.name}
                          onChange={(e) =>
                            setNewSocial((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Enter platform name"
                        />
                      </div>
                      <div>
                        <Label>Profile Link</Label>
                        <Input
                          value={newSocial.link}
                          onChange={(e) =>
                            setNewSocial((prev) => ({
                              ...prev,
                              link: e.target.value,
                            }))
                          }
                          placeholder="Full profile URL"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      variant="outline"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? (
                        "Adding..."
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" /> Add Social Link
                        </>
                      )}
                    </Button>
                  </form>

                  {error && <p className="text-red-500 mt-4">{error}</p>}
                </CardContent>
              </Card>
            </div>
            <div className="relative">
              <div className="sticky top-2">
                <IPhoneFrame>
                  {loading ? (
                    <div className="space-y-6">
                      {/* Skeleton loader for each social link */}
                      {[...Array(3)].map((_, idx) => (
                        <div
                          key={idx}
                          className="animate-pulse flex justify-between items-center bg-gray-100 p-2 rounded"
                        >
                          <div className="w-24 h-4 bg-gray-300 rounded"></div>
                          <div className="w-12 h-4 bg-gray-300 rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    socials.length > 0 && (
                      <div className="space-y-6">
                        <h3 className="text-sm font-medium">
                          Current Social Links
                        </h3>
                        {socials.map((social) => (
                          <div
                            key={social.id}
                            className="flex justify-between items-center bg-gray-100 p-2 rounded"
                          >
                            <div className="flex items-center space-x-2">
                              <div>
                                <a
                                  href={social.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-600 hover:underline"
                                >
                                  {social.name}
                                </a>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant={
                                  social.isVisible ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => toggleVisibility(social.id)}
                                disabled={loading}
                              >
                                {social.isVisible ? "Visible" : "Hidden"}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeSocial(social.id)}
                                disabled={loading}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </IPhoneFrame>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
