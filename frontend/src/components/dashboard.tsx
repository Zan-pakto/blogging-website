"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Feather, TrendingUp, Users, Calendar } from "lucide-react";
import AnimatedBackground from "./animated-background";
import { Button } from "../ui/button";
import type React from "react";

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Better Writing",
    date: "2023-05-15",
    author: "Jane Doe",
  },
  {
    id: 2,
    title: "The Future of AI in Blogging",
    date: "2023-05-12",
    author: "John Smith",
  },
  {
    id: 3,
    title: "How to Grow Your Blog Audience",
    date: "2023-05-10",
    author: "Alice Johnson",
  },
  {
    id: 4,
    title: "SEO Strategies for 2023",
    date: "2023-05-08",
    author: "Bob Wilson",
  },
  {
    id: 5,
    title: "The Art of Storytelling in Blog Posts",
    date: "2023-05-05",
    author: "Emma Brown",
  },
];

export default function Dashboard() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundColor: "hsl(0, 0%, 100%)", // Background color from globals.css
        color: "hsl(222.2, 84%, 4.9%)", // Text color from globals.css
      }}
    >
      <AnimatedBackground />
      <div className="relative z-10">
        <header
          className="p-6 flex justify-between items-center shadow-lg backdrop-blur-sm"
          style={{
            backgroundColor: "hsl(0, 0%, 100%)", // Card background
            color: "hsl(222.2, 84%, 4.9%)", // Card text color
          }}
        >
          <h1 className="text-2xl font-bold">BlogMaster</h1>
          <div className="space-x-4">
            <Button name="Signin" />
            <Button name="Signup" />
          </div>
        </header>
        <main className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-8">
              Welcome to Your Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <DashboardCard
                icon={<Feather className="w-8 h-8" />}
                title="Total Posts"
                value="42"
              />
              <DashboardCard
                icon={<TrendingUp className="w-8 h-8" />}
                title="Views This Month"
                value="15,234"
              />
              <DashboardCard
                icon={<Users className="w-8 h-8" />}
                title="New Followers"
                value="128"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4">Recent Blog Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function DashboardCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <motion.div
      className="p-6 rounded-lg backdrop-blur-sm"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{
        backgroundColor: "hsl(210, 40%, 96.1%)", // Secondary background
        color: "hsl(222.2, 47.4%, 11.2%)", // Secondary foreground
      }}
    >
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="ml-3 text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </motion.div>
  );
}

function BlogPostCard({
  post,
}: {
  post: { title: string; date: string; author: string };
}) {
  return (
    <motion.div
      className="p-6 rounded-lg backdrop-blur-sm"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{
        backgroundColor: "hsl(217.2, 32.6%, 17.5%)", // Muted background
        color: "hsl(210, 40%, 98%)", // Muted foreground
      }}
    >
      <h4 className="text-xl font-semibold mb-2">{post.title}</h4>
      <div className="flex items-center text-sm">
        <Calendar className="w-4 h-4 mr-2" />
        <span>{post.date}</span>
      </div>
      <p className="mt-2 text-sm">By {post.author}</p>
    </motion.div>
  );
}
