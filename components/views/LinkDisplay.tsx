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
    <div className="space-y-4">
    <h3 className="text-lg font-semibold">Your Links</h3>
    {links?.map((link) => (
      <div
        key={link?.id}
        className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-all"
      >
        <div className="flex items-center space-x-3">
          <LinkIcon className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">{link?.text}</p>
            <a
              href={link?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:underline"
            >
              {link?.url}
            </a>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500"
          onClick={() => removeLink(link)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    ))}
  </div>
  );
};