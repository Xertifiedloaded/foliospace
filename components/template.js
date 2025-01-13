import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import SettingsLayout from "./SettingsLayout";
import { useToast } from "../hooks/use-toast";

const TemplateSelector = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleTemplateChange = async (value) => {
    setLoading(true);

    try {
      const response = await axios.put("/api/user/template", {
        template: value,
      });

      if (response.status === 200) {
        toast({
          title: "Template Updated",
          description: `The template has been successfully updated to ${value}.`,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description:
          "An error occurred while updating the template. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="w-[50%]">
      <Select
        className="border border-white"
        onValueChange={handleTemplateChange}
        disabled={loading}
      >
        <SelectTrigger id="template" className="w-full">
          <SelectValue placeholder="Select a template" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="BASIC">Basic</SelectItem>
          <SelectItem value="MODERN">Modern</SelectItem>
          <SelectItem value="PROFESSIONAL">Professional</SelectItem>
          <SelectItem value="MINIMAL">Minimal</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TemplateSelector;
