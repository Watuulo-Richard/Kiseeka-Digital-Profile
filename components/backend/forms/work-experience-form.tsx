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
  Star,
  Package,
  Tag,
  DollarSign,
  Image,
  Sparkles,
  FileText,
  Info,
  Loader2,
} from 'lucide-react';
import { WorkExperienceFormTypes, workExperienceSchema } from '@/schema/schema';

import { baseUrl } from '@/types/type';
import { toast } from 'sonner';
import { StartDate } from '../start-date';
import { EndDate } from '../end-date';
import { Portfolio } from '@/lib/generated/prisma';

export default function WorkExperienceForm({portfolio}:{portfolio:Portfolio}) {
  console.log(portfolio, 'ogubana....')
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
      position: '',
      company: '',
      startDate: new Date().toISOString(), // Keep as string in form
      endDate: undefined, // or null, since it's optional
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
    WorkExperienceFormData.portfolioId = portfolio.id
    console.log(WorkExperienceFormData,"Jesus...")
    try {
      const response = await fetch(`${baseUrl}/api/v1/workexperienceAPI`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(WorkExperienceFormData),
      });
      console.log(response);
      if (response.ok) {
        setLoading(false);
        toast.success(
          'Work Experience Saved Successfully...✅ The entry has been successfully recorded in the system.',
        );
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
        'Something Went Wrong, Check Your Internet Connection And Try Again...!!!❌',
      );
    }
  }
  // function onCancel() {
  //   reset();
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <Package className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
              Create New Product
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Build your product listing by filling out the organized sections
            below. Each card focuses on a specific aspect of your product.
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
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Info className="h-5 w-5 text-gray-600" />
                    Basic Information
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Essential details about your product
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label className="text-gray-700 font-semibold">
                      Position
                    </Label>
                    <Input
                      placeholder="Enter position..."
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
                      placeholder="Enter company..."
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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

              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <DollarSign className="h-5 w-5 text-gray-600" />
                    Start & End Dates
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Set your employment period
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="">
                    <Label className="text-gray-700 font-semibold">From</Label>
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
                    <Label className="text-gray-700 font-semibold">To</Label>
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
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white lg:col-span-2">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <FileText className="h-5 w-5 text-gray-600" />
                    Product Description
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Describe your product in detail to attract customers
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div>
                    <Label className="text-gray-700 font-semibold">
                      Description
                    </Label>
                    <div>
                      <Textarea
                        placeholder="Describe your product features, benefits, and what makes it special..."
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-32 resize-none"
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
            <Card className="shadow-lg border border-gray-200 bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {loading ? (
                    <Button
                      type="submit"
                      size="lg"
                      disabled
                      className="bg-gradient-to-r from-pink-300/90 via-purple-600 to-red-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Saving Work Experience, Please Wait...
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-gradient-to-r from-pink-300/90 via-rose-300 to-emerald-400 hover:from-pink-600/100 hover:via-rose-300 hover:to-emerald-200 text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                      Save Work Experience
                    </Button>
                  )}

                  <Button
                    type="button"
                    // onClick={onCancel}
                    variant="outline"
                    size="lg"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold px-8 py-3 shadow-md hover:shadow-lg transition-all duration-300"
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
