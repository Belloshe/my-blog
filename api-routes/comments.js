const { supabase } = require("../lib/supabaseClient");

export async function getComments() {
  const { data, error } = await supabase
    .from('Comments')
    .select('*');

  if(error) throw error;

  return data;
}

export async function addComment(commentData) {
  const newComment = {
    id: crypto.randomUUID(),
    ...commentData
  }
  const { data, error } = await supabase
    .from('Comments')
    .insert([newComment]);

  if(error) throw error;

  return data;
}

export async function removeComment(commentId) {
  const { data, error } = await supabase
    .from('Comments')
    .delete()
    .eq('id', commentId);

  if(error) throw error;

  return data;
}
