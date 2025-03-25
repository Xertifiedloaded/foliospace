import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Award, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AwardCertificationForm = ({ type, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(
    type === "awards"
      ? {
          title: initialData?.title || "",
          issuer: initialData?.issuer || "",
          date: initialData
            ? format(new Date(initialData.date), "yyyy-MM-dd")
            : "",
          description: initialData?.description || "",
          url: initialData?.url || "",
          image: null,
        }
      : {
        title: initialData?.title || "",
        issuer: initialData?.issuer || "",
        issueDate: initialData?.issueDate ? format(new Date(initialData.issueDate), "yyyy-MM-dd") : "",
        expiryDate: initialData?.expiryDate ? format(new Date(initialData.expiryDate), "yyyy-MM-dd") : "",
        credentialId: initialData?.credentialId || "",
        url: initialData?.url || "",
        image: null,
      }
  );

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        submitData.append(key, value);
      }
    });

    submitData.append("type", type);
    onSubmit(submitData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      encType="multipart/form-data"
    >
      <div>
        <Label>Title</Label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label>Issuer</Label>
        <Input
          name="issuer"
          value={formData.issuer}
          onChange={handleInputChange}
          required
        />
      </div>
      {type === "awards" ? (
        <div>
          <Label>Date</Label>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
      ) : (
        <>
          <div>
            <Label>Issue Date</Label>
            <Input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label>Expiry Date (Optional)</Label>
            <Input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label>Credential ID (Optional)</Label>
            <Input
              name="credentialId"
              value={formData.credentialId}
              onChange={handleInputChange}
            />
          </div>
        </>
      )}
      <div>
        <Label>Description (Optional)</Label>
        <Input
          name="description"
          value={formData.description || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label>URL (Optional)</Label>
        <Input
          name="url"
          type="url"
          value={formData.url || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label>Image (Optional)</Label>
        <Input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleInputChange}
        />
      </div>
      <Button type="submit" className="w-full">
        {initialData ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default function AwardsCertificationsPage() {
  const [activeTab, setActiveTab] = useState("awards");
  const [items, setItems] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`/api/portfolio/award?type=${activeTab}`);
        const data = await response.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching items:", error);
        setItems([]);
      }
    };
    fetchItems();
  }, [activeTab]);

  const handleCreate = async (formData) => {
    try {
      const response = await fetch("/api/portfolio/award", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const newItem = await response.json();
        setItems((prev) => [...prev, newItem]);
        setIsDialogOpen(false);
        setEditingItem(null);
      }
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `/api/portfolio/award?id=${id}&type=${activeTab}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const response = await fetch(
        `/api/portfolio/award?id=${editingItem.id}&type=${activeTab}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (response.ok) {
        // Refetch items to ensure updated data
        const updatedItems = await (
          await fetch(`/api/portfolio/award?type=${activeTab}`)
        ).json();
        setItems(updatedItems);
        setIsDialogOpen(false);
        setEditingItem(null);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {activeTab === "awards" ? (
              <Award className="mr-2" />
            ) : (
              <GraduationCap className="mr-2" />
            )}
            {activeTab === "awards" ? "Awards" : "Certifications"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="awards">Awards</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
            </TabsList>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingItem(null)}>
                  {" "}
                  <Plus className="mr-2" /> Add New{" "}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingItem ? "Edit" : "Add New"}{" "}
                    {activeTab === "awards" ? "Award" : "Certification"}
                  </DialogTitle>
                </DialogHeader>
                <AwardCertificationForm
                  type={activeTab}
                  onSubmit={editingItem ? handleUpdate : handleCreate}
                  initialData={editingItem}
                />
              </DialogContent>
            </Dialog>

            <TabsContent value={activeTab}>
              {items.length === 0 ? (
                <p className="text-center text-gray-500">
                  No {activeTab} found.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items?.map((item) => (
                    <Card key={item.id}>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-gray-600">{item.issuer}</p>
                        <p className="text-sm text-gray-500">
                          {activeTab === "awards"
                            ? item.date
                              ? format(new Date(item.date), "MMMM dd, yyyy")
                              : "No Date Available"
                            : `Issued: ${
                                item.issueDate
                                  ? format(
                                      new Date(item.issueDate),
                                      "MMMM dd, yyyy"
                                    )
                                  : "N/A"
                              }${
                                item.expiryDate
                                  ? ` | Expires: ${format(
                                      new Date(item.expiryDate),
                                      "MMMM dd, yyyy"
                                    )}`
                                  : ""
                              }`}
                        </p>
                        {activeTab === "certifications" &&
                          item.credentialId && (
                            <p className="text-sm text-gray-500">
                              Credential ID: {item.credentialId}
                            </p>
                          )}
                        <div className="flex justify-between mt-4">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setEditingItem(item);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
