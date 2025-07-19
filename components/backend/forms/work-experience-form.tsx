'use client';

import { WorkExperienceFormTypes, workExperienceSchema } from '@/schema/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { Portfolio, WorkExperience } from '@prisma/client';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { StartDate } from '../start-date';
import { baseUrl } from '@/types/type';
import { EndDate } from '../end-date';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  FileText,
  Info,
  Loader2,
  BriefcaseBusiness,
  CalendarDays,
} from 'lucide-react';

export default function WorkExperienceForm({
  portfolio,
  workExperience,
}: {
  portfolio: Portfolio;
  workExperience: WorkExperience | null;
}) {
  const formatDate = (date: Date | string) => {
    if(!date) return ''; // Handle null, undefined, or empty string
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return ''; // Handle invalid Date
    return format(dateObj, 'MMM dd, yyyy');
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<WorkExperienceFormTypes>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      position: workExperience?.position,
      company: workExperience?.company,
      startDate: workExperience?.startDate ? new Date(workExperience.startDate).toISOString() : '',
      endDate: workExperience?.endDate ? new Date(workExperience.endDate).toISOString() : '',
      description: workExperience?.description,
    },
  });

  const [loading, setLoading] = useState(false);
  const watchedStartDate = watch('startDate');
  const watchedEndDate = watch('endDate');

  //   Handle Start Date Change
  function handleStartDateChange(date: Date) {
    setValue('startDate', date.toISOString(), { shouldValidate: true });
  }

  //   Handle Start Date Change
  function handleEndDateChange(date: Date) {
    setValue('endDate', date.toISOString(), { shouldValidate: true });
  }

  async function handleWorkExperienceOnSubmit(
    WorkExperienceFormData: WorkExperienceFormTypes,
  ) {
    setLoading(true);
    WorkExperienceFormData.portfolioId = portfolio.id;
    if (workExperience) {
      try {
        const response = await fetch(
          `${baseUrl}/api/v1/workexperienceAPI/${workExperience.id}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(WorkExperienceFormData),
          },
        );
        console.log(WorkExperienceFormData, 'kiseeka')
        console.log(response);
        if (response.ok) {
          setLoading(false);
          toast.success(
            'Experience Details Updated Successfully In The System',
          );
          reset(); // Reset form after successful submission
        } else {
          setLoading(false);
          console.log(response);
          toast.error('Failed To Update Work Experience...!!!🥺');
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error(
          '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
        );
      }
    } else {
      try {
        const response = await fetch(`${baseUrl}/api/v1/workexperienceAPI`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(WorkExperienceFormData),
        });
        console.log(response);
        if (response.ok) {
          setLoading(false);
          toast.success('Experience Details Saved Successfully In The System');
          reset(); // Reset form after successful submission
        } else {
          setLoading(false);
          console.log(response);
          toast.error(
            'Failed To Save Work Experience...🥺 The entry has failed to be recorded in the system.',
          );
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error(
          '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
        );
      }
    }
  }
  // function onCancel() {
  //   reset();
  // };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-rose-300 to-[#F2B5A0] rounded-full">
              <BriefcaseBusiness className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-[#F2B5A0] to-gray-900 bg-clip-text text-transparent">
              Add Work Experience
            </h1>
          </div>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Provide detailed information about your professional journey by
            completing the structured sections below. Each card highlights a key
            aspect of your work experience to ensure a complete and polished
            profile.
          </p>
        </div>

        <div>
          <form
            onSubmit={handleSubmit(handleWorkExperienceOnSubmit)}
            className="space-y-6"
          >
            {/* Grid Layout for Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information Card */}
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white dark:bg-[#0F0F12] dark:border-[#1F1F23]">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Info className="h-5 w-5 text-gray-600" />
                    Basic Information
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Essential details about your work experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label className="text-gray-700 font-semibold">
                      Position
                    </Label>
                    <Input
                      placeholder="Enter your job title..."
                      {...register('position', { required: true })}
                    />
                    {errors.position && (
                      <span className="text-sm text-destructive">
                        Position is required...
                      </span>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-700 font-semibold">
                      Company
                    </Label>
                    <Input
                      placeholder="Enter the company or organization name..."
                      {...register('company', { required: true })}
                    />
                    {errors.company && (
                      <span className="text-sm text-destructive">
                        Company is required...
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white dark:bg-[#0F0F12] dark:border-[#1F1F23]">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <CalendarDays className="h-5 w-5 text-gray-600" />
                    Start & End Dates
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Specify the duration of your employment
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="">
                    <div>
                      <StartDate
                        startDate={
                          watchedStartDate
                            ? new Date(watchedStartDate)
                            : new Date()
                        }
                        setStartDate={handleStartDateChange}
                      />
                      {errors.startDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.startDate.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="">
                    <div>
                      <EndDate
                        endDate={
                          watchedEndDate ? new Date(watchedEndDate) : new Date()
                        }
                        setEndDate={handleEndDateChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description Card */}
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white dark:bg-[#0F0F12] dark:border-[#1F1F23] lg:col-span-2">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <FileText className="h-5 w-5 text-gray-600" />
                    Role Description
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Provide a detailed overview of your responsibilities,
                    achievements, and contributions in this position.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div>
                    <Label className="text-gray-700 font-semibold">
                      Description
                    </Label>
                    <div>
                      <Textarea
                        placeholder="Describe your key responsibilities, accomplishments, and the impact you made in this role..."
                        className="min-h-32 resize-none"
                        {...register('description', { required: true })}
                      />
                      {errors.description && (
                        <span className="text-sm text-destructive">
                          Description is required...
                        </span>
                      )}
                    </div>
                    {/* <FormDescription className="flex justify-between items-center">
                          <span className="text-gray-500">
                            Write a compelling description that highlights your
                            product's key features
                          </span>
                          <span className="font-medium text-blue-600">
                            {field.value?.length || 0}/500 characters
                          </span>
                        </FormDescription> */}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons Card */}
            <Card className="shadow-lg border border-gray-200 bg-white dark:bg-[#0F0F12] dark:border-[#1F1F23]">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {workExperience ? (
                    <>
                      {loading ? (
                        <Button
                          type="submit"
                          size="lg"
                          disabled
                          className="font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Update Work Experience...
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          size="lg"
                          className="font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                          Update Work Experience
                        </Button>
                      )}
                    </>
                  ) : loading ? (
                    <Button
                      type="submit"
                      size="lg"
                      disabled
                      className="font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Saving Work Experience...
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      size="lg"
                      className="font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Save Work Experience
                    </Button>
                  )}

                  <Button
                    type="button"
                    // onClick={onCancel}
                    variant="outline"
                    size="lg"
                    className="bg-[#F2B5A0] text-white hover:border hover:border-[#F2B5A0] hover:bg-transparent font-semibold px-8 py-3 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Cancel & Reset
                  </Button>
                </div>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-500">
                    All fields are required
                  </p>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
