"use client";

import { AMENITYOPTIONS, NAVIGATION_ROUTES, ROOMTYPE } from "@/app/constant";
import FormInput from "@/components/custom/input-field";
import { Typography } from "@/components/custom/typography";
import { Button } from "@/components/ui/button";
import { addRoom } from "@/lib/API/roomApi"; // should accept FormData
import { AddRoom_Fields } from "@/Store/AddRooms_Fields";
import { ErrorMessage, Form, Formik } from "formik";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

// shadcn imports
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

const FILE_LIMIT_COUNT = 10;
const IMAGE_MAX = 5 * 1024 * 1024; // 5 MB
const VIDEO_MAX = 50 * 1024 * 1024; // 50 MB

const validationSchema = Yup.object().shape({
  ownerName: Yup.string()
    .trim()
    .matches(/^[a-zA-Z\s]+$/, "Only letters allowed")
    .required("Owner Name is required"),
  roomTitle: Yup.string()
    .trim()
    .matches(/^[a-zA-Z0-9\s]+$/, "Only letters and numbers allowed")
    .required("Title is required"),
  location: Yup.string().trim().required("Location is required"),
  price: Yup.number()
    .typeError("Only numbers allowed")
    .min(0, "Price cannot be negative")
    .required("Room price is required"),
  type: Yup.string().required("Room Type is required"),
  amenities: Yup.array().of(Yup.string()).min(1, "Select at least one amenity"),
  contactNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be 10 digits")
    .required("Phone number is required"),
  beds: Yup.number()
    .typeError("Must be a number")
    .min(1, "At least 1 bed required")
    .required("Number of beds is required"),
  bathrooms: Yup.number()
    .typeError("Must be a number")
    .min(1, "At least 1 bathroom required")
    .required("Number of bathrooms is required"),
  description: Yup.string(),
  ownerRequirements: Yup.string(),
  images: Yup.mixed()
    .test(
      "files-present",
      "Please upload at least one image or video",
      (value) => {
        return !!value && value.length > 0;
      }
    )
    .test("file-count", `Max ${FILE_LIMIT_COUNT} files allowed`, (value) => {
      if (!value) return false;
      return value.length <= FILE_LIMIT_COUNT;
    })
    .test(
      "file-types-and-sizes",
      "Invalid file(s): images must be ≤5MB, videos ≤50MB",
      (value) => {
        if (!value) return false;
        const arr = Array.from(value);
        for (const f of arr) {
          if (!f.type) return false;
          if (f.type.startsWith("image/") && f.size > IMAGE_MAX) return false;
          if (f.type.startsWith("video/") && f.size > VIDEO_MAX) return false;
          if (!f.type.startsWith("image/") && !f.type.startsWith("video/"))
            return false;
        }
        return true;
      }
    ),
});

const initialValues = {
  roomTitle: "",
  location: "",
  price: "",
  type: "",
  amenities: [],
  beds: "",
  bathrooms: "",
  description: "",
  ownerRequirements: "",
  contactNumber: "",
  ownerName: "",
  images: [], // store as Array of File
};

