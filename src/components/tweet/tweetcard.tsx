"use client";
import React, { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react'; // Import Lucide icons
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Define types for the tweet and comments
import Image from 'next/image';

type Comment = {
  id: number;
  username: string;
  userImg: string; // Allow string or StaticImageData
  text: string;
  likes: number;
  liked: boolean;
  timestamp: string;
  replies: Comment[];
};

export type Tweet = {
  id: number;
  username: string;
  userImg: string; // Allow both string and StaticImageData
  timestamp: string;
  postContent: string;
  postImage?: string | null; // Allow string, StaticImageData, or null
  comments: Comment[];
  likes: number;
  liked: boolean;
};


type TweetCardProps = {
  tweet: Tweet;
};

const TweetCard: React.FC<TweetCardProps> = ({ tweet }) => {
  const [showMore, setShowMore] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likeCount, setLikeCount] = useState(tweet.likes);
  const [comments, setComments] = useState<Comment[]>(tweet.comments);
  const [replyCommentId, setReplyCommentId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [liked, setLiked] = useState(tweet.liked);
  const [showReplies, setShowReplies] = useState<boolean[]>(comments.map(() => false));

  const handleLike = () => {
    setLikeCount(likeCount + (liked ? -1 : 1)); // Increment or decrement based on current state
    setLiked(!liked); // Toggle liked state
  };

  const handleAddComment = (commentText: string) => {
    const newComment: Comment = {
      id: comments.length + 1,
      username: 'Current User', // Assume current user
      userImg: "/logoo2.png", // Placeholder path for current user image
      text: commentText,
      likes: 0,
      liked: false, // Initially not liked
      timestamp: new Date().toLocaleString(), // Current timestamp
      replies: [],
    };
    setComments([...comments, newComment]);
  };

  const handleReply = (commentId: number) => {
    if (replyText) {
      const newReply: Comment = {
        id: comments[commentId].replies.length + 1,
        username: 'Current User', // Assume current user
        userImg: "/logoo2.png", // Placeholder path for current user image
        text: replyText,
        likes: 0,
        liked: false, // Initially not liked
        timestamp: new Date().toLocaleString(),
        replies: [],
      };
      const updatedComments = [...comments];
      updatedComments[commentId].replies.push(newReply);
      setComments(updatedComments);
      setReplyText('');
      setReplyCommentId(null);
    }
  };

  const toggleReply = (commentId: number) => {
    setReplyCommentId(replyCommentId === commentId ? null : commentId);
  };

  const toggleComments = () => {
    setShowComments(!showComments); // Toggle comments visibility
  };

  const handleLikeComment = (index: number) => {
    const updatedComments = [...comments];
    updatedComments[index].liked = !updatedComments[index].liked; // Toggle liked state
    updatedComments[index].likes += updatedComments[index].liked ? 1 : -1; // Update like count
    setComments(updatedComments);
  };

  const handleLikeReply = (commentIndex: number, replyIndex: number) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies[replyIndex].liked = !updatedComments[commentIndex].replies[replyIndex].liked; // Toggle liked state
    updatedComments[commentIndex].replies[replyIndex].likes += updatedComments[commentIndex].replies[replyIndex].liked ? 1 : -1; // Update like count
    setComments(updatedComments);
  };

  // Function to toggle replies visibility for a specific comment
  const toggleReplies = (index: number) => {
    const updatedShowReplies = [...showReplies];
    updatedShowReplies[index] = !updatedShowReplies[index];
    setShowReplies(updatedShowReplies);
  };

  const parseContent = (content: string) => {
    // Regex for identifying @mentions and #hashtags
    const mentionRegex = /@\w+/g;
    const hashtagRegex = /#\w+/g;
  
    // Replace mentions with <a> tags
    const parsedContent = content
      .replace(mentionRegex, (mention) => `<a href="/profile/${mention.slice(1)}" class="text-blue-500">${mention}</a>`)
      .replace(hashtagRegex, (hashtag) => `<a href="/hashtag/${hashtag.slice(1)}" class="text-blue-500">${hashtag}</a>`);
    
    return parsedContent;
  };
  
  return (
    <div className='bg-white dark:bg-muted shadow-lg p-4 mb-6 rounded-lg w-full'>
      <div className='flex items-center'>
        <Image src={tweet.userImg} alt={tweet.username} className='w-10 h-10 rounded-full mr-4'width={40} height={40} />
        <div>
          <h3 className='font-bold'>{tweet.username}</h3>
          <p className='text-gray-500 text-sm'>{tweet.timestamp}</p>
        </div>
      </div>
      <div className={`mt-4 ${showMore ? 'max-h-full' : 'max-h-24'} overflow-hidden`}>
        <p dangerouslySetInnerHTML={{ __html: parseContent(tweet.postContent) }} />
        {tweet.postImage && <Image src={tweet.postImage} alt='post' className='w-auto h-52 mt-4 rounded-lg' width={500} height={300} />} {/* Image */}
      </div>
      <button
        className='text-blue-500 mt-2'
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? 'Show less' : 'Show more'}
      </button>
      <div className='flex items-center justify-between mt-4'>
        <button onClick={handleLike} className='flex items-center'>
          <Heart className={`w-5 mr-1 h-5 ${liked ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
          {likeCount}
        </button>
        <button className='text-gray-500 dark:text-[#EAEAEA]' onClick={toggleComments}>
          <MessageCircle className='w-5 h-5 inline' /> {comments.length} Comments
        </button>
      </div>
      {showComments && (
        <div className='mt-4 bg-[#F7F9FC] dark:text-black rounded-md'>
          {comments.map((comment, index) => (
            <div key={comment.id} className='mb-2 ml-2 border-b-2 border-gray-600 mr-2'>
              <div className='flex items-center'>
                <Image src={comment.userImg} alt={comment.username} className='w-8 h-8 rounded-full mr-2' width={40} height={40} />
                <p><strong>{comment.username}</strong> <span className='text-gray-500 text-sm'>{comment.timestamp}</span></p>
              </div>
              <p>{comment.text}</p>
              <div className='flex flex-row mt-3 mb-2 justify-between' >
              <button className='text-sm text-blue-500' onClick={() => toggleReply(index)}>
                {replyCommentId === index ? 'Hide Reply' : 'Reply'}
              </button>
        
              <button className='text-sm  text-red-500 flex flex-row ' onClick={() => handleLikeComment(index)}>
                <Heart className={`w-5 h-5 ${comment.liked ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
                {comment.likes}
              </button>
              </div>
              {replyCommentId === index && (
                <div className='mt-2'>
                  <input
                    type='text'
                    placeholder='Reply...'
                    className='border dark:text-white p-2 w-full mt-2 rounded'
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleReply(index);
                      }
                    }}
                  />
                </div>
              )}
              {/* Replies Section */}
              {comment.replies.length > 0 && (
                <div className='ml-4'>
                  {showReplies[index] ? (
                    <>
                      {comment.replies.map((reply, replyIndex) => (
                        <div key={reply.id} className='mb-2'>
                          <div className='flex items-center'>
                            <Image src={reply.userImg} alt={reply.username} className='w-6 h-6 rounded-full mr-2'width={40} height={40} />
                            <p><strong>{reply.username}</strong> <span className='text-gray-500 text-sm'>{reply.timestamp}</span></p>
                          </div>
                          <p>{reply.text}</p>
                          <button className='text-sm text-blue-500' onClick={() => handleLikeReply(index, replyIndex)}>
                            <Heart className={`w-5 h-5 ${reply.liked ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
                            {reply.likes}
                          </button>
                        </div>
                      ))}
                      <button className='text-sm text-blue-500' onClick={() => toggleReplies(index)}>Show less</button>
                    </>
                  ) : (
                    <button className='text-sm text-blue-500' onClick={() => toggleReplies(index)}>Show more</button>
                  )}
                </div>
              )}
            </div>
          ))}
          {/* Add a comment input field */}
          <input
            type='text'
            placeholder='Add a comment...'
            className='border dark:text-white p-2 w-full mt-2 rounded'
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value) {
                handleAddComment(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TweetCard;
