'use client';
import React, { Dispatch, SetStateAction } from 'react';
import { BlogPostCategory } from '@prisma/client';
import { Button } from '../ui/button';

export default function CategoryFilter({
  userBlogPostsCategories,
  selectedCategory, 
  setSelectedCategory
}: {
  userBlogPostsCategories: BlogPostCategory[];
  selectedCategory:string;
  setSelectedCategory:Dispatch<SetStateAction<string>>;
}) {

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-12 justify-center">
        <Button
          onClick={() => setSelectedCategory('All Posts')}
          variant={selectedCategory === "All Posts" ? 'default' : 'outline'}
          size="sm"
          className="rounded-full"
        >
          All Posts
        </Button>
        {userBlogPostsCategories.map((categoryPost) => (
          <Button
            key={categoryPost.id}
            onClick={() => setSelectedCategory(categoryPost.slug)}
            variant={selectedCategory === categoryPost.slug ? 'default' : 'outline'}
            size="sm"
            className="rounded-full"
          >
            {categoryPost.title}
          </Button>
        ))}
      </div>
    </>
  );
}
