'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectsFormTypes, ProjectsSchema } from '@/schema/schema';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Portfolio } from '@prisma/client';
import { baseUrl } from '@/types/type';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Package,
  FileText,
  Info,
  Loader2,
  Link,
  GlobeLock,
} from 'lucide-react';

export default function ProjectsForm({portfolio}:{portfolio:Portfolio}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectsFormTypes>({
    resolver: zodResolver(ProjectsSchema),
    defaultValues: {
      title: '',
      description: '',
      url: ''
    },
  });

  const [loading, setLoading] = useState(false);


  async function handleEducationOnSubmit(
    ProjectFormData: ProjectsFormTypes,
  ) {
    ProjectFormData.portfolioId = portfolio.id;
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/v1/projectsAPI`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ProjectFormData),
      });
      console.log(response);
      if (response.ok) {
        setLoading(false);
        toast.success(
          'Project Saved Successfully In The System',
        );
        reset(); // Reset form after successful submission
      } else {
        setLoading(false);
        console.log(response);
        toast.error(
          'Failed To Save Project In The System...🥺',
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
              <GlobeLock className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
              Add a New Project
            </h1>
          </div>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Provide detailed information about your project using the structured sections below. Each card is designed to capture a key element of your project to ensure a complete and compelling presentation.
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
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Info className="h-5 w-5 text-gray-600" />
                    	Project Details
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Key information about your audit or consultancy assignment
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label className="text-gray-700 font-semibold">
                      Enter the official title of the audit or project.
                    </Label>
                    <Input
                      placeholder="Enter project title..."
                      {...register('title', { required: true })}
                    />
                    {errors.title && (
                      <span className="text-sm text-destructive">
                        Project title is required...
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Link className="h-5 w-5 text-gray-600" />
                    Project Url
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                     Include a link to the project report, published article, client website, or portfolio reference (if available).
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label className="text-gray-700 font-semibold">
                      Project Link
                    </Label>
                    <Input
                      placeholder="https://example.com/audit-report"
                      {...register('url', { required: true })}
                    />
                    {errors.url && (
                      <span className="text-sm text-destructive">
                        Project url is required...
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Description Card */}
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white lg:col-span-2">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <FileText className="h-5 w-5 text-gray-600" />
                    Project Description ✅ (kept, it's appropriate)
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Provide a concise summary of the audit or consultancy assignment...
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div>
                    <Label className="text-gray-700 font-semibold">
                      Description
                    </Label>
                    <div>
                      <Textarea
                        placeholder="e.g., Conducted a financial compliance audit for XYZ Ltd..."
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
                      className="flex items-center font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Saving Project, Please Wait...
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      size="lg"
                      className="font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Save Project
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
