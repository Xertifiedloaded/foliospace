import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "../../../hooks/use-toast";
import SettingsLayout from "../../../components/SettingsLayout";

const TemplateSelector = () => {
  const [template, setTemplate] = useState("BASIC");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false); // To prevent hydration errors

  // To ensure that loading state isn't rendered until the client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleTemplateChange = (value) => {
    setTemplate(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put("/api/user/template", {
        template,
      });

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Template updated successfully!",
          variant: "success",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update template",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) return null; // Prevent rendering until after hydration

  return (
    <SettingsLayout>
      <div className="wrapper mt-5">
        <Card className="w-full ">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Template Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="template">Select your template</Label>
                <Select
                  value={template}
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

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <span className="animate-spin mr-2">⚪</span>
                    Updating...
                  </>
                ) : (
                  "Update Template"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </SettingsLayout>
  );
};

export default TemplateSelector;
