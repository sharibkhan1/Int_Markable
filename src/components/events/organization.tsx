"use client";

import { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";

// Define the schema for the project form
const projectSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description must be at least 1 character long."),
});

// Sample project data
const staticProjects = [
  { id: 1, title: "Project Alpha", description: "Description for Project Alpha", status: "In Progress", progress: 60 },
  { id: 2, title: "Project Beta", description: "Description for Project Beta", status: "Completed", progress: 100 },
  { id: 3, title: "Project Gamma", description: "Description for Project Gamma", status: "Not Started", progress: 0 },
  { id: 4, title: "Project Delta", description: "Description for Project Delta", status: "In Progress", progress: 30 },
];

// Main Projects component
export default function Organizations() {
  const [projects, setProjects] = useState(staticProjects);
  const [activeIndex, setActiveIndex] = useState(-1); // State for tracking hovered index
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: { title: any; description: any; }) => {
    const newProject = {
      id: projects.length + 1,
      title: data.title,
      description: data.description,
      status: "Not Started",
      progress: 0,
    };

    setProjects([...projects, newProject]);
    form.reset();
  };

  // Handler for mouse enter to set active index
  const onPieEnter = (index: SetStateAction<number>) => {
    setActiveIndex(index);
  };

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

  // Filtered projects based on search term
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
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

    <div className="w-full  h-full dark:bg-muted bg-white rounded-lg shadow-lg p-4">
        <div className="flex  flex-row justify-between mb-4">
        <div className="sticky z-20 top-0 flex-grow mr-2 bg-white dark:bg-muted">

          <Input 
            type="text" 
            placeholder="Search projects..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="flex-grow mr-2 dark:border-white"
          />
        </div>
        <div className="sticky z-20 top-0 mr-2 bg-white dark:bg-muted">
        <Dialog>
          <DialogTrigger asChild>
            <Button     variant="secondary"       className=" dark:hover:shadow-white sticky z-20 top-0 mb-4 dark:bg-[#FFC83A] px-4 py-2 rounded-md border border-black bg-[#FFC83A] text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
            >Add Project</Button>
          </DialogTrigger>
          <DialogContent>
            <div>
              <DialogHeader>
                <DialogTitle>Create Project</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Project Title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <textarea {...field} placeholder="Description" className="w-full border p-2" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="bg-[#FFC83A] text-[#333333] px-8 py-2 rounded-md font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-[#FFC83A]">Add Project</Button>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
        </div>

        </div>
        <div>
        {filteredProjects.length === 0 ? (
          <p className="text-gray-500 text-center">No projects available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <div key={project.id} className="border shadow-lg shadow-muted-foreground dark:shadow-yellow-100 dark:border-muted-foreground p-4 rounded-lg h-full flex flex-col justify-between">
                <div>
                  <h2 className="font-bold text-[#76B2E4]">{project.title}</h2>
                  <p>{project.description}</p>
                  <p className="text-sm">Status: {project.status}</p>
                  <div className="flex items-center justify-evenly mt-2">
                    <Button 
                      onClick={() => handleProgressChange(project.id, 10)} 
                      disabled={project.progress >= 100}
                      className="bg-green-500 text-white"
                    >
                      +
                    </Button>
                    <span className="text-lg">{project.progress}%</span>
                    <Button 
                      onClick={() => handleProgressChange(project.id, -10)} 
                      disabled={project.progress <= 0}
                      className="bg-red-500 text-white"
                    >
                      -
                    </Button>
                  </div>
                </div>
                <div className="w-full h-60 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={[
                          { name: "Progress", value: project.progress, fill: "green" }, // Set fill color for progress
                          { name: "Remaining", value: 100 - project.progress, fill: "red" }, // Set fill color for remaining
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        dataKey="value"
                        onMouseEnter={(_, index) => onPieEnter(index)} // Set active index on mouse enter
                      >
                        {/* Map to fill colors directly using Cell component */}
                        {([ 
                          { fill: "green" },
                          { fill: "red" },
                        ]).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
  );
}
