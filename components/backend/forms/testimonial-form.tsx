'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import {
  FileText,
  Info,
  ImagePlus,
  SaveAll,
  Loader,
} from 'lucide-react';
import { TestimonialFormTypes, TestimonialSchema } from '@/schema/schema';
import ImageInput from '../image-upload';
import { toast } from 'sonner';
import { baseUrl } from '@/types/type';
import { Portfolio, Testimonial } from '@prisma/client';
import { Users } from '@/components/frontend/users';

export default function TestimonialForm({
  portfolio,
  testimonial,
}: {
  portfolio: Portfolio;
  testimonial: Testimonial | null;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestimonialFormTypes>({
    resolver: zodResolver(TestimonialSchema),
    defaultValues: {
      fullName: testimonial?.fullName,
      email: testimonial?.email,
      profession: testimonial?.profession,
      image: testimonial?.image || '/placeholder.svg',
      description: testimonial?.description,
    },
  });

  const initialImage = testimonial?.image || '/placeholder.svg';
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [loading, setLoading] = useState(false);

  async function handleOnSubmit(TestimonialData: TestimonialFormTypes) {
    setLoading(true);
    (TestimonialData.image = imageUrl),
      (TestimonialData.portfolioId = portfolio.id);
    // console.log(TestimonialData);
    if (!imageUrl) {
      setLoading(false);
      toast.error('Please upload an image for the referee');
      return;
    }
    if (testimonial) {
      try {
        const response = await fetch(
          `${baseUrl}/api/v1/testimonialAPI/${testimonial.id}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(TestimonialData),
          },
        );
        console.log(response);
        if (response.ok) {
          setLoading(false);
          console.log(response);
          toast.success('Testimonial Details Have Been Updated Successfully');
        } else {
          setLoading(false);
          toast.error('Failed To Update Testimonial Details...🥺');
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
        const response = await fetch(`${baseUrl}/api/v1/testimonialAPI`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(TestimonialData),
        });
        console.log(response);
        if (response.ok) {
          setLoading(false);
          console.log(response);
          toast.success('Testimonial Details Have Been Saved Successfully');
          reset();
        } else {
          setLoading(false);
          toast.error('Failed To Save Testimonial Details...🥺');
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
              <Users className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-[#F2B5A0] to-gray-900 bg-clip-text text-transparent">
              Submit Your Testimonial
            </h1>
          </div>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Kindly fill out the form below to share a professional testimonial
            for Kiseeka Pius. Your insights and endorsement help strengthen his
            digital profile and credibility.
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
                  Referee Information
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Please provide your details so your testimonial can be
                  verified and properly attributed.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="">
                  <Label className="text-gray-700 font-semibold">
                    Full Name
                  </Label>
                  <Input
                    placeholder="e.g., Watuulo Richard..."
                    {...register('fullName', { required: true })}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive">
                      Full Name is required...
                    </p>
                  )}
                </div>
                <div className="">
                  <Label className="text-gray-700 font-semibold">
                    Email Address
                  </Label>
                  <Input
                    placeholder="e.g., richard.watuulo@organization.com"
                    type="email"
                    {...register('email', { required: true })}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      Email address is required...
                    </p>
                  )}
                </div>
                <div className="">
                  <Label className="text-gray-700 font-semibold">
                    Profession
                  </Label>
                  <Input
                    placeholder="e.g., Senior Lecturer, Makerere University..."
                    type="text"
                    {...register('profession', { required: true })}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      Profession is required...
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Testimonial Image */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <ImagePlus className="h-5 w-5 text-gray-600" />
                  Upload Referee Image
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Add a professional image to represent your profile. (Max size:
                  2MB)
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4 w-full">
                <ImageInput
                  title="Referee Photo"
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
                  {...register('description', { required: true })}
                />
                {errors.description && (
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
                {loading ? (
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Loader className="h-5 w-5 mr-2 animate-spin" />
                    Saving Profile, Please Wait...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="lg"
                    className="text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <SaveAll className="h-5 w-5 mr-2" />
                    Save Testimonial
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
