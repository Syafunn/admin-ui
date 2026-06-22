import React from "react";
import PostCard from "./PostCard"; 
import { postsData } from "../postsData";  

function Exercise() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 px-20">
      <h1 className="text-3xl font-extrabold text-center mb-10 text-special-red2">
        Post Cards
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 w-full max-w-[100%] mx-auto">
        {postsData.map((post) => (
          <PostCard 
            key={post.id} 
            id={post.id}
            userId={post.userId}
            title={post.title}
            body={post.body}
          />
        ))}
      </div>
    </div>
  );
}

export default Exercise;