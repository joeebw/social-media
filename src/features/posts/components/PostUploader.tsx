import AvatarProfile from "@/components/AvatarProfile";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { IoImageOutline } from "react-icons/io5";
import { AiOutlineFileGif } from "react-icons/ai";
import { CgAttachment } from "react-icons/cg";
import { FaMicrophone, FaRegTrashAlt } from "react-icons/fa";
import useAppStore from "@/state/useStore";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useEffect, useState } from "react";
import ImageDropzone from "@/components/ImageDropzone";
import { IconContext } from "react-icons/lib";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createPost } from "@/utils/firebase";
import { CreatePost } from "@/ts/post.types";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const ICONS_UPLOADER = [
  {
    name: "Image",
    icon: <IoImageOutline />,
  },
  {
    name: "Clip",
    icon: <AiOutlineFileGif />,
  },
  {
    name: "Attachment",
    icon: <CgAttachment />,
  },
  {
    name: "Audio",
    icon: <FaMicrophone />,
  },
];

const MAX_FILE_SIZE = 7000000; // 7MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const postSchema = z.object({
  text: z
    .string()
    .min(1, { message: "Text is required to publish the post" })
    .max(500, { message: "Text cannot exceed 500 characters" }),
  image: z
    .custom<File | null>()
    .refine((file) => !file || file instanceof File, "Must be a valid file")
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "Max image size is 7MB"
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    )
    .nullable(),
});

type FormValues = z.infer<typeof postSchema>;

const PostUploader = () => {
  const [isUploadImage, setIsUploadImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const userData = useAppStore((state) => state.user);
  const userId = useAppStore((state) => state.idUser);

  const form = useForm<FormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      text: "",
      image: null,
    },
    mode: "onSubmit",
  });

  const handleSelectFile = (file: File) => {
    setSelectedFile(file);
    form.setValue("image", file, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleSubmit = async (data: FormValues) => {
    try {
      const dataPost: CreatePost = {
        userId: userId!,
        firstName: userData!.firstName,
        lastName: userData!.lastName,
        location: userData!.location,
        profielPicture: userData!.profilePicture,
        file: data.image,
        description: data.text,
      };
      // await createPost(dataPost);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      toast.success("Your post has been successfully uploaded!");
    } catch (error) {
      console.error("error submit");
    }

    form.reset();
    setSelectedFile(null);
    setIsUploadImage(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.handleSubmit(handleSubmit)();
    }
  };

  useEffect(() => {
    if (!isUploadImage) {
      setSelectedFile(null);
      form.setValue("image", null, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [isUploadImage]);

  return (
    <Card className="bg-secondaryBackground">
      <CardContent className="py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex items-center gap-5">
              <AvatarProfile
                className="w-[3.5rem] h-[3.5rem]"
                profilePicture={userData?.profilePicture}
                alt="profile picture"
              />

              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="What's on your mind..."
                        className="pt-3 resize-none rounded-3xl focus:border-primary focus:ring-primary"
                        onKeyDown={handleKeyDown}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            {isUploadImage && (
              <div className="grid grid-cols-8 mt-5">
                <div className="col-span-7">
                  <ImageDropzone
                    dropzoneText="Select image to post"
                    onFileSelect={handleSelectFile}
                    selectedFile={selectedFile}
                    error={form.formState.errors.image}
                  />
                </div>
                <div className="flex items-center justify-center col-span-1">
                  <IconContext.Provider value={{ size: "1.2rem" }}>
                    <FaRegTrashAlt
                      className="text-red-500 transition cursor-pointer hover:text-red-400"
                      onClick={() => setIsUploadImage(false)}
                    />
                  </IconContext.Provider>
                </div>
              </div>
            )}
            <Separator className="my-3 bg-gray-300" />

            <div className="flex justify-between">
              {ICONS_UPLOADER.map(({ icon, name }) => {
                return name === "Image" ? (
                  <div
                    className={clsx(
                      "flex items-center gap-2 p-2 font-medium transition",
                      "cursor-pointer text-gray-500 rounded-md hover:bg-gray-200"
                    )}
                    onClick={() => setIsUploadImage(true)}
                  >
                    {icon}
                    {name}
                  </div>
                ) : (
                  <div
                    className={clsx(
                      "flex items-center gap-2 p-2 font-medium transition",
                      "text-gray-400 cursor-not-allowed"
                    )}
                  >
                    {icon}
                    {name}
                  </div>
                );
              })}
              <Button
                className="w-20 text-white"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="animate-spin" />
                )}
                Post
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PostUploader;