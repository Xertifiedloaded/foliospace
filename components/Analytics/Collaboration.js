import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search, Filter, Users, X } from "lucide-react";
import { Button } from '@/components/ui/button';

const UserSkillsDisplay = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const queryParams = selectedSkills.length
        ? `?skills=${selectedSkills.join(",")}`
        : "";
      const response = await axios.get(`/api/user/userskills${queryParams}`);
      console.log(response);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedSkills]);

  const allSkills = useMemo(() => {
    const skillSet = new Set();
    users.forEach((user) => {
      user.skills.forEach((skill) => skillSet.add(skill.name));
    });
    return Array.from(skillSet).sort();
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const name = user.name || "";
      const role = user.tagline || "";
      const skills = user.skills || [];
  
      const searchMatch =
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skills.some((skill) =>
          (skill.name || "").toLowerCase().includes(searchTerm.toLowerCase())
        );
  
      const levelMatch =
        !selectedLevel ||
        (user.profile && user.profile.levelOfExperience === selectedLevel);
  
      return searchMatch && levelMatch;
    });
  }, [searchTerm, selectedLevel, users]);
  

  const handleSkillToggle = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSkills([]);
    setSelectedLevel("");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Team Skills Directory</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by name, role, or skill..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
          {(searchTerm || selectedSkills.length || selectedLevel) && (
            <Button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {allSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => handleSkillToggle(skill)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedSkills.includes(skill)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="text-center py-12">
            <p>Loading users...</p>
          </div>
        ) : filteredUsers.length >
         0 ? (
          filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <img
                  src={user?.profile?.picture ?? "/images/user.jpg"}
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                  <p className="text-sm text-gray-500">
                    {user?.profile?.tagline ?? "No Tagline"}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-gray-600">
                  {user?.profile?.levelOfExperience &&
                  user?.profile?.yearsOfExperience
                    ? `${user.profile.levelOfExperience} • ${user.profile.yearsOfExperience} years experience`
                    : null}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {user.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No users found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSkillsDisplay;
