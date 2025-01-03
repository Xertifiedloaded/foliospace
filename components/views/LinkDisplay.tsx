"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus, Link as LinkIcon } from "lucide-react";
import ProfileLayout from "@/components/layout";

interface LinkData {
  id?: string;
  userId: string;
  url: string;
  text: string;
}

export const LinksDisplay: React.FC<{
  links: LinkData[];
  removeLink: (link: LinkData) => void;
}> = ({ links, removeLink }) => {
  if (links?.length === 0) return null;

  return (
    <div className="space-y-6 ">
      <h3 className="text-sm font-medium">Current Links</h3>
      {links?.map((link) => (
        <div
          key={link?.id}
          className="flex justify-between items-center bg-gray-100 p-2 rounded"
        >
          <div className="flex items-center space-x-2">
            <LinkIcon className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium">{link?.text}</p>
              <a
                href={link?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline"
              >
                {link?.url}
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
  );
};