"use client";

import FormInput from "@/components/custom/input-field";
import { Typography } from "@/components/custom/typography";
import { Button } from "@/components/ui/button";
import { addRoom } from "@/lib/API/roomApi";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ErrorMessage, Form, Formik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";
import { AMENITYOPTIONS, NAVIGATION_ROUTES, ROOMTYPE } from "../../constant";

export default function AddRoom() {
  const validationSchema = Yup.object({
    roomTitle: Yup.string()
      .trim()
      .required("Title is required")
      .matches(/^[a-zA-Z0-9\s]+$/, "Only letters and numbers allowed"),

    location: Yup.string()
      .trim()
      .required("Location is required")
      .matches(/^[a-zA-Z0-9\s,]+$/, "Letters, numbers and commas only"),

    price: Yup.number()
      .typeError("Only numbers allowed")
      .min(0, "Price cannot be negative")
      .required("Room price is required"),

    type: Yup.string().required("Room Type is required"),

    amenities: Yup.array()
      .of(Yup.string())
      .min(1, "Select at least one amenity"),

    contactNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Must be 10 digits")
      .required("Phone number is required"),

    ownerName: Yup.string()
      .trim()
      .matches(/^[a-zA-Z\s]+$/, "Only letters allowed")
      .required("Owner Name is required"),

    beds: Yup.number()
      .typeError("Must be a number")
      .min(1, "At least 1 bed required")
      .required("Number of beds is required"),

    bathrooms: Yup.number()
      .typeError("Must be a number")
      .min(1, "At least 1 bathroom required")
      .required("Number of bathrooms is required"),
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
    images: [], // You'll need to handle image upload separately
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      // Map frontend field names to backend field names
      const roomData = {
        roomTitle: values.roomTitle.trim(),
        location: values.location.trim(),
        price: Number(values.price),
        type: values.type,
        amenities: values.amenities,
        beds: Number(values.beds) || 1,
        bathrooms: Number(values.bathrooms) || 1,
        description: values.description?.trim() || "",
        ownerRequirements: values.ownerRequirements?.trim() || "",
        contactNumber: values.contactNumber,
        ownerName: values.ownerName.trim(),
        images: ["placeholder.jpg"], // TODO: Replace with actual image upload
      };

      console.log("📤 Sending room data:", roomData);

      const response = await addRoom(roomData);

      if (response.success) {
        toast.success("Room added successfully!");
        resetForm();

        setTimeout(() => {
          window.location.href =
            NAVIGATION_ROUTES.USER_PROFILE || "/user-profile";
        }, 1200);
      }
    } catch (error) {
      console.error("❌ Add room error:", error);
      toast.error(error.message || "Failed to add room. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full bg-gradient-to-b from-orange-300 via-pink-400 to-purple-600 py-4">
      <div>
        <Typography variant="h2" className="text-center">
          Listing Property
        </Typography>
      </div>
      <div className="w-full max-w-2xl p-10 bg-white/60 backdrop-blur-md border border-black/40 rounded-2xl shadow-2xl mx-4 m-5">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, setFieldValue, values, isSubmitting }) => (
            <Form className="space-y-3">
              {/* Room Title */}
              <FormInput
                id="roomTitle"
                name="roomTitle"
                label="Room Title"
                type="text"
                placeholder="Enter room title"
                onChange={handleChange}
                value={values.roomTitle}
              />

              {/* Owner Name */}
              <FormInput
                id="ownerName"
                name="ownerName"
                label="Owner Name"
                type="text"
                placeholder="Enter owner name"
                onChange={handleChange}
                value={values.ownerName}
              />

              {/* Location */}
              <FormInput
                id="location"
                name="location"
                label="Location"
                type="text"
                placeholder="Enter location"
                onChange={handleChange}
                value={values.location}
              />

              {/* Price */}
              <FormInput
                id="price"
                name="price"
                label="Price (per month)"
                type="number"
                placeholder="Enter price"
                onChange={handleChange}
                value={values.price}
                min="0"
              />

              {/* Contact Number */}
              <FormInput
                id="contactNumber"
                name="contactNumber"
                label="Contact Number"
                type="text"
                placeholder="Enter 10-digit phone number"
                onChange={handleChange}
                value={values.contactNumber}
              />

              {/* Beds */}
              <FormInput
                id="beds"
                name="beds"
                label="Number of Beds"
                type="number"
                placeholder="Enter number of beds"
                onChange={handleChange}
                value={values.beds}
                min="1"
              />

              {/* Bathrooms */}
              <FormInput
                id="bathrooms"
                name="bathrooms"
                label="Number of Bathrooms"
                type="number"
                placeholder="Enter number of bathrooms"
                onChange={handleChange}
                value={values.bathrooms}
                min="1"
              />

              {/* Description */}
              <div>
                <label className="font-small text-gray-800">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter room description"
                  onChange={handleChange}
                  value={values.description}
                  className="w-full p-2 border rounded-md"
                  rows={3}
                />
              </div>

              {/* Owner Requirements */}
              <div>
                <label className="font-small text-gray-800">
                  Owner Requirements (Optional)
                </label>
                <textarea
                  id="ownerRequirements"
                  name="ownerRequirements"
                  placeholder="Enter any specific requirements"
                  onChange={handleChange}
                  value={values.ownerRequirements}
                  className="w-full p-2 border rounded-md"
                  rows={2}
                />
              </div>

              {/* DROPDOWN FOR ROOM TYPE */}
              <div>
                <label className="font-small text-gray-800">Room Type</label>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between font-small"
                    >
                      {values.type || "Select Room Type"}
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-full p-2 bg-white shadow-md border rounded-md cursor-pointer">
                    <DropdownMenuRadioGroup
                      value={values.type}
                      onValueChange={(value) => setFieldValue("type", value)}
                    >
                      {ROOMTYPE.map((type) => (
                        <DropdownMenuRadioItem key={type} value={type}>
                          {type}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* MULTI SELECT FOR AMENITIES */}
              <div>
                <label className="font-small text-gray-800">Amenities</label>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between font-small"
                    >
                      {values.amenities.length
                        ? values.amenities.join(", ")
                        : "Select Amenities"}
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-full p-2 bg-white shadow-md border rounded-md cursor-pointer">
                    {AMENITYOPTIONS.map((item) => (
                      <DropdownMenuCheckboxItem
                        key={item}
                        checked={values.amenities.includes(item)}
                        onSelect={(e) => e.preventDefault()}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFieldValue("amenities", [
                              ...values.amenities,
                              item,
                            ]);
                          } else {
                            setFieldValue(
                              "amenities",
                              values.amenities.filter((am) => am !== item)
                            );
                          }
                        }}
                      >
                        {item}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <ErrorMessage
                  name="amenities"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer"
              >
                {isSubmitting ? "Adding Property..." : "ADD PROPERTY"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
