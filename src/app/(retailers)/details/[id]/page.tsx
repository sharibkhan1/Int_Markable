"use client"
import { staticOrganizations } from "@/components/peoples/contactss";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle } from "lucide-react"; // Import icons
import { useState } from "react";

 // Adjust the path as needed

export default function OrganizationDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Find the organization based on the ID from the URL
  const organization = staticOrganizations.find(org => org.id === parseInt(id));

  if (!organization) {
    return <div>Organization not found</div>;
  }
  const [isFollowed, setIsFollowed] = useState(organization.isFollowed);

  // Toggle follow/unfollow status
  const toggleFollow = () => {
    setIsFollowed(!isFollowed); // Toggle the state
  };
  return (
    <div className=" bg-white dark:bg-muted h-screen overflow-hidden text-black flex flex-col items-center">
          <div className='p-8 bg-[#76B2E4] h-[20rem] w-screen flex flex-col justify-end'>
    <div className="flex justify-start items-center  ml-[25rem]">
          <div className='font-semibold text-2xl' >
            {organization.name}
          </div>
          <Button
            onClick={toggleFollow} // Toggle follow/unfollow on click
            className={` ml-12 mb-4 text-[##333333]  sticky px-8 py-0.5  border-2 border-black dark:border-black uppercase text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)]  ${
              isFollowed ? "bg-red-500 hover:bg-red-400 " : "bg-blue-500 hover:bg-blue-300"
            }`}
          >
            {/* Conditionally render the icon */}
            {isFollowed ? (
              <>
                <MinusCircle className="mr-2" /> Unfollow
              </>
            ) : (
              <>
                <PlusCircle className="mr-2" /> Follow
              </>
            )}
          </Button>
        </div>
    </div>
    <div className=" absolute left-[10rem] top-40">
    <img src={organization.logo} alt={`${organization.name} logo`} className="w-40 h-40 mb-4" />
    </div>
    <div className=" mt-12 space-y-9 w-full max-w-[50rem]">
    <div className="flex justify-between items-center">
          <div>
            <strong className='text-xl text-[#76B2E4]' >Email</strong>
            <p className='text-lg dark:text-white'>{organization.email}</p>
          </div>
          <div>
            <strong className='text-xl text-[#76B2E4]' >Description</strong>
            <p className='text-lg dark:text-white'>{organization.description}</p>
          </div>
                  </div>
      </div>
    </div>
  );
}
