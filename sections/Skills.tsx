import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
export interface Skill {
    id: string;
    name: string;
    level: number;
    userId: string;
  }
  
export default function SkillsPage() {
  const { data: session } = useSession();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState({ name: '', level: 1 });

  // Fetch skills
  const fetchSkills = async () => {
    if (!session?.user) return;

    try {
      const response = await fetch('/api/records?type=skill');
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      }
    } catch (error) {
      console.error('Failed to fetch skills', error);
    }
  };

  // Add skill
  const addSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;

    try {
      const response = await fetch('/api/records?type=skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill)
      });

      if (response.ok) {
        const addedSkill = await response.json();
        setSkills([...skills, addedSkill]);
        setNewSkill({ name: '', level: 1 });
      }
    } catch (error) {
      console.error('Failed to add skill', error);
    }
  };

  // Delete skill
  const deleteSkill = async (id: string) => {
    try {
      const response = await fetch(`/api/records?type=skill&id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setSkills(skills.filter(skill => skill.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete skill', error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [session]);

  if (!session) {
    return <div>Please log in to view your skills</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Skills</h1>
      
      {/* Add Skill Form */}
      <form onSubmit={addSkill} className="mb-4">
        <input 
          type="text" 
          value={newSkill.name}
          onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
          placeholder="Skill Name"
          className="mr-2 p-2 border"
          required
        />
        <input 
          type="number" 
          value={newSkill.level}
          onChange={(e) => setNewSkill({...newSkill, level: parseInt(e.target.value)})}
          min="1" 
          max="10"
          placeholder="Skill Level"
          className="mr-2 p-2 border"
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Skill
        </button>
      </form>

      {/* Skills List */}
      <div>
        {skills.map((skill) => (
          <div 
            key={skill.id} 
            className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded"
          >
            <span>{skill.name} - Level {skill.level}</span>
            <button 
              onClick={() => deleteSkill(skill.id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}