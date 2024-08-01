import BundledEditor from "../util/BundledEditor.tsx";
import { useRef, useState } from "react";
import type { Editor as TinyMCEEditor } from "tinymce";

export interface Post {
  title: string;
  content: string;
  date: Date;
}

interface PostEditorProps {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  index: number;
}

export function PostEditor({ posts, setPosts, index }: PostEditorProps) {
  const isEdit = index !== -1;
  const post = isEdit ? posts[index] : { title: '', content: '', date: new Date() };
  const [postTitle, setPostTitle] = useState(post.title);
  const postContentRef = useRef<TinyMCEEditor | null>(null);
  const onPost = () => {
    if (postContentRef.current && postTitle) {
      const newPosts = [...posts];
      const postIndex = isEdit ? index : posts.length;
      newPosts[postIndex] = {
        title: postTitle,
        content: postContentRef.current.getContent(),
        date: new Date()
      };
      setPosts(newPosts);
      alert(isEdit ? 'Post updated' : 'Post created');
    }
  };
  const cancelEdit = () => {
    setPosts(posts);
  }
  return (
    <div className="flex flex-col gap-6 w-full">
      <input
        className="rounded-[5px] border-2 px-4 py-2.5 leading-[18px] text-[#606060]"
        placeholder="Input post title"
        value={postTitle}
        onChange={e => setPostTitle(e.target.value)}
      />
      <BundledEditor
        onInit={(_evt, editor) => postContentRef.current = editor}
        initialValue={post.content}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <div className="flex">
        <button
          className="w-1/2 rounded-r-[5px] items-center justify-center py-[10px] bg-[#532BC5] text-white"
          onClick={onPost}
        >{isEdit ? '✓ Save' : '✓ Post'}
        </button>
        {isEdit && (
          <button
            className="items-center justify-center ml-auto"
            onClick={cancelEdit}
          >× cancel
          </button>
        )}
      </div>
    </div>
  )
}