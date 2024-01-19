"use client";
import { useRef, useState } from "react";
import TourInfo from "./TourInfo";
import {
  getExistingTour,
  generateTourResponse,
  createNewTour,
  getGptGeniusUser,
  getGptGeniusUserTokenAmount,
  subtractGptGeniusUserTokenAmount,
} from "@/utils/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

const NewTour = () => {
  const formRef = useRef(null);

  const queryClient = useQueryClient();
  const { user } = useUser(); // GptGeniusUser ve GptGeniusUserToken one-to-one olmasina ragmen clerk user email ile uzun yol

  const {
    mutate,
    isPending: isPendingMutate,
    data: tour,
  } = useMutation({
    mutationFn: async (dest) => {
      const existingTour = await getExistingTour(dest);
      // girilen prompt database'de varsa bir islem yapilmadan dondurulur
      if (existingTour) return existingTour;
      // token miktari kritikse end-user'i uyar
      const userEmail = user.emailAddresses[0].emailAddress;
      const gptGeniusUser = await getGptGeniusUser(userEmail);
      const gptGeniusUserTokenAmount = await getGptGeniusUserTokenAmount(
        gptGeniusUser.user_id
      );
      if (gptGeniusUserTokenAmount < 300) {
        toast.error("Token balance too low...");
        return;
      }
      // girilen prompt database'de yoksa AI'dan response dondur
      const newTour = await generateTourResponse(dest);
      console.log("newTour: ", newTour);
      // AI'dan donen response gecersizse
      if (!newTour) {
        toast.error("No matching city found...");
        return null;
      }
      // AI'dan donen response gecerliyse database'e kaydet
      await createNewTour({ ...newTour.tour, lang: dest.language });
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      const newTokens = await subtractGptGeniusUserTokenAmount(
        gptGeniusUser.user_id,
        newTour.tokens
      );
      toast.success(`${newTokens} tokens remaining...`);
      return newTour.tour;
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    mutate(destination);
    formRef.current?.reset();
    const selectElement = formRef.current.querySelector(
      "select[name='language']"
    );
    selectElement.value = "default";
  };

  if (isPendingMutate)
    return (
      <div className="flex justify-center mt-4">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="max-w-4xl pt-12 gpt-prompt"
      >
        <h2 className="mb-4">Select your dream destination</h2>
        <div className="join w-full max-sm:flex-wrap">
          <div className="flex join-item flex-grow max-sm:flex-wrap">
            <input
              type="text"
              className="input input-bordered flex-grow"
              placeholder="City"
              name="city"
              required
            />
            <input
              type="text"
              className="input input-bordered flex-grow"
              placeholder="Country"
              name="country"
              required
            />
            <select
              className="select select-primary max-w-xs flex-grow"
              name="language"
              defaultValue="default"
              required
            >
              <option disabled value="default">
                Select Language
              </option>
              <option value="tr">Turkish</option>
              <option value="en">English</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary join-item rounded-md uppercase"
          >
            generate tour
          </button>
        </div>
      </form>

      <div className="max-w-4xl pt-12 gpt-prompt">
        {tour ? <TourInfo tour={tour} /> : null}
      </div>
    </>
  );
};

export default NewTour;
