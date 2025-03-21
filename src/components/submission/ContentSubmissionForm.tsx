import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  Upload,
  FileText,
  Image,
  MessageSquare,
  ArrowRight,
  X,
} from "lucide-react";

const articleSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  content: z
    .string()
    .min(50, { message: "Content must be at least 50 characters" }),
  author: z.string().min(2, { message: "Author name is required" }),
});

const photoSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  photographer: z.string().min(2, { message: "Photographer name is required" }),
});

const testimonialSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  testimony: z
    .string()
    .min(30, { message: "Testimony must be at least 30 characters" }),
  author: z.string().min(2, { message: "Author name is required" }),
});

interface ContentSubmissionFormProps {
  onSubmit?: (data: any, contentType: string) => void;
  isOpen?: boolean;
}

const ContentSubmissionForm = ({
  onSubmit = () => {},
  isOpen = true,
}: ContentSubmissionFormProps) => {
  const [contentType, setContentType] = useState("article");
  const [files, setFiles] = useState<File[]>([]);
  const [previewStep, setPreviewStep] = useState(false);

  const articleForm = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      content: "",
      author: "",
    },
  });

  const photoForm = useForm<z.infer<typeof photoSchema>>({
    resolver: zodResolver(photoSchema),
    defaultValues: {
      title: "",
      description: "",
      photographer: "",
    },
  });

  const testimonialForm = useForm<z.infer<typeof testimonialSchema>>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      title: "",
      testimony: "",
      author: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (data: any) => {
    // In a real implementation, this would handle the form submission
    // including uploading any files to a server
    onSubmit(
      {
        ...data,
        files,
        contentType,
      },
      contentType,
    );

    // Reset forms and state
    articleForm.reset();
    photoForm.reset();
    testimonialForm.reset();
    setFiles([]);
    setPreviewStep(false);
  };

  const getCurrentForm = () => {
    switch (contentType) {
      case "article":
        return articleForm;
      case "photo":
        return photoForm;
      case "testimonial":
        return testimonialForm;
      default:
        return articleForm;
    }
  };

  const renderPreview = () => {
    const currentForm = getCurrentForm();
    const formValues = currentForm.getValues();

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Preview Your Submission</h3>

        <div className="mb-4">
          <h4 className="font-semibold">Content Type:</h4>
          <p className="capitalize">{contentType}</p>
        </div>

        {Object.entries(formValues).map(([key, value]) => (
          <div key={key} className="mb-4">
            <h4 className="font-semibold capitalize">{key}:</h4>
            <p className="whitespace-pre-wrap">{value as string}</p>
          </div>
        ))}

        {files.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold">Files:</h4>
            <ul className="list-disc pl-5">
              {files.map((file, index) => (
                <li key={index}>
                  {file.name} ({Math.round(file.size / 1024)} KB)
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setPreviewStep(false)}>
            Edit Submission
          </Button>
          <Button onClick={() => handleSubmit(formValues)}>
            Submit <Check className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  if (previewStep) {
    return renderPreview();
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Submit Content for Youth Conference Magazine
      </h2>

      <Tabs
        value={contentType}
        onValueChange={setContentType}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="article" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" /> Article
          </TabsTrigger>
          <TabsTrigger value="photo" className="flex items-center">
            <Image className="mr-2 h-4 w-4" /> Photo
          </TabsTrigger>
          <TabsTrigger value="testimonial" className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" /> Testimonial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="article">
          <Form {...articleForm}>
            <form
              onSubmit={articleForm.handleSubmit(() => setPreviewStep(true))}
              className="space-y-6"
            >
              <FormField
                control={articleForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Article Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the title of your article"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Choose a concise, descriptive title for your article.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={articleForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Article Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your article here..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Share your thoughts, insights, or story for the magazine.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={articleForm.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormDescription>
                      How you would like to be credited in the magazine.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div>
                  <FormLabel htmlFor="files">
                    Supporting Documents (Optional)
                  </FormLabel>
                  <div className="mt-2">
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                    >
                      <span className="flex items-center space-x-2">
                        <Upload className="w-6 h-6 text-gray-500" />
                        <span className="font-medium text-gray-600">
                          Drop files to attach, or{" "}
                          <span className="text-blue-600 underline">
                            browse
                          </span>
                        </span>
                      </span>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        multiple
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    You can upload additional documents or images to support
                    your article.
                  </p>
                </div>

                {files.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">
                      Attached Files:
                    </h4>
                    <ul className="space-y-2">
                      {files.map((file, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                        >
                          <span className="text-sm truncate max-w-[80%]">
                            {file.name}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full">
                Preview Submission <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="photo">
          <Form {...photoForm}>
            <form
              onSubmit={photoForm.handleSubmit(() => setPreviewStep(true))}
              className="space-y-6"
            >
              <FormField
                control={photoForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a title for your photo"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Give your photo a descriptive title.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={photoForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your photo..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide context or the story behind your photo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={photoForm.control}
                name="photographer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photographer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormDescription>
                      How you would like to be credited in the magazine.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div>
                  <FormLabel htmlFor="photos">
                    Upload Photos (Required)
                  </FormLabel>
                  <div className="mt-2">
                    <label
                      htmlFor="photo-upload"
                      className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                    >
                      <span className="flex items-center space-x-2">
                        <Upload className="w-6 h-6 text-gray-500" />
                        <span className="font-medium text-gray-600">
                          Drop photos to upload, or{" "}
                          <span className="text-blue-600 underline">
                            browse
                          </span>
                        </span>
                      </span>
                      <input
                        id="photo-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Upload high-quality photos in JPG, PNG, or HEIF format.
                  </p>
                </div>

                {files.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">
                      Uploaded Photos:
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {files.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                            {file.type.startsWith("image/") ? (
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className="text-center p-4">
                                <FileText className="h-8 w-8 mx-auto text-gray-400" />
                                <span className="text-xs text-gray-500 mt-2 block truncate">
                                  {file.name}
                                </span>
                              </div>
                            )}
                          </div>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removeFile(index)}
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full">
                Preview Submission <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="testimonial">
          <Form {...testimonialForm}>
            <form
              onSubmit={testimonialForm.handleSubmit(() =>
                setPreviewStep(true),
              )}
              className="space-y-6"
            >
              <FormField
                control={testimonialForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Testimonial Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a title for your testimonial"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A brief title that captures the essence of your testimony.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={testimonialForm.control}
                name="testimony"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Testimony</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share your testimony here..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Share your personal experience, miracle, or spiritual
                      journey.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={testimonialForm.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormDescription>
                      How you would like to be credited in the magazine.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div>
                  <FormLabel htmlFor="photos">
                    Supporting Photos (Optional)
                  </FormLabel>
                  <div className="mt-2">
                    <label
                      htmlFor="testimonial-upload"
                      className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                    >
                      <span className="flex items-center space-x-2">
                        <Upload className="w-6 h-6 text-gray-500" />
                        <span className="font-medium text-gray-600">
                          Drop photos to upload, or{" "}
                          <span className="text-blue-600 underline">
                            browse
                          </span>
                        </span>
                      </span>
                      <input
                        id="testimonial-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    You can upload photos related to your testimony (optional).
                  </p>
                </div>

                {files.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">
                      Uploaded Photos:
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {files.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                            {file.type.startsWith("image/") ? (
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className="text-center p-4">
                                <FileText className="h-8 w-8 mx-auto text-gray-400" />
                                <span className="text-xs text-gray-500 mt-2 block truncate">
                                  {file.name}
                                </span>
                              </div>
                            )}
                          </div>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removeFile(index)}
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full">
                Preview Submission <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentSubmissionForm;
