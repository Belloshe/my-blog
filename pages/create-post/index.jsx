import BlogEditor from "@/components/blog-editor";
import { createSlug } from "@/utils/createSlug";
import { useRouter } from 'next/router'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect } from "react";


export default function CreatePost() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  
  const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
    const { data, } = await supabase.auth.getUser()
    const { user } = data

    console.log(user)
    if(!user) {
      router.push("/login")
      return
    }

    const slug = createSlug(titleInput);

    const post = {
      user_id: user.id,
      title: titleInput,
      body: editorContent,
      slug: slug
    };

    const response = await fetch('/api/post/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
    } else {
      console.error('Error:', response.status, response.statusText);
    }

    router.push("/blog")
  };

  return (
    <BlogEditor
      heading="Create post"
      onSubmit={handleOnSubmit}
      buttonText="Upload post"
    />
  );
}
