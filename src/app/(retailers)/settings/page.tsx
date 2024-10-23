'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { db } from "@/app/firebase/config";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil1Icon,CheckCircledIcon,ExclamationTriangleIcon } from '@radix-ui/react-icons'; // Import the Plus icon
import { ChevronLeft } from "lucide-react";
import FileUpload from '@/components/settings-upload';

const Settings = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [address, setAddress] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('');
  const [editField, setEditField] = useState<string | null>(null); // Track which field is being edited
  const [tempValue, setTempValue] = useState<string>(''); // Temporary value during editing
  const [isDirty, setIsDirty] = useState<boolean>(false); // Track if changes were made

  const router = useRouter();

  const fetchUserData = useCallback(async () => {
    if (!session?.user?.id) return;

    setLoading(true);

    try {
      const retailerDocRef = doc(db, "retailers", session.user.id);
      const retailerDoc = await getDoc(retailerDocRef);

      if (retailerDoc.exists()) {
        const data = retailerDoc.data();
        setUserData(data);
        setProfileImage(data.profileImage || '');
        setAddress(data.address || '');
      } else {
        console.error("No such retailer document!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchUserData();
    }
  }, [status, fetchUserData]);

  const handleEditClick = (field: string, value: string) => {
    setEditField(field);
    setTempValue(value);
  };

  const handleDialogSave = () => {
    if (editField === 'name') {
      setUserData((prevData: any) => ({ ...prevData, name: tempValue }));
    } else if (editField === 'address') {
      setAddress(tempValue);
    }
    setEditField(null);
    setIsDirty(true); // Mark as dirty since changes are made
  };

  const handleDialogCancel = () => {
    setEditField(null);
  };

  const handleUpdate = async () => {
    setError(null);
    setSuccess(null);

    if (!session?.user?.id || !userData) {
      setError("User data not available.");
      return;
    }

    const userDocRef = doc(db, "retailers", session.user.id);

    try {
      await updateDoc(userDocRef, {
        name: userData.name,
        profileImage: profileImage,
        address: address,
      });

      setSuccess("Profile updated successfully.");
      setIsDirty(false); // Reset dirty state after update
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data found.</div>;
  }

  return (
    <div className=" bg-white dark:bg-muted h-screen overflow-hidden text-black flex flex-col items-center">
    <div className='p-8 bg-[#76B2E4] h-[20rem] w-screen flex flex-col justify-end'>
    <div className="flex justify-between items-center  ml-[25rem]">
          <div className='font-semibold text-2xl' >
            {userData.name}
          </div>
        </div>
    </div>
      
      {/* Profile Image at Top Center */}
      <div className=" absolute left-20 top-40">
        <FileUpload
          endpoint="serverImage"
          value={profileImage}
          onChange={(url?: string) => { setProfileImage(url || ''); setIsDirty(true); }}
        />
      </div>

      {/* User Information */}
      <div className=" mt-12 space-y-9 w-full max-w-[50rem]">
        {/* Name Section */}
        <div className="flex justify-between items-center">
          <div>
            <strong className='text-xl text-[#76B2E4]' >Email</strong>
            <p className='text-lg dark:text-white'>{userData.email}</p>
          </div>
          <Button className="mb-4 text-[##333333] hover:bg-[#f8df9e] dark:hover:bg-[#f8df9e] sticky bg-[#FFC83A] px-8 py-0.5  border-2 border-black dark:border-black uppercase text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)]"
            variant="secondary" onClick={() => handleEditClick('name', userData.email)}>
             <Pencil1Icon className="w-4 h-4 mr-2" />
             Edit</Button>
        </div>

        {/* Email Display (No Edit Option) */}


        {/* Password Placeholder */}
        <div className="flex justify-between items-center">
          <div>
            <strong className='text-xl text-[#76B2E4]'>Password</strong>
            <p className='dark:text-white' >******** </p>
          </div>
        </div>
      </div>

      {/* Error/Success Messages */}
      {success && 
        <div className="bg-emerald-100 p-3 rounded-md flex
          items-center gap-x-2 text-sm text-emerald-500" >
          <CheckCircledIcon className="w-4 h-4" />
            <p className="text-red-500">{success}</p>
      </div>
      }
      {error &&
                <div className="bg-destructive/15 p-3 rounded-md flex
                items-center gap-x-2 text-sm text-destructive" >
                    <ExclamationTriangleIcon className="w-4 h-4" />
      <p className="text-green-500">{error}</p>
      </div>}

      {/* Update/Cancel Buttons */}
      {isDirty && (
        <div className="flex space-x-4 mt-6">
          <Button className=" mb-4 text-[##333333] hover:bg-[#f8df9e] dark:hover:bg-[#f8df9e] sticky bg-[#FFC83A] px-8 py-0.5  border-2 border-black dark:border-black uppercase text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)]"
           variant="secondary" onClick={handleUpdate}>Update</Button>
          <Button variant="outline" className='dark:text-white' onClick={() => fetchUserData()}>Cancel</Button>
        </div>
      )}

      {/* Dialog for Editing */}
      <Dialog open={!!editField} onOpenChange={handleDialogCancel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {editField}</DialogTitle>
          </DialogHeader>
          <Input
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
          />
          <div className="flex space-x-4 mt-4">
            <Button onClick={handleDialogSave}>Save</Button>
            <Button variant="outline" onClick={handleDialogCancel}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
