"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';
import { Book, Headphones, Search } from 'lucide-react'
// Sample organization data
const staticOrganizations = [
  {
    id: 1,
    name: "Board Alpha",
    logo: "/logoo2.png",
    description: "A leading organization in tech innovation.",
    isFollowed: true,
  },
  {
    id: 2,
    name: "Board Beta",
    logo: "/logo2.png",
    description: "Focused on community development and support.",
    isFollowed: false,
  },
  {
    id: 3,
    name: "Board Gamma",
    logo: "/logo1.png",
    description: "Environment-focused organization.",
    isFollowed: false,
  },
  {
    id: 4,
    name: "Board Delta",
    logo: "/prodcut1.png",
    description: "Health and wellness advocacy group.",
    isFollowed: true,
  },
  {
    id: 5,
    name: "Board Epsilon",
    logo: "prodcut7.png",
    description: "Promoting education and literacy worldwide.",
    isFollowed: false,
  },
  {
    id: 6,
    name: "Board Gamma",
    logo: "/logoo2.png",
    description: "Environment-focused organization.",
    isFollowed: false,
  },
  {
    id: 7,
    name: "Board Delta",
    logo: "prodcut4.png",
    description: "Health and wellness advocacy group.",
    isFollowed: true,
  },
  {
    id: 8,
    name: "Board Epsilon",
    logo: "prodcut1.png",
    description: "Promoting education and literacy worldwide.",
    isFollowed: false,
  },
];

export default function BoardsProjexts() {
  const [organizations, setOrganizations] = useState(staticOrganizations);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const router = useRouter();

  // Filtered organizations based on search term
  const filteredOrganizations = organizations.filter(organization =>
    organization.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle follow/unfollow organization
  const toggleFollow = (id: number) => {
    setOrganizations(prevOrganizations =>
      prevOrganizations.map(org => org.id === id ? { ...org, isFollowed: !org.isFollowed } : org)
    );
  };
  const navigateToOrganization = (id: number) => {
    router.push(`/boards/${id}`);
  };
  return (
    <div className="bg-gray-100 dark:bg-muted min-h-screen p-4">
      <div className="max-w-4xl mx-auto dark:bg-muted rounded-lg  p-6">        
      <div className="sticky top-0 z-20 bg-transparent flex items-center rounded-full px-4 py-2">
        <Search className="mb-3" />
        <Input 
          type="text" 
          placeholder="Search boards..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="mb-4 dark:border-white ml-2"
        />
      </div>
        <h2 className="text-xl font-semibold dark:text-[#FFC83A] mb-2">My Boards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {filteredOrganizations.filter(org => org.isFollowed).map(organization => (
            <div key={organization.id} className="border shadow-lg shadow-muted-foreground dark:border-muted-foreground  p-4 rounded-lg flex flex-col items-center">
              <div className="min-h-[10rem] flex flex-col items-center" >
              <img src={organization.logo} alt={`${organization.name} logo`} className="w-20 h-20 mb-2" />
              <h3 className="font-semibold">{organization.name}</h3>
              <p className="text-sm dark:text-[#EAEAEA] text-gray-600">{organization.description}</p>
              </div>
              <Button 
                className={`mt-2 ${organization.isFollowed ? "bg-red-500" : "bg-blue-500"}`} 
                onClick={() => toggleFollow(organization.id)}
              >
                {organization.isFollowed ? "Unfollow" : "Follow"}
              </Button>
              <Button variant="link" className="mt-2 " onClick={() => navigateToOrganization(organization.id)}>
                View Details
              </Button>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold dark:text-[#FFC83A] mb-2">Explore New Boards</h2>
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrganizations.filter(org => !org.isFollowed).map(organization => (
            <div key={organization.id} className=" shadow-lg shadow-muted-foreground   border p-4 dark:border-muted-foreground  rounded-lg flex flex-col items-center">
              <div className="min-h-[10rem] flex flex-col items-center" >
              <img src={organization.logo} alt={`${organization.name} logo`} className="w-20 h-20 mb-2" />
              <h3 className="font-semibold">{organization.name}</h3>
              <p className="text-sm dark:text-[#EAEAEA] text-gray-600">{organization.description}</p>
                  </div>
              <Button 
                className={`mt-2 ${organization.isFollowed ? "bg-red-500" : "bg-blue-500"}`} 
                onClick={() => toggleFollow(organization.id)}
              >
                {organization.isFollowed ? "Unfollow" : "Follow"}
              </Button>
              <Button variant="link" className="mt-2" onClick={() => navigateToOrganization(organization.id)}>
                View Details
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
