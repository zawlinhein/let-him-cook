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
