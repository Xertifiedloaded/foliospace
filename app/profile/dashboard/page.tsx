"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import React from "react";
import PageView from "@/sections/PageView";
import DashBoardHeading from "@/sections/DashBoardHeading";
import DashBoardSkills from "@/sections/DashBoardSkills";

const Dashboard: React.FC = () => {

  return (
    <div>
      <div className="space-y-6">
        <DashBoardHeading />
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Profile Details
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="space-y-3 text-gray-700">
              <div>
                <p className="font-semibold">NickName</p>
                <p>Makinde Olaitan</p>
              </div>
              <Separator />
              <div>
                <p className="font-semibold">Tagline</p>
                <p>Innovative Software Developer</p>
              </div>
              <Separator />
              <DashBoardSkills />
            </div>
          </CardContent>
        </Card>
        <PageView />
      </div>
    </div>
  );
};

export default Dashboard;
