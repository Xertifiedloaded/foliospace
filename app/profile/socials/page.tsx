"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface SocialMediaData {
  id: string;
  name: string;
  link: string;
  isVisible: boolean;
}

export default function SocialMediaSection() {
  const [socials, setSocials] = useState<SocialMediaData[]>([]);
  const { user } = useAuth();
  const userId = user?.id;
  const [newSocial, setNewSocial] = useState<
    Omit<SocialMediaData, "isVisible" | "id">
  >({
    name: "",
    link: "",
  });

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const response = await fetch(`/api/portfolio/socials?userId=${userId}`);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setSocials(data.socials || []);
        } else {
          console.error("Failed to fetch social media links.");
        }
      } catch (error) {
        console.error("Error fetching socials:", error);
      }
    };

    fetchSocials();
  }, [userId]);

  const addSocial = (e: React.FormEvent) => {
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
  
    fetch("/api/portfolio/socials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, ...formattedSocial }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSocials((prev) => [
            ...prev,
            { id: data.id, ...formattedSocial },
          ]);
          setNewSocial({ name: "", link: "" });
        } else {
          alert("Failed to add social media link.");
        }
      })
      .catch((error) => {
        console.error("Error adding social:", error);
        alert("An error occurred while adding the social media link.");
      });
  };
  

  const removeSocial = (id: string) => {
    fetch(`/api/portfolio/socials?id=${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSocials((prev) => prev.filter((social) => social.id !== id));
        } else {
          alert("Failed to remove social media link.");
        }
      })
      .catch((error) => {
        console.error("Error removing social:", error);
        alert("An error occurred while removing the social media link.");
      });
  };
  


  const toggleVisibility = (id: string) => {
    const social = socials.find((item) => item.id === id);
    if (!social) return;
  
    fetch(
      `/api/portfolio/socials?id=${id}&userId=${userId}&name=${social.name}&link=${social.link}&isVisible=${!social.isVisible}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setSocials((prev) =>
            prev.map((item) =>
              item.id === id ? { ...item, isVisible: !item.isVisible } : item
            )
          );
        } else {
          alert("Failed to update visibility.");
        }
      })
      .catch((error) => console.error("Error toggling visibility:", error));
  };
  
  

  return (
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
          <Button type="submit" variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Social Link
          </Button>
        </form>

        {socials.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-medium">Current Social Links</h3>
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
                    variant={social.isVisible ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleVisibility(social.id)}
                  >
                    {social.isVisible ? "Visible" : "Hidden"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSocial(social.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