export default function AddRoom() {
  // helper to build previews (memoized)
  const buildPreviews = (files) =>
    (files || []).map((f) => ({
      id: `${f.name}-${f.size}-${f.lastModified}`,
      url: URL.createObjectURL(f),
      type: f.type.startsWith("image/") ? "image" : "video",
      name: f.name,
    }));

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full bg-gradient-to-b from-orange-300 via-pink-400 to-purple-600 py-6">
      <div>
        <Typography variant="h2" className="text-center">
          Listing Property
        </Typography>
      </div>

      <div className="w-full max-w-2xl p-8 bg-white/60 backdrop-blur-md border border-black/40 rounded-2xl shadow-2xl mx-4 my-5">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            try {
              // Build FormData
              const formData = new FormData();
              formData.append("roomTitle", values.roomTitle.trim());
              formData.append("location", values.location.trim());
              formData.append("price", String(Number(values.price)));
              formData.append("type", values.type);
              formData.append("beds", String(values.beds || 1));
              formData.append("bathrooms", String(values.bathrooms || 1));
              formData.append("description", values.description?.trim() || "");
              formData.append(
                "ownerRequirements",
                values.ownerRequirements?.trim() || ""
              );
              formData.append("contactNumber", values.contactNumber);
              formData.append("ownerName", values.ownerName.trim());
              // append amenities as JSON string
              formData.append(
                "amenities",
                JSON.stringify(values.amenities || [])
              );

              // append each file under 'images' (backend should accept multiple files with same field name)
              if (values.images && values.images.length > 0) {
                values.images.forEach((file) => {
                  formData.append("images", file);
                });
              }

              // call API - expecting addRoom to accept FormData and send multipart/form-data
              const response = await addRoom(formData);

              if (response && response.success) {
                toast.success("Room added successfully!");
                resetForm();
                // redirect after short delay
                setTimeout(() => {
                  window.location.href =
                    NAVIGATION_ROUTES?.USER_PROFILE || "/user-profile";
                }, 1000);
              } else {
                // try show backend message if exists
                toast.error(
                  response?.message || "Failed to add room. Please try again."
                );
              }
            } catch (err) {
              console.error("Add room error:", err);
              toast.error(
                err?.message || "Failed to add room. Please try again."
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, handleChange, setFieldValue, isSubmitting }) => {
            const previews = useMemo(
              () => buildPreviews(values.images),
              [values.images]
            );

            // cleanup object URLs on unmount
            useEffect(() => {
              return () => {
                previews.forEach((p) => URL.revokeObjectURL(p.url));
              };
            }, [previews]);

            const handleFiles = (fileList) => {
              if (!fileList) return;
              const files = Array.from(fileList);

              // quick client-side filter & toast for invalid files
              const accepted = [];
              for (const f of files) {
                if (
                  !f.type.startsWith("image/") &&
                  !f.type.startsWith("video/")
                ) {
                  toast.error(`${f.name} is not an image or video`);
                  continue;
                }
                if (f.type.startsWith("image/") && f.size > IMAGE_MAX) {
                  toast.error(`${f.name} exceeds 5MB image limit`);
                  continue;
                }
                if (f.type.startsWith("video/") && f.size > VIDEO_MAX) {
                  toast.error(`${f.name} exceeds 50MB video limit`);
                  continue;
                }
                accepted.push(f);
              }

              // combine with existing files (up to limit)
              const combined = [...(values.images || []), ...accepted].slice(
                0,
                FILE_LIMIT_COUNT
              );
              setFieldValue("images", combined);
            };

            const removeFileAt = (index) => {
              const newArr = [...values.images];
              const removed = newArr.splice(index, 1);
              // revoke created object URL(s) if any
              removed.forEach((f) => {
                try {
                  const url = URL.createObjectURL(f);
                  URL.revokeObjectURL(url);
                } catch (e) {}
              });
              setFieldValue("images", newArr);
            };

            return (
              <Form className="space-y-4">
                {/* Map fields (excluding type and amenities handled below) */}
                {AddRoom_Fields.map((field) => {
                  if (field.name === "amenities") return null;

                  if (field.type === "textarea") {
                    return (
                      <div key={field.id}>
                        <label className="font-medium">{field.label}</label>
                        <textarea
                          name={field.name}
                          placeholder={field.placeholder}
                          onChange={handleChange}
                          value={values[field.name]}
                          className="w-full p-2 border rounded-md"
                          rows={3}
                        />
                        <ErrorMessage
                          name={field.name}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    );
                  }

                  if (field.type === "file") {
                    return (
                      <div key={field.id}>
                        <label className="font-medium">{field.label}</label>
                        <input
                          type="file"
                          multiple
                          accept="image/*,video/*"
                          onChange={(e) => handleFiles(e.target.files)}
                          className="w-full p-2 border rounded-md bg-white"
                        />
                        <ErrorMessage
                          name="images"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />

                        {/* previews */}
                        {previews.length > 0 && (
                          <div className="mt-3 grid grid-cols-3 gap-3">
                            {previews.map((p, idx) => (
                              <div
                                key={p.id}
                                className="relative border rounded overflow-hidden"
                              >
                                {p.type === "image" ? (
                                  <img
                                    src={p.url}
                                    alt={p.name}
                                    className="object-cover w-full h-32"
                                  />
                                ) : (
                                  <video
                                    src={p.url}
                                    controls
                                    className="object-cover w-full h-32"
                                  />
                                )}
                                <button
                                  type="button"
                                  onClick={() => removeFileAt(idx)}
                                  className="absolute top-1 right-1 bg-white/80 rounded-full p-1 shadow"
                                  aria-label={`Remove media ${idx}`}
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <FormInput
                      key={field.id}
                      id={field.name}
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                      onChange={handleChange}
                      value={values[field.name]}
                    />
                  );
                })}

                {/* Room Type - shadcn Select */}
                <div>
                  <label className="font-medium">Room Type</label>
                  <Select
                    value={values.type}
                    onValueChange={(val) => setFieldValue("type", val)}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select Room Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROOMTYPE.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Amenities - popover + command (multi-select) */}
                <div>
                  <label className="font-medium">Amenities</label>
                  <Popover>
                    <PopoverTrigger className="w-full border p-2 rounded-md text-left">
                      {values.amenities.length > 0
                        ? values.amenities.join(", ")
                        : "Select amenities"}
                    </PopoverTrigger>

                    <PopoverContent className="w-60 p-0">
                      <Command>
                        <CommandInput placeholder="Search amenities..." />
                        <CommandEmpty>No amenities found.</CommandEmpty>

                        <CommandGroup>
                          {AMENITYOPTIONS.map((item) => (
                            <CommandItem
                              key={item}
                              onSelect={() => {
                                if (values.amenities.includes(item)) {
                                  setFieldValue(
                                    "amenities",
                                    values.amenities.filter((a) => a !== item)
                                  );
                                } else {
                                  setFieldValue("amenities", [
                                    ...values.amenities,
                                    item,
                                  ]);
                                }
                              }}
                            >
                              {item}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <ErrorMessage
                    name="amenities"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  {isSubmitting ? "Adding Property..." : "ADD PROPERTY"}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
