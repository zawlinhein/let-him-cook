import { defineQuery } from "next-sanity";

export const AUTHOR_BY_GOOGLE_ID =
  defineQuery(`*[_type=="author" && id==$id][0]{
  _id,
  id,
  name,
  familyName,
  email,
  image,
  }`);

export const RECIPE_SEARCH =
  defineQuery(`*[_type=="recipe" && defined(slug.current) && (!defined($search) || title match $search)] 
    | order(_createdAt desc){
    _createdAt,
    title,
    slug,
    author->{
    _id,
    familyName,
    name,
    email,
    image,
  },
    _id,
    description,
    image{
      asset->{
        _id,
        url
      }
    },
    ingredients,
    instructions,
    time,
    difficulty,
    rating,
    tags,
    servings
}`);

export const GET_RECIPE_BY_ID = defineQuery(`*[_type=="recipe" && _id==$id][0]
  {
    _createdAt,
    title,
    slug,
    author->{
      _id,
      familyName,
      name,
      email,
      image,
    },
    _id,
    description,
    image{
      asset->{
        _id,
        url
      }
    },
    ingredients,
    instructions,
    time,
    difficulty,
    rating,
    tags,
    servings
}`);

export const GET_RECIPE_BY_AUTHOR_ID =
  defineQuery(`*[_type=="recipe" && author._ref==$id]
  {
    _createdAt,
    title,
    slug,
    author->{
      _id,
      familyName,
      name,
      email,
      image,
    },
    _id,
    description,
    image{
      asset->{
        _id,
        url
      }
    },
    ingredients,
    instructions,
    time,
    difficulty,
    rating,
    tags,
    servings
}`);

export const AUTHOR_BY_ID = defineQuery(`*[_type=="author" && _id==$id][0]{
  _id,
  id,
  name,
  familyName,
  email,
  image,
  }`);
