'use client';
import { FileText, Info, Loader2, BriefcaseBusiness } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { SkillFormTypes, SkillSchema } from '@/schema/schema';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Portfolio, Skill } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { baseUrl } from '@/types/type';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';


export default function SkillForm({
  portfolio,
  skill,
}: {
  portfolio: Portfolio;
  skill: Skill | null;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillFormTypes>({
    resolver: zodResolver(SkillSchema),
    defaultValues: {
      name: skill?.name,
      level: skill?.level as number,
      description: skill?.description,
    },
  });

  const [loading, setLoading] = useState(false);

  async function handleWorkExperienceOnSubmit(SkillFormData: SkillFormTypes) {
    setLoading(true);
    SkillFormData.portfolioId = portfolio.id;
    // console.log(SkillFormData, 'Jesus...');
    if (skill) {
      try {
        const response = await fetch(
          `${baseUrl}/api/v1/skillsAPI/${skill.id}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(SkillFormData),
          },
        );
        console.log(response);
        if (response.ok) {
          setLoading(false);
          toast.success('Skill Details Updated Successfully In The System');
          reset(); // Reset form after successful submission
        } else {
          setLoading(false);
          console.log(response);
          toast.error('Failed To Update Work Skill In The System...🥺');
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
        const response = await fetch(`${baseUrl}/api/v1/skillsAPI`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(SkillFormData),
        });
        console.log(response);
        if (response.ok) {
          setLoading(false);
          toast.success('Skill Details Saved Successfully In The System');
          reset(); // Reset form after successful submission
        } else {
          setLoading(false);
          console.log(response);
          toast.error('Failed To Save Work Skill In The System...🥺');
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
              Add a Professional Skill
            </h1>
          </div>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Showcase your expertise by filling out the details below. Each
            section helps present your skills clearly and professionally to
            enhance your digital profile.
          </p>
        </div>

        <div>
          <form
            onSubmit={handleSubmit(handleWorkExperienceOnSubmit)}
            className="space-y-3"
          >
            {/* Grid Layout for Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information Card */}
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white dark:bg-[#0F0F12] dark:border-[#1F1F23]">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Info className="h-5 w-5 text-gray-600" />
                    Skill Details
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Demonstrate your capabilities by outlining the specific
                    skills you've mastered. Focus on hands-on experience,
                    achievements, and areas of specialization.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label className="text-gray-700 font-semibold">
                      Skill title
                    </Label>
                    <Input
                      placeholder="Enter your job title..."
                      {...register('name', { required: true })}
                    />
                    {errors.name && (
                      <span className="text-sm text-destructive">
                        Skill title is required...
                      </span>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-700 font-semibold">
                      Proficiency Level
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Specify your proficiency level as a percentage (e.g., 90%)"
                      {...register('level', { required: true })}
                    />
                    {errors.description && (
                      <span className="text-sm text-destructive">
                        Skill Description is required...
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Description Card */}
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white dark:bg-[#0F0F12] dark:border-[#1F1F23]">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <FileText className="h-5 w-5 text-gray-600" />
                    Detailed Skill Description
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Provide a rich description of how you've applied this skill
                    in real-world scenarios—include tasks performed, key
                    achievements, tools or technologies used, and measurable
                    outcomes.
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
                  {skill ? (
                    loading ? (
                      <Button
                        type="submit"
                        size="lg"
                        disabled={loading}
                        className="font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Updating Your Skill Entry...
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        size="lg"
                        disabled={loading}
                        className="font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Update Skill Details
                      </Button>
                    )
                  ) : loading ? (
                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Processing Your Skill Entry...
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Save Skill Details
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
