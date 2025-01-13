import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const UserBackupButton = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/portfolio/export-data?userId=${userId}`,
        {
          responseType: "blob",
        }
      );

      const link = document.createElement("a");
      link.href = URL.createObjectURL(response.data);
      link.download = `${session?.user?.name}.pdf`;
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading}
      className={`btn dark:text-black btn-primary ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
    >
      {isLoading ? "Generating..." : "Export Portfolio PDF"}
    </Button>
  );
};

export default UserBackupButton;
