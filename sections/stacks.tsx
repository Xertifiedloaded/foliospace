import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
export interface Stack {
    id: string;
    name: string;
    userId: string;
  }
  
  module.exports = {
    api: {
      bodyParser: {
        sizeLimit: '10mb', 
      },
    },
  };
export default function StacksPage() {
  const { data: session } = useSession();
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [newStack, setNewStack] = useState({ name: '' });

  // Fetch stacks
  const fetchStacks = async () => {
    if (!session?.user) return;

    try {
      const response = await fetch('/api/portfolio/skills?type=stack');
      if (response.ok) {
        const data = await response.json();
        setStacks(data);
      }
    } catch (error) {
      console.error('Failed to fetch stacks', error);
    }
  };

  // Add stack
  const addStack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;

    try {
      const response = await fetch('/api/portfolio/skills?type=stack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStack)
      });

      if (response.ok) {
        const addedStack = await response.json();
        setStacks([...stacks, addedStack]);
        setNewStack({ name: '' });
      }
    } catch (error) {
      console.error('Failed to add stack', error);
    }
  };

  // Delete stack
  const deleteStack = async (id: string) => {
    try {
      const response = await fetch(`/api/records?type=stack&id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setStacks(stacks.filter(stack => stack.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete stack', error);
    }
  };

  useEffect(() => {
    fetchStacks();
  }, [session]);

  if (!session) {
    return <div>Please log in to view your stacks</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Tech Stacks</h1>
      
      {/* Add Stack Form */}
      <form onSubmit={addStack} className="mb-4">
        <input 
          type="text" 
          value={newStack.name}
          onChange={(e) => setNewStack({...newStack, name: e.target.value})}
          placeholder="Stack Name"
          className="mr-2 p-2 border"
          required
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Stack
        </button>
      </form>

      {/* Stacks List */}
      <div>
        {stacks.map((stack) => (
          <div 
            key={stack.id} 
            className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded"
          >
            <span>{stack.name}</span>
            <button 
              onClick={() => deleteStack(stack.id)}
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