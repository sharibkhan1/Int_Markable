"use client";

import ProjectDialog from "@/components/tweet/ProjectDialog";
import TweetCard from "@/components/tweet/tweetcard";
import TweetDialog from "@/components/tweet/TweetDialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";
import { z } from "zod";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

// Sample project data
const staticProjects = [
    { id: 3, title: "Project Beta", description: "Description for Project Beta", status: "Done", progress: 100, notes: [] },
    { id: 4, title: "Project Alpha", description: "Description for Project Alpha", status: "Done", progress: 30, notes: [] },
    { id: 24, title: "Project Gamma", description: "Description for Project Gamma", status: "Halt", progress: 40, notes: [] },
    { id: 44, title: "Project Delta", description: "Description for Project Delta", status: "Halt", progress: 0, notes: [] },
    { id: 45, title: "Project Epsilon", description: "Description for Project Epsilon", status: "Halt", progress: 10, notes: [] },
    { id: 1, title: "Project Zeta", description: "Description for Project Zeta", status: "In Progress", progress: 60, notes: [] },
    { id: 2, title: "Project Eta", description: "Description for Project Eta", status: "Done", progress: 100, notes: [] },
];
const renderActiveShape = (props:any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
        <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">{`(Rate ${(percent * 100).toFixed(2)}%)`}</text>
      </g>
    );
  };

// Sample tweet data
const staticTweets = [
    {
        id: 1,
        username: 'Demo Sports Coach User',
        userImg: "/logoo2.png",
        timestamp: 'Posted 11:05 on 20th Nov 2023',
        postContent: 'Indoor Cricket Session witnessed an attendance of 100 people', // Text only
        postImage: null, // Placeholder path for the post image
        comments: [
          { id: 1, username: 'Alex', userImg: "/prod11.png", text: 'Great event!', likes: 5, liked: false, timestamp: '11:10 AM', replies: [] },
        ],
        likes: 20,
        liked: false,
      },
      {
        id: 2,
        username: 'Sportykids Admin',
        userImg: "/prod11.png",
        timestamp: 'First posted at 07:57 on 20th Nov 2023',
        postContent: '', // No text content
        postImage: "/prod11.png", // Image only
        comments: [
          { id: 1, username: 'John', userImg: "/prod11.png", text: 'Awesome!', likes: 3, liked: false, timestamp: '08:00 AM', replies: [] },
        ],
        likes: 10,
        liked: false,
      },
      {
        id: 8,
        username: 'Sportykids Admin',
        userImg: "/prod11.png",
        timestamp: 'First posted at 07:57 on 20th Nov 2023',
        postContent: '', // No text content
        postImage: "/prod11.png", // Image only
        comments: [
          { id: 1, username: 'John', userImg: "/prod11.png", text: 'Awesome!', likes: 3, liked: false, timestamp: '08:00 AM', replies: [] },
        ],
        likes: 10,
        liked: false,
      },
      {
        id: 6,
        username: 'Sportykids Admin',
        userImg: "/prod11.png",
        timestamp: 'First posted at 07:57 on 20th Nov 2023',
        postContent: '', // No text content
        postImage: "/prod11.png", // Image only
        comments: [
          { id: 1, username: 'John', userImg: "/prod11.png", text: 'Awesome!', likes: 3, liked: false, timestamp: '08:00 AM', replies: [] },
        ],
        likes: 10,
        liked: false,
      },
      {
        id: 3,
        username: 'User Three',
        userImg: "/prod11.png",
        timestamp: 'Posted at 09:30 on 21st Nov 2023',
        postContent: 'Check out this amazing event! @latrest', // Text with an image
        postImage: "/prod11.png", // Image attached
        comments: [],
        likes: 5,
        liked: false,
      },
];

interface OrganizationDetailProps {
  params: {
    id: string; // Expecting the ID to be a string
  };
}

