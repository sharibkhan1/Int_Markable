export const tweets = [
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


// Static dataset for albums
export const albumsData = [
  {
    id: 1,
    title: "Nature Wonders",
    description: "A collection of beautiful landscapes and nature photography.",
    coverImage: "/prodcut7.png",
    storedImages: [], // Initialize as empty array
  },
  {
    id: 2,
    title: "Cityscapes",
    description: "Capturing the essence of urban life through photography.",
    coverImage: "/prodcut5.png",
    storedImages: [],
  },
  {
    id: 3,
    title: "Wildlife Encounters",
    description: "Explore the diverse wildlife from around the world.",
    coverImage: "/prodcut5.png",
    storedImages: [],
  },
  {
    id: 4,
    title: "Travel Memories",
    description: "Snapshots from various places around the globe.",
    coverImage: "/prodcut3.png",
    storedImages: [],
  },
  {
    id: 5,
    title: "Art & Culture",
    description: "A glimpse into the rich cultural heritage through art.",
    coverImage: "/prodcut2.png",
    storedImages: [],
  },
];
