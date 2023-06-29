const { supabase } = require("../lib/supabaseClient");


export async function getPosts() {
  const { data, error } = await supabase
    .from('Posts')
    .select('*');

  if(error) throw error;

  return data;
}

export async function addPost(postData) {
  const newPost = {
    id: crypto.randomUUID(),
    ...postData
  }
  const { data, error } = await supabase
    .from('Posts')
    .insert([newPost]);

  if(error) throw error;

  return data;
}

export async function removePost(postId) {
  const { data, error } = await supabase
    .from('Posts')
    .delete()
    .eq('id', postId);

  if(error) throw error;

  return data;
}

export async function editPost(postId, newPostData) {
  const { data, error } = await supabase
    .from('Posts')
    .update(newPostData)
    .eq('id', postId);

  if(error) throw error;

  return data;
}
