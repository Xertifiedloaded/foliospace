import React from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Button } from '@/components/ui/button';

const UserBackupButton = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const handleDownload = async () => {
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
    }
  };

  return (
    <Button onClick={handleDownload} className="btn btn-primary">
      Download Portfolio PDF
    </Button>
  );
};

export default UserBackupButton;
