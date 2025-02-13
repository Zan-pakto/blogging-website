import { useEffect, useState } from "react";
import axios from "axios";

export interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string;
  };
}

const API_BASE_URL = "https://backend.arvindshahi444.workers.dev/api/v1/blog";

const getAuthHeaders = () => ({
  Authorization: localStorage.getItem("token") || "",
});

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`${API_BASE_URL}/${id}`, { headers: getAuthHeaders() })
      .then((response) => {
        setBlog(response.data.blog);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { loading, blog, error };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`${API_BASE_URL}/bulk`, { headers: getAuthHeaders() })
      .then((response) => {
        setBlogs(response.data.blogs);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs.");
      })
      .finally(() => setLoading(false));
  }, []);

  return { loading, blogs, error };
};
