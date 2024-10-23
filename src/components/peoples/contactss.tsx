"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';
import { Search } from "lucide-react";

// Sample organization data
export const staticOrganizations = [
    {
        id: 1,
        name: " Alpha",
        logo: "/logoo2.png",
        description: "A leading organization in tech innovation.",
        email: "alpha@organization.com",
        isFollowed: true,
      },
      {
        id: 2,
        name: " Beta",
        logo: "/logo2.png",
        description: "Focused on community development and support.",
        email: "beta@organization.com",
        isFollowed: false,
      },
      {
        id: 3,
        name: " Gamma",
        logo: "/prodcut4.png",
        description: "Environment-focused organization.",
        email: "gamma@organization.com",
        isFollowed: false,
      },
      {
        id: 4,
        name: " Delta",
        logo: "/prodcut1.png",
        description: "Health and wellness advocacy group.",
        email: "delta@organization.com",
        isFollowed: true,
      },
      {
        id: 5,
        name: " Epsilon",
        logo: "/prodcut9.png",
        description: "Promoting education and literacy worldwide.",
        email: "epsilon@organization.com",
        isFollowed: false,
      },
    ];

export default function ContactPagee() {
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
    router.push(`/details/${id}`);
  };
  return (
    <div className="bg-gray-100 dark:bg-muted min-h-screen p-4">
      <div className="max-w-4xl mx-auto dark:bg-muted rounded-lg  p-6">        
      <div className="sticky top-0 z-20 bg-transparent flex items-center rounded-full px-4 py-2">        
      <Search className="mb-3" />
        <Input 
          type="text" 
          placeholder="Search People..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="mb-4 dark:border-white ml-2"
        />
</div>
        <h2 className="text-xl font-semibold dark:text-[#FFC83A] mb-2">My Followers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {filteredOrganizations.filter(org => org.isFollowed).map(organization => (
            <div key={organization.id} className=" shadow-lg shadow-muted-foreground   border p-4 dark:border-muted-foreground  rounded-lg flex flex-col items-center">
                           <div className="min-h-[10rem] flex flex-col items-center" >

             <img src={organization.logo} alt={`${organization.name} logo`} className="w-20 h-20 mb-2" />
              <h3 className="font-semibold">{organization.name}</h3>
              <p className="text-sm dark:text-white text-gray-600">{organization.description}</p>
              </div>
              <Button 
                className={`mt-2 ${organization.isFollowed ? "bg-red-500" : "bg-blue-500"}`} 
                onClick={() => toggleFollow(organization.id)}
              >
                {organization.isFollowed ? "Unfollow" : "Follow"}
              </Button>
              <Button variant="link"  className="mt-2" onClick={() => navigateToOrganization(organization.id)}>
                View Details
              </Button>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold dark:text-[#FFC83A] mb-2">Explore New People</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrganizations.filter(org => !org.isFollowed).map(organization => (
            <div key={organization.id} className=" shadow-lg shadow-muted-foreground   border p-4 dark:border-muted-foreground  rounded-lg flex flex-col items-center">
                                         <div className="min-h-[10rem] flex flex-col items-center" >
              <img src={organization.logo} alt={`${organization.name} logo`} className="w-20 h-20 mb-2" />
              <h3 className="font-semibold">{organization.name}</h3>
              <p className="text-sm dark:text-white text-gray-600">{organization.description}</p>
              </div>
              <Button 
                className={`mt-2 ${organization.isFollowed ? "bg-red-500" : "bg-blue-500"}`} 
                onClick={() => toggleFollow(organization.id)}
              >
                {organization.isFollowed ? "Unfollow" : "Follow"}
              </Button>
              <Button variant="link"  className="mt-2" onClick={() => navigateToOrganization(organization.id)}>
                View Details
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