export default function OrganizationDetail({ params }: OrganizationDetailProps) {
    const [activeIndex, setActiveIndex] = useState(-1); // State for tracking hovered index

    const onPieEnter = (index: SetStateAction<number>) => {
        setActiveIndex(index);
      };
  const router = useRouter();
  const { id } = params; // Extract the ID from props
  const [projects, setProjects] = useState(staticProjects);
  const [tweets, setTweets] = useState(staticTweets);
  const [noteText, setNoteText] = useState(""); // State for note text

  const onTweetSubmit = (data: { description: string; image: string }) => {
    const newTweet = {
             username: "Current User", // Placeholder for current user
       userImg: "/logoo2.png", // Placeholder for user image
       timestamp: new Date().toLocaleString(),
      id: tweets.length + 1,
      postContent: data.description || "",
      postImage: data.image || null, // Ensure image is provided
comments: [],
likes: 0,
liked: false,
    };
    setTweets((prevTweets) => [newTweet, ...prevTweets]);
    
};

  const onProjectSubmit = (data: { title: string; description: string }) => {
    const newProject = {
      id: projects.length + 1,
      title: data.title,
      description: data.description,
      status: "In Progress", // Default status for new projects
      progress: 0,
      notes: [], // Initialize with empty notes
    };
    setProjects([...projects, newProject]); // Add new project to the list
  };
  const updateProjectStatus = (id: number) => {
    setProjects((prevProjects) =>
        prevProjects.map((project) => {
            if (project.id === id) {
                if (project.status === "In Progress") {
                    return { ...project, status: "Halt" }; // Change to Halt
                } else if (project.status === "Halt") {
                    return { ...project, status: "Done" }; // Change to Done
                } else {
                    return { ...project, status: "In Progress" }; // Change back to In Progress
                }
            }
            return project;
        })
    );
};
const handleProgressChange = (id: number, change: number) => {
    setProjects(prevProjects =>
      prevProjects.map(project => {
        if (project.id === id) {
          const newProgress = Math.min(100, Math.max(0, project.progress + change));
          return { ...project, progress: newProgress };
        }
        return project;
      })
    );
  };
  return (
    <div className="bg-gray-100 dark:bg-muted min-h-screen p-4">
      <div className="sticky top-0 bg-transparent z-10">
        <div className="flex space-x-4 p-4">
          <TweetDialog onTweetSubmit={onTweetSubmit} />
          <ProjectDialog onProjectSubmit={onProjectSubmit} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white dark:bg-[#76B2E4] rounded-lg shadow-lg p-6 mt-6">
        <h2 className="text-xl font-semibold mb-5">Project Boarsds</h2>
        <div className="max-h-[50rem] overflow-y-auto ">
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
        {projects.map(project => (
                            <div key={project.id} className={`border-l-8 bg-white border-r border-t border-b border-black p-4 rounded-lg flex flex-col ${project.status === 'Halt' ? 'border-l-yellow-300' : project.status === 'Done' ? 'border-l-green-300' : 'border-l-black'}`}>
                                
                                <div className="flex justify-between">
                                    <h3 className="font-semibold text-black ">{project.title}</h3>
                                    <button onClick={() => updateProjectStatus(project.id)} className="text-blue-500">
                                        {project.status === 'In Progress' ? 'Set to Halt' : project.status === 'Halt' ? 'Set to Done' : 'Set to In Progress'}
                                    </button>
                                </div>
                                <p className="text-sm dark:text-black">{project.description}</p>
                                <div className="flex items-center justify-evenly mt-2">
                    <Button 
                      onClick={() => handleProgressChange(project.id, 5)} 
                      disabled={project.progress >= 100}
                      className="bg-green-500 text-white"
                    >
                      +
                    </Button>
                    <span className="text-lg dark:text-black">{project.progress}%</span>
                    <Button 
                      onClick={() => handleProgressChange(project.id, -5)} 
                      disabled={project.progress <= 0}
                      className="bg-red-500 text-white"
                    >
                      -
                    </Button>
                  </div>
                                <div className="w-full h-60 mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                activeIndex={activeIndex}
                                                activeShape={renderActiveShape}
                                                data={[
                                                    { name: 'Progress', value: project.progress, fill: '#28a745' }, // Green for progress
                                                    { name: 'Remaining', value: 100 - project.progress, fill: '#dc3545' }, // Red for remaining
                                                ]}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={40}
                                                outerRadius={60}
                                                dataKey="value"
                                                onMouseEnter={(_, index) => onPieEnter(index)}
                                            >
                                                <Cell key={`cell-0`} fill="#28a745" />
                                                <Cell key={`cell-1`} fill="#dc3545" />
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                              
                            </div>
                        ))}
        </div>
        </div>
        <h2 className="text-xl mt-12 mb-5 font-semibold ">Recent Posts</h2>
        <div className="max-h-[50rem] overflow-y-auto">
        <div className="grid grid-cols-1 gap-4">
          {tweets.map((tweet) => <TweetCard key={tweet.id} tweet={tweet} />)}
        </div>
        </div>
      </div>
    </div>
  );
}
