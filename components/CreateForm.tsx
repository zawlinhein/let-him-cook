"use client";
import React, { useActionState, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, X, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { convertBlockArray } from "@/lib/utils";
import { recipeValidation } from "@/lib/validation";
import z from "zod";
import { createRecipe } from "@/lib/action";

const CreateForm = () => {
  const topRef = useRef<HTMLFormElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formInput = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        image: formData.get("image"),
        time: Number(formData.get("time")),
        rating: Number(formData.get("rating")),
        servings: Number(formData.get("servings")),
        difficulty: formData.get("difficulty") as string,
        tags,
        ingredients,
        instructions: convertBlockArray(formData.get("instructions") as string),
      };
      await recipeValidation.parseAsync(formInput);
      const result = await createRecipe(state, formData, tags, ingredients);
      setTags([]);
      setIngredients([]);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
      topRef.current?.scrollIntoView({ behavior: "smooth" });
      if (result.status === "SUCCESS") {
        return {
          status: "SUCCESS",
          error: "",
          message: "Recipe uploaded successfully!",
        };
      } else
        return {
          status: "ERROR",
          error: "",
          message: "Upload Failed!",
        };
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(
          error.flatten().fieldErrors as unknown as Record<string, string>
        );
        topRef.current?.scrollIntoView({ behavior: "smooth" });
        return { status: "ERROR", error: "Validation error!", message: "" };
      }
      return { status: "ERROR", error: "Something wrong!", message: "" };
    }
  };

  const [state, formAction, isPending] = useActionState(handleSubmit, {
    status: "INITIAL",
    error: "",
    message: "",
  });

  const [ingredients, setIngredients] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addTag = () => {
    setTags([...tags, ""]);
  };

  const removeTag = (index: number) => {
    if (tags.length > 1) {
      setTags(tags.filter((_, i) => i !== index));
    }
  };

  const updateTag = (index: number, value: string) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      {/* Success Message */}
      {state?.status === "SUCCESS" && (
        <Card className="border-0 shadow-lg mb-6 bg-secondary/10 border-secondary">
          <CardContent className="p-4">
            <p className="text-secondary font-medium">{state?.message}</p>
          </CardContent>
        </Card>
      )}

      {/* Error Message */}
      {state?.error && (
        <Card className="border-0 shadow-lg mb-6 bg-secondary/10 border-secondary">
          <CardContent className="p-4">
            <p className="text-destructive font-medium">{state.error}</p>
          </CardContent>
        </Card>
      )}

      {/* Form */}
      <form action={formAction} className="space-y-6" ref={topRef}>
        {/* Basic Information */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-text-main">
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-medium text-text-main"
              >
                Recipe Title *
              </Label>
              {errors.title && (
                <div className="text-destructive text-sm">{errors.title}</div>
              )}
              <Input
                id="title"
                name="title"
                placeholder="e.g., Spicy Chicken Tacos"
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-medium text-text-main"
              >
                Description *
              </Label>
              {errors.description && (
                <div className="text-destructive text-sm">
                  {errors.description}
                </div>
              )}
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your recipe in a few sentences..."
                className="rounded-xl min-h-[100px]"
                maxLength={300}
              />
              <p className="text-xs text-text-secondary">
                Maximum 300 characters
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Image Upload */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-text-main">
              Recipe Image
            </CardTitle>
            {errors.image && (
              <div className="text-destructive text-sm">{errors.image}</div>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label
                htmlFor="image"
                className="text-sm font-medium text-text-main"
              >
                Main Image *
              </Label>
              <div className="flex flex-col space-y-4">
                <div className="pb-2">
                  <Input
                    id="image"
                    name="image"
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary/90 pt-1.5 pb-1.5"
                  />
                </div>
                {imagePreview && (
                  <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Recipe preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {!imagePreview && (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                    <Upload className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                    <p className="text-text-secondary">
                      Upload an image of your recipe
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recipe Details */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-text-main">
              Recipe Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="time"
                  className="text-sm font-medium text-text-main"
                >
                  Total Time (minutes) *
                </Label>
                {errors.time && (
                  <div className="text-destructive text-sm">{errors.time}</div>
                )}
                <Input
                  id="time"
                  name="time"
                  type="number"
                  min="1"
                  max="1440"
                  placeholder="30"
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="rating"
                  className="text-sm font-medium text-text-main"
                >
                  Rating (0-5) *
                </Label>
                {errors.rating && (
                  <div className="text-destructive text-sm">
                    {errors.rating}
                  </div>
                )}
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="4.5"
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="servings"
                  className="text-sm font-medium text-text-main"
                >
                  Servings
                </Label>
                {errors.servings && (
                  <div className="text-destructive text-sm">
                    {errors.servings}
                  </div>
                )}
                <Input
                  id="servings"
                  name="servings"
                  type="number"
                  min="1"
                  placeholder="4"
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-text-main">
                Difficulty *
              </Label>
              {errors.difficulty && (
                <div className="text-destructive text-sm">
                  {errors.difficulty}
                </div>
              )}
              <RadioGroup name="difficulty" className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Easy" id="easy" />
                  <Label
                    htmlFor="easy"
                    className="text-sm text-text-main cursor-pointer"
                  >
                    Easy
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Medium" id="medium" />
                  <Label
                    htmlFor="medium"
                    className="text-sm text-text-main cursor-pointer"
                  >
                    Medium
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Hard" id="hard" />
                  <Label
                    htmlFor="hard"
                    className="text-sm text-text-main cursor-pointer"
                  >
                    Hard
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Ingredients */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-text-main">
              Ingredients
            </CardTitle>
            {errors.ingredients && (
              <div className="text-destructive text-sm">
                {errors.ingredients}
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  name="ingredients"
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  placeholder={`Ingredient ${index + 1}`}
                  className="rounded-xl flex-1"
                />
                {ingredients.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeIngredient(index)}
                    className="rounded-xl px-3"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addIngredient}
              className="rounded-xl flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Ingredient</span>
            </Button>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-text-main">
              Instructions
            </CardTitle>
            {errors.instructions && (
              <div className="text-destructive text-sm">
                {errors.instructions}
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label
                htmlFor="instructions"
                className="text-sm font-medium text-text-main"
              >
                Cooking Instructions *
              </Label>
              <Textarea
                id="instructions"
                name="instructions"
                placeholder="1. Season the chicken with spices...&#10;2. Heat oil in a large skillet...&#10;3. Cook chicken for 6-8 minutes..."
                className="rounded-xl min-h-[200px]"
              />
              <p className="text-xs text-text-secondary">
                Write each step on a new line. Number your steps for clarity.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-text-main">
              Tags
            </CardTitle>
            {errors.tags && (
              <div className="text-destructive text-sm">{errors.tags}</div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {tags.map((tag, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  name="tags"
                  value={tag}
                  onChange={(e) => updateTag(index, e.target.value)}
                  placeholder={`Tag ${index + 1} (e.g., Mexican, Spicy, Quick)`}
                  className="rounded-xl flex-1"
                />
                {tags.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeTag(index)}
                    className="rounded-xl px-3"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addTag}
              className="rounded-xl flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Tag</span>
            </Button>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-3 text-lg font-medium"
            >
              {isPending ? "Creating Recipe..." : "Create Recipe"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </>
  );
};

export default CreateForm;
