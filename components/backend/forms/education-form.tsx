'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { EducationFormTypes, EducationSchema } from '@/schema/schema';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Education, Portfolio } from '@prisma/client';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  GraduationCap,
  CalendarDays,
} from 'lucide-react';

export default function EducationForm({
  portfolio,
  educationBackground,
}: {
  portfolio: Portfolio;
  educationBackground: Education | null;
}) {
  const formatDate = (date: Date | string) => {
    if (!date) return ''; // Handle null, undefined, or empty string
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
  } = useForm<EducationFormTypes>({
    resolver: zodResolver(EducationSchema),
    defaultValues: {
      institution: educationBackground?.institution,
      educationLevel: educationBackground?.educationLevel,
      startDate: formatDate(educationBackground?.startDate || ''),
      endDate: formatDate(educationBackground?.endDate || ''),
      description: educationBackground?.description,
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

  async function handleEducationOnSubmit(
    EducationFormData: EducationFormTypes,
  ) {
    EducationFormData.portfolioId = portfolio.id;
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/v1/educationAPI`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(EducationFormData),
      });
      console.log(response);
      if (response.ok) {
        setLoading(false);
        toast.success('Education Details Saved Successfully In The System');
        reset(); // Reset form after successful submission
      } else {
        setLoading(false);
        console.log(response);
        toast.error('Failed To Save Education Details In The System...🥺');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(
        '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
      );
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
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-[#F2B5A0] to-gray-900 bg-clip-text text-transparent">
              Add Your Education Background
            </h1>
          </div>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Provide details about your academic journey by completing the
            sections below. Each card highlights a key stage or qualification in
            your education history.
          </p>
        </div>

        <div>
          <form
            onSubmit={handleSubmit(handleEducationOnSubmit)}
            className="space-y-6"
          >
            {/* Grid Layout for Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information Card */}
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white dark:bg-[#0F0F12] dark:border-[#1F1F23]">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Info className="h-5 w-5 text-gray-600" />
                    Education Details
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Provide key information about your academic background.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label className="text-gray-700 font-semibold">
                      Name of Institution
                    </Label>
                    <Input
                      placeholder="Enter name of institution..."
                      {...register('institution', { required: true })}
                    />
                    {errors.institution && (
                      <span className="text-sm text-destructive">
                        Institution name is required...
                      </span>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-700 font-semibold">
                      Level of Education
                    </Label>
                    <Input
                      placeholder="Enter level of Education..."
                      {...register('educationLevel', { required: true })}
                    />
                    {errors.educationLevel && (
                      <span className="text-sm text-destructive">
                        Level of Education is required...
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
                    Specify the period you attended this institution
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
                    Education Summary
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Provide a brief overview of what you studied, key
                    achievements, and any notable experiences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div>
                    <Label className="text-gray-700 font-semibold">
                      Description
                    </Label>
                    <div>
                      <Textarea
                        placeholder="Describe your course, key subjects, achievements, or any relevant academic highlights..."
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
                  {loading ? (
                    <Button
                      type="submit"
                      size="lg"
                      disabled
                      className="font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center"
                    >
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Saving Education Background
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      size="lg"
                      className="flex items-center font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Save Education Background
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
