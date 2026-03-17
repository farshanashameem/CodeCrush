// src/pages/parent/EditChildPage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AddChild from "./AddChild/AddChild";
import { getChild } from "../api/getChild";
import type { Child } from "../types";

const EditChildPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [child, setChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchChild = async () => {
      try {
        const result = await getChild(id);
        if (result.success && result.data) {
          setChild(result.data);
        } else {
          toast.error(result.message || "Failed to fetch child");
          navigate("/parent/dashboard");
        }
      } catch (error) {
        toast.error("Something went wrong");
        navigate("/parent/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchChild();
  }, [id, navigate]);

  if (loading) return <p className="text-center mt-10 text-white">Loading...</p>;

  return <AddChild child={child} />;
};

export default EditChildPage;