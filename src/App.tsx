import { useState } from "react";
import { Post, PostEditor } from "./components/PostEditor.tsx";

import checkCircleSvg from './assets/check-circle.svg';
import arrowLeftSvg from './assets/arrow-left.svg';
import contentCopySvg from './assets/content-copy.svg';
import pencilSvg from './assets/pencil.svg';
import trashSvg from './assets/trash.svg';

import styles from './App.module.css';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  const [editIndex, setEditIndex] = useState(-1);

  const onEdit = (newPosts: Post[]) => {
    setPosts(newPosts);
    setEditIndex(-1);
  }

  const deleteByIndex = (index: number) => {
    const newPosts = [...posts];
    newPosts.splice(index, 1);
    setPosts(newPosts);
  }

  return (
    <div className="container mx-auto flex flex-col items-center gap-12 w-[800px] py-12">
      <p className="flex self-start text-sm leading-6">
        <img src={arrowLeftSvg} className="inline" alt="arrow Left"/>
        Back
      </p>
      <p className="text-4xl font-bold">
        Manage post
      </p>
      <div className="flex rounded-[5px] shadow-md w-full">
        <div className={`flex rounded-[5px] items-center justify-center ${styles.checkCircle}`}>
          <img src={checkCircleSvg} className="logo" alt="check Circle"/>
        </div>
        <div className="flex flex-col gap-[10px] py-6 px-8">
          <p className="text-xs">link to your profile</p>
          <p className="text-base font-medium">
            https://twitter.com/p/12345
            <img src={contentCopySvg} className="inline m-[10px]" alt="content Copy"/>
          </p>
        </div>
      </div>
      <div className="flex rounded-[5px] shadow-md w-full">
        <div className="flex rounded-l-[5px] flex-1 items-center justify-center py-[10px]">
          <p>Settings</p>
        </div>
        <div className="flex rounded-r-[5px] flex-1 items-center justify-center py-[10px] bg-[#532BC5]">
          <p className="text-white">Posts</p>
          <div className="px-2 bg-white rounded-[10px] leading-[18px] mx-[10px]">{posts.length}</div>
        </div>
      </div>
      <PostEditor posts={posts} setPosts={setPosts} index={-1}/>
      {posts.map((post, index) => {
        if (editIndex === index) {
          return (
            <div className="flex rounded-[5px] bg-white shadow-md p-6 gap-6 font-bold flex-col w-full">
              <p>Edit Post</p>
              <PostEditor posts={posts} setPosts={onEdit} index={index}/>
            </div>
          );
        } else {
          return (
            <div key={index} className="flex flex-col gap-5 w-full">
              <div className="flex rounded-l-[5px] gap-2 items-center justify-center py-[10px] relative">
                <p
                  className={`flex rounded-2xl items-center justify-center font-semibold py-1 px-4 text-white z-0 ${styles.titleText}`}>
                  {post.title}
                </p>
                <button
                  className={`flex rounded-2xl items-center justify-center py-1 px-4 text-white text-xs ml-auto z-0 ${styles.titleText}`}
                  onClick={() => setEditIndex(index)}>
                  <img src={pencilSvg} className="inline" alt="pencil"/>
                  Edit
                </button>
                <button
                  className={`flex rounded-2xl items-center justify-center p-1 bg-[#C4C4C4] hover:bg-[#FF0000] z-0`}
                  onClick={() => deleteByIndex(index)}>
                  <img src={trashSvg} className="inline pointer-events-none" alt="trash"/>
                </button>
                <div className="absolute top-1/2 w-full h-0.5 bg-[#00000050] -z-10"></div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: post.content }}/>
              <div className="text-[#818181] text-sm">{post.date.toLocaleString()}</div>
            </div>
          );
        }
      })}
    </div>
  )
}

export default App
