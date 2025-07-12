'use client';
import { FileText, Info, ImagePlus, SaveAll, Loader } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileFormTypes, profileSchema } from '@/schema/schema';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Portfolio } from '@prisma/client';
import ImageInput from '../image-upload';
import { baseUrl } from '@/types/type';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { User } from '@/components/frontend/user';


export default function ProfileForm({
  userId,
  userPortfolio,
}: {
  userId: string;
  userPortfolio: Portfolio | null;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormTypes>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      title: userPortfolio?.title,
      bio: userPortfolio?.bio,
      profileImage: userPortfolio?.profileImage || '/placeholder.svg',
    },
  });

  const initialImage = userPortfolio?.profileImage || '/placeholder.svg';
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [loading, setLoading] = useState(false);

  async function handleOnSubmit(profileData: ProfileFormTypes) {
    setLoading(true);
    profileData.userId = userId;
    profileData.profileImage = imageUrl;
    // console.log(profileData);
    if (!imageUrl) {
      setLoading(false);
      toast.error('Please upload an image for the profile');
      return;
    }
    if (userPortfolio) {
      try {
        const response = await fetch(
          `${baseUrl}/api/v1/profileAPI/${userPortfolio.id}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profileData),
          },
        );
        console.log(response);
        if (response.ok) {
          setLoading(false);
          console.log(response);
          toast.success('Profile Details Have Been Updated Successfully');
        } else {
          setLoading(false);
          toast.error('Failed To Update Profile Details...🥺');
        }
      } catch (error) {
        setLoading(false);
        toast.error(
          '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
        );
        console.log(error);
      }
    } else {
      try {
        const response = await fetch(`${baseUrl}/api/v1/profileAPI`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData),
        });
        console.log(response);
        if (response.ok) {
          setLoading(false);
          console.log(response);
          toast.success('Profile Details Have Been Saved Successfully');
          reset();
        } else {
          setLoading(false);
          toast.error('Failed To Save Profile Details...🥺');
        }
      } catch (error) {
        setLoading(false);
        toast.error(
          '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
        );
        console.log(error);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-3">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-2">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-rose-300 to-[#F2B5A0] rounded-full">
              <User className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-[#F2B5A0] to-gray-900 bg-clip-text text-transparent">
              Set Up Your Digital Profile
            </h1>
          </div>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Complete the structured form below to showcase your personal and
            professional information. Each section is designed to highlight a
            specific area of your profile.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-4">
          {/* Grid Layout for Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Information Card */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Info className="h-5 w-5 text-gray-600" />
                  Basic Information
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Provide essential details to begin building your digital
                  profile.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Label className="text-gray-700 font-semibold">Full Name</Label>
                <Input
                  placeholder="Enter your full name..."
                  {...register('title', { required: true })}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">
                    Full Name is required...
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Profile Image */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <ImagePlus className="h-5 w-5 text-gray-600" />
                  Upload Your Profile Image
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Add a professional image to represent your profile. (Max size:
                  4MB)
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4 w-full">
                <ImageInput
                  title="Profile Photo"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="imageUploader"
                />
              </CardContent>
            </Card>

            {/* Description Card */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white lg:col-span-2">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <FileText className="h-5 w-5 text-gray-600" />
                  Professional Profile
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Summarize your career journey, unique value, and
                  accomplishments that define who you are.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Label className="text-gray-700 font-semibold">
                  Provide a detailed overview of your expertise, experience, and
                  what sets you apart.
                </Label>
                <Textarea
                  placeholder="Share your professional background, key skills, achievements, and what makes you stand out..."
                  className="min-h-32 resize-none"
                  {...register('bio', { required: true })}
                />
                {errors.bio && (
                  <p className="text-sm text-destructive">
                    Biography is required...
                  </p>
                )}
                {/* <FormDescription className="flex justify-between items-center">
                        <span className="text-gray-500">
                          Write a compelling description that highlights your
                          product's key features
                        </span>
                        <span className="font-medium text-blue-600">
                          {field.value?.length || 0}/500 characters
                        </span>
                      </FormDescription> */}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons Card */}
          <Card className="shadow-lg border border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {userPortfolio ? (
                  <>
                    {loading ? (
                      <Button
                        type="submit"
                        size="lg"
                        disabled={loading}
                        className="text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <Loader className="h-5 w-5 mr-2 animate-spin" />
                        Updating Profile...
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        size="lg"
                        className="text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <SaveAll className="h-5 w-5 mr-2" />
                        Update Profile
                      </Button>
                    )}
                  </>
                ) : loading ? (
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Loader className="h-5 w-5 mr-2 animate-spin" />
                    Saving Profile...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="lg"
                    className="text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <SaveAll className="h-5 w-5 mr-2" />
                    Save Profile
                  </Button>
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="bg-[#F2B5A0] text-white hover:border hover:border-[#F2B5A0] hover:bg-transparent font-semibold px-8 py-3 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Cancel & Reset
                </Button>
              </div>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-500">All fields are required</p>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
