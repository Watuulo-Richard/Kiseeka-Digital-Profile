/* Base Testimonial Type */
export type TestimonialBaseType = {
  id:          string;
  fullName:    string;
  email:       string;
  image:       string | null;
  profession:  string;
  description: string;
  userId:      string;
  createdAt:   Date;
  updatedAt:   Date;
};

export type CreateTestimonialType = Omit<
  TestimonialBaseType,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateTestimonialType = Partial<
  Omit<TestimonialBaseType, "id" | "userId" | "createdAt" | "updatedAt">
>;

/* Query Response: Get All Testimonials */
export type GetAllTestimonialsResponse = {
  success: boolean;
  data:    TestimonialBaseType[];
  message: string;
  error:   string | null;
  status:  number;
};

/* Query Response: Get Single Testimonial */
export type GetSingleTestimonialResponse = {
  success: boolean;
  data:    TestimonialBaseType | null;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Create Testimonial */
export type CreateTestimonialResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Update Testimonial */
export type UpdateTestimonialResponse = {
  success: boolean;
  id:      string;
  message: string;
  error:   string | null;
  status:  number;
};

/* Mutation Response: Delete Testimonial */
export type DeleteTestimonialResponse = {
  success: boolean;
  message: string;
  error:   string | null;
  status:  number;
};